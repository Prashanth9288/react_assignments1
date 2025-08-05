import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const { isLoggedIn, toggleAuth } = useAuth();
  const { toggleTheme, theme } = useTheme();

  return (
    <nav
      style={{
        backgroundColor: '#4CAF50',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        color: 'white',
      }}
    >
      <span>Dashboard</span>
      <div>
        <button onClick={toggleTheme} style={{ marginRight: '1rem' }}>
          Toggle {theme === 'light' ? 'Dark' : 'Light'}
        </button>
        <button onClick={toggleAuth}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
