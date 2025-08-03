
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const NestedBox = () => {
  const { theme } = useContext(ThemeContext);

  const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-800';
  const textColor = theme === 'light' ? 'text-black' : 'text-white';

  return (
    <div className={`p-6 rounded-lg shadow-md ${bgColor} ${textColor}`}>
      <p>This box is themed using Context: <strong>{theme}</strong> mode.</p>
    </div>
  );
};

export default NestedBox;
