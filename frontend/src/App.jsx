import { useState } from 'react';
import { MenuDrawer } from './components';
import { sampleMenuData } from './data/menuData';
import './App.css';

/**
 * Main App Component
 * Blank page with centered "Open Menu" button
 */
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="app">
      {/* Open Menu Button */}
      <button
        className="open-menu-button"
        onClick={handleOpenMenu}
        aria-label="Open menu"
      >
        Open Menu
      </button>

      {/* Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        menuData={sampleMenuData}
      />
    </div>
  );
}

export default App;
