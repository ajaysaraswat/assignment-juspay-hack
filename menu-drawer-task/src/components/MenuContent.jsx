import { useEffect, useRef } from 'react';
import MenuItem from './MenuItem';
import './MenuContent.css';

/**
 * MenuContent Component
 * Handles nested menu navigation with slide animations
 */
function MenuContent({ currentMenu, menuHistory, onNavigate, onBack }) {
  const contentRef = useRef(null);
  const previousMenuId = useRef(null);
  const previousHistoryLength = useRef(0);

  // Handle slide animations when menu changes
  useEffect(() => {
    if (!contentRef.current) {
      previousMenuId.current = currentMenu?.id;
      previousHistoryLength.current = menuHistory.length;
      return;
    }

    // Skip animation on initial render
    if (!previousMenuId.current) {
      previousMenuId.current = currentMenu?.id;
      previousHistoryLength.current = menuHistory.length;
      return;
    }

    const content = contentRef.current;
    const isNavigatingForward = menuHistory.length > previousHistoryLength.current;
    
    // Set animation direction
    // Forward: new menu slides in from right (100% -> 0)
    // Backward: previous menu slides in from left (-100% -> 0)
    if (isNavigatingForward) {
      content.classList.add('slide-in-from-right');
    } else {
      content.classList.add('slide-in-from-left');
    }

    // Remove animation class after animation completes
    const timeout = setTimeout(() => {
      content.classList.remove('slide-in-from-right', 'slide-in-from-left');
      previousMenuId.current = currentMenu?.id;
      previousHistoryLength.current = menuHistory.length;
    }, 300);

    return () => clearTimeout(timeout);
  }, [currentMenu?.id, menuHistory.length]);

  if (!currentMenu) {
    return null;
  }

  const hasBackButton = menuHistory.length > 0;
  const menuItems = currentMenu.children || [];

  return (
    <div 
      className="menu-content" 
      ref={contentRef}
      role="menu"
      aria-label={currentMenu.label || 'Menu'}
    >
      {/* Back Button */}
      {hasBackButton && (
        <button
          className="menu-back-button"
          onClick={onBack}
          aria-label="Go back"
        >
          <span className="menu-back-arrow" aria-hidden="true">←</span>
          <span className="menu-back-label">Back</span>
        </button>
      )}


      {/* Menu Items */}
      <div className="menu-items-list" role="group">
        {menuItems.length === 0 ? (
          <div className="menu-empty">No items available</div>
        ) : (
          menuItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              onClick={() => onNavigate(item)}
              hasChildren={item.children && item.children.length > 0}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MenuContent;

