import { useState, useEffect, useRef, useCallback } from 'react';
import MenuContent from './MenuContent';
import './MenuDrawer.css';

/**
 * MenuDrawer Component
 * Main drawer component with drag-to-close functionality and nested menu navigation
 */
function MenuDrawer({ isOpen, onClose, menuData }) {
  const [menuHistory, setMenuHistory] = useState([]);
  const [currentMenu, setCurrentMenu] = useState(menuData);
  const [dragState, setDragState] = useState({
    isDragging: false,
    startY: 0,
    currentY: 0,
    dragDistance: 0,
  });

  const drawerRef = useRef(null);
  const drawerContentRef = useRef(null);

  // Reset menu to root when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setMenuHistory([]);
      setCurrentMenu(menuData);
    }
  }, [isOpen, menuData]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-drawer-open');
    } else {
      document.body.classList.remove('menu-drawer-open');
    }
    return () => {
      document.body.classList.remove('menu-drawer-open');
    };
  }, [isOpen]);

  // Handle back navigation
  const handleBack = useCallback(() => {
    if (menuHistory.length > 0) {
      const previousMenu = menuHistory[menuHistory.length - 1];
      setCurrentMenu(previousMenu);
      setMenuHistory(menuHistory.slice(0, -1));
    }
  }, [menuHistory]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      // Close drawer on Escape key
      if (e.key === 'Escape') {
        onClose();
      }
      // Navigate back on Backspace (when not in input)
      else if (e.key === 'Backspace' && menuHistory.length > 0 && e.target.tagName !== 'INPUT') {
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, menuHistory.length, handleBack, onClose]);

  // Handle menu navigation
  const handleNavigate = (item) => {
    if (item.children && item.children.length > 0) {
      // Navigate to nested menu
      setMenuHistory([...menuHistory, currentMenu]);
      setCurrentMenu({
        id: item.id,
        label: item.label,
        children: item.children,
      });
    }
  };

  // Focus management
  useEffect(() => {
    if (isOpen && drawerContentRef.current) {
      // Focus the drawer content for accessibility
      const firstFocusable = drawerContentRef.current.querySelector('button');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }, [isOpen, currentMenu?.id]);

  // Touch event handlers for drag functionality
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setDragState({
      isDragging: true,
      startY: touch.clientY,
      currentY: touch.clientY,
      dragDistance: 0,
    });
  };

  const handleTouchMove = (e) => {
    if (!dragState.isDragging) return;

    const touch = e.touches[0];
    const currentY = touch.clientY;
    const startY = dragState.startY;
    const dragDistance = Math.max(0, currentY - startY); // Only allow downward drag

    setDragState((prev) => ({
      ...prev,
      currentY,
      dragDistance,
    }));

    // Apply visual feedback during drag
    if (drawerRef.current) {
      drawerRef.current.style.transform = `translateY(${dragDistance}px)`;
      // Add opacity fade as user drags
      const opacity = Math.max(0.3, 1 - dragDistance / 300);
      drawerRef.current.style.opacity = opacity;
    }
  };

  const handleTouchEnd = () => {
    if (!dragState.isDragging) return;

    const drawerHeight = drawerRef.current?.offsetHeight || 0;
    const threshold = drawerHeight * 0.3; // Close if dragged more than 30% of height
    const shouldClose = dragState.dragDistance > threshold;

    // Reset drag state
    setDragState({
      isDragging: false,
      startY: 0,
      currentY: 0,
      dragDistance: 0,
    });

    if (shouldClose) {
      onClose();
    } else {
      // Snap back to original position
      if (drawerRef.current) {
        drawerRef.current.style.transform = '';
        drawerRef.current.style.opacity = '';
      }
    }
  };

  // Mouse event handlers (for desktop testing)
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only handle left mouse button
    setDragState({
      isDragging: true,
      startY: e.clientY,
      currentY: e.clientY,
      dragDistance: 0,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragState.isDragging) return;

    const currentY = e.clientY;
    const startY = dragState.startY;
    const dragDistance = Math.max(0, currentY - startY);

    setDragState((prev) => ({
      ...prev,
      currentY,
      dragDistance,
    }));

    if (drawerRef.current) {
      drawerRef.current.style.transform = `translateY(${dragDistance}px)`;
      const opacity = Math.max(0.3, 1 - dragDistance / 300);
      drawerRef.current.style.opacity = opacity;
    }
  };

  const handleMouseUp = () => {
    if (!dragState.isDragging) return;

    const drawerHeight = drawerRef.current?.offsetHeight || 0;
    const threshold = drawerHeight * 0.3;
    const shouldClose = dragState.dragDistance > threshold;

    setDragState({
      isDragging: false,
      startY: 0,
      currentY: 0,
      dragDistance: 0,
    });

    if (shouldClose) {
      onClose();
    } else {
      if (drawerRef.current) {
        drawerRef.current.style.transform = '';
        drawerRef.current.style.opacity = '';
      }
    }
  };

  // Add global mouse event listeners when dragging
  useEffect(() => {
    if (dragState.isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragState.isDragging]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="menu-drawer-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`menu-drawer ${isOpen ? 'menu-drawer-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        {/* Drag Handle */}
        <div className="menu-drawer-handle" aria-hidden="true">
          <div className="menu-drawer-handle-bar"></div>
        </div>

        {/* Drawer Content */}
        <div ref={drawerContentRef} className="menu-drawer-content">
          <MenuContent
            currentMenu={currentMenu}
            menuHistory={menuHistory}
            onNavigate={handleNavigate}
            onBack={handleBack}
          />
        </div>
      </div>
    </>
  );
}

export default MenuDrawer;

