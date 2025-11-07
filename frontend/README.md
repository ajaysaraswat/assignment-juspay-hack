# Nested Menu Drawer

A fully functional, accessible, and animated nested menu drawer component for React. Built with mobile-first design principles, featuring smooth animations, drag-to-close functionality, and comprehensive keyboard accessibility.

## Features

✅ **Smooth Animations** - Direction-aware slide animations between menu levels (60fps)  
✅ **Drag-to-Close** - Intuitive drag functionality to close the drawer  
✅ **Nested Navigation** - Support for unlimited nested menu levels  
✅ **Keyboard Accessible** - Full keyboard navigation support (Tab, Enter, Escape, Backspace)  
✅ **Screen Reader Support** - ARIA attributes and semantic HTML  
✅ **Mobile-First** - Optimized for touch devices with proper spacing  
✅ **Responsive** - Adapts to different screen sizes  
✅ **Clean Code** - Beginner-friendly, well-documented codebase  

## Installation

This project uses Vite and React. To get started:

```bash
npm install
npm run dev
```

## Usage

### Basic Example

```jsx
import { useState } from 'react';
import { MenuDrawer, MenuButton } from './components';
import { sampleMenuData } from './data/menuData';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <MenuButton
        isOpen={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuData={sampleMenuData}
      />
    </>
  );
}
```

### Menu Data Structure

The menu data should follow this structure:

```javascript
{
  id: 'unique-id',
  label: 'Menu Item Label',
  children: [
    {
      id: 'submenu-id',
      label: 'Submenu Item',
      children: [] // Can nest deeper
    }
  ]
}
```

**Example:**

```javascript
const menuData = {
  id: 'root',
  label: 'Main Menu',
  children: [
    {
      id: 'home',
      label: 'Home',
      children: [
        {
          id: 'home-dashboard',
          label: 'Dashboard',
          children: [] // No children = leaf node
        }
      ]
    },
    {
      id: 'products',
      label: 'Products',
      children: [
        {
          id: 'products-electronics',
          label: 'Electronics',
          children: [
            {
              id: 'products-electronics-phones',
              label: 'Phones',
              children: []
            }
          ]
        }
      ]
    }
  ]
};
```

## Components

### MenuDrawer

Main drawer component that handles all navigation and drag functionality.

**Props:**
- `isOpen` (boolean) - Controls drawer visibility
- `onClose` (function) - Callback when drawer should close
- `menuData` (object) - Root menu data object

### MenuButton

Button component to open/close the drawer.

**Props:**
- `isOpen` (boolean) - Current open state
- `onClick` (function) - Click handler
- `ariaLabel` (string, optional) - Custom aria label

### MenuContent

Internal component that handles menu navigation (not typically used directly).

### MenuItem

Internal component for individual menu items (not typically used directly).

## Customization

### Styling

All components have their own CSS files that can be customized:

- `MenuDrawer.css` - Main drawer styles
- `MenuButton.css` - Button styles
- `MenuContent.css` - Content and navigation styles
- `MenuItem.css` - Individual item styles

### Colors

The drawer uses a dark theme by default. You can customize colors in the CSS files:

```css
/* MenuDrawer.css */
.menu-drawer {
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  /* Change to your preferred colors */
}
```

### Drawer Height

Adjust the drawer height in `MenuDrawer.css`:

```css
.menu-drawer {
  height: 85vh; /* Change this value */
  max-height: 600px; /* Maximum height */
}
```

### Drag Threshold

The drag-to-close threshold is set to 30% of drawer height. To change it, modify the threshold in `MenuDrawer.jsx`:

```javascript
const threshold = drawerHeight * 0.3; // Change 0.3 to your preferred value
```

## Accessibility

### Keyboard Navigation

- **Tab** - Navigate between menu items
- **Enter** - Select/open menu item
- **Escape** - Close drawer
- **Backspace** - Navigate back (when in nested menu)

### Screen Readers

The component includes:
- Proper ARIA labels and roles
- Semantic HTML structure
- Focus management
- Screen reader announcements

### Focus Management

When the drawer opens, focus is automatically moved to the first focusable element. When navigating between menus, focus is properly managed.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Touch and mouse input supported

## Performance

- Uses CSS transforms for smooth 60fps animations
- Optimized with `will-change` property
- Efficient re-renders with React hooks
- Touch event handling optimized for mobile

## File Structure

```
src/
  ├── components/
  │   ├── MenuDrawer/
  │   │   ├── MenuDrawer.jsx
  │   │   ├── MenuDrawer.css
  │   │   ├── MenuButton.jsx
  │   │   ├── MenuButton.css
  │   │   ├── MenuContent.jsx
  │   │   ├── MenuContent.css
  │   │   ├── MenuItem.jsx
  │   │   ├── MenuItem.css
  │   │   └── index.js
  ├── data/
  │   └── menuData.js
  ├── App.jsx
  ├── App.css
  └── index.css
```

## Development

### Running the Development Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## License

This project is open source and available for use.

## Notes

- The component is designed for mobile-first use but works on desktop too
- Drag functionality works with both touch and mouse events
- The drawer automatically locks body scroll when open
- Menu history is reset when the drawer closes
