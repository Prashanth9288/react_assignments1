import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Content = () => {
  const { theme } = useContext(ThemeContext);

  const contentStyle = {
    backgroundColor: theme === 'light' ? '#ddd' : '#444',
    padding: '1rem',
    marginTop: '1rem',
  };

  return <div style={contentStyle}>This is the Content component</div>;
};

export default Content;
