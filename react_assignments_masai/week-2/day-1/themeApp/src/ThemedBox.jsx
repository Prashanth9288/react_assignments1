
import React from 'react';

const ThemedBox = ({ theme, text }) => {
  const isDark = theme === 'dark';

  const boxClasses = `
    p-6 rounded-lg shadow-md border 
    ${isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'}
  `;

  return (
    <div className={boxClasses}>
      <p>{text}</p>
    </div>
  );
};

export default ThemedBox;
