import './MenuItem.css';
import { iconMap } from './Icons';

/**
 * MenuItem Component
 * Displays a single menu item with icon, title, subtitle, and arrow
 */
function MenuItem({ item, onClick, hasChildren }) {
  const IconComponent = item.iconName ? iconMap[item.iconName] : null;

  return (
    <button
      className="menu-item"
      onClick={onClick}
      aria-expanded={hasChildren ? 'false' : undefined}
      aria-haspopup={hasChildren ? 'true' : undefined}
    >
      {/* Icon */}
      {IconComponent && (
        <span className="menu-item-icon" aria-hidden="true">
          <IconComponent />
        </span>
      )}
      
      {/* Content */}
      <div className="menu-item-content">
        <span className="menu-item-title">{item.label}</span>
        {item.subtitle && (
          <span className="menu-item-subtitle">{item.subtitle}</span>
        )}
      </div>
      
      {/* Arrow */}
      {hasChildren && (
        <span className="menu-item-arrow" aria-hidden="true">
          →
        </span>
      )}
    </button>
  );
}

export default MenuItem;

