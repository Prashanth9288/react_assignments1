
import React, { useState, useEffect } from 'react';
import ThemedBox from './ThemedBox';

const ThemeApp = () => {
 
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const isDark = theme === 'dark';
  const appBg = isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black';

  return (
    <div className={`min-h-screen ${appBg} p-6`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Theme Toggle App</h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Switch to {isDark ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ThemedBox theme={theme} text="Box 1: Reusable and Stylish!" />
          <ThemedBox theme={theme} text="Box 2: React + Tailwind CSS" />
          <ThemedBox theme={theme} text="Box 3: Conditional Props in Action" />
        </div>
      </div>
    </div>
  );
};

export default ThemeApp;
