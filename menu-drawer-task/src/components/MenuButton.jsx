import './MenuButton.css';

/**
 * MenuButton Component
 * Button to open/close the menu drawer
 */
function MenuButton({ isOpen, onClick, ariaLabel }) {
  return (
    <button
      className={`menu-button ${isOpen ? 'menu-button-open' : ''}`}
      onClick={onClick}
      aria-label={ariaLabel || (isOpen ? 'Close menu' : 'Open menu')}
      aria-expanded={isOpen}
    >
      <span className="menu-button-icon" aria-hidden="true">
        {isOpen ? '✕' : '☰'}
      </span>
    </button>
  );
}

export default MenuButton;

