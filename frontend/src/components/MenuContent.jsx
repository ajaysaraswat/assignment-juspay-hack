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

  // Handle slide animations when menu changes
  useEffect(() => {
    if (!contentRef.current || !previousMenuId.current) {
      previousMenuId.current = currentMenu?.id;
      return;
    }

    const content = contentRef.current;
    const isNavigatingForward = menuHistory.length > 0;
    
    // Set animation direction
    if (isNavigatingForward) {
      content.classList.add('slide-left');
    } else {
      content.classList.add('slide-right');
    }

    // Remove animation class after animation completes
    const timeout = setTimeout(() => {
      content.classList.remove('slide-left', 'slide-right');
      previousMenuId.current = currentMenu?.id;
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

      {/* Menu Title - Only show for nested menus, not root */}
      {currentMenu.label && menuHistory.length > 0 && (
        <div className="menu-title" role="heading" aria-level="2">
          {currentMenu.label}
        </div>
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

