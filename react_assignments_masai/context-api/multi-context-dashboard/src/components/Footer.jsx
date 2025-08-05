import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  const footerStyle = {
    backgroundColor: theme === 'light' ? '#e0e0e0' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
    padding: '1rem',
    textAlign: 'center',
    position: 'sticky',
    bottom: 0,
  };

  return <footer style={footerStyle}>© 2025 Responsive Dashboard</footer>;
};

export default Footer;
