import React, { useContext } from 'react';
import { ThemeProvider, ThemeContext } from './ThemeContext';
import NestedBox from './NestedBox';

function ThemedApp() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const appBg = theme === 'light' ? 'bg-gray-100' : 'bg-gray-900';
  const textColor = theme === 'light' ? 'text-black' : 'text-white';

  return (
    <div className={`min-h-screen p-8 ${appBg} ${textColor}`}>
      <button
        onClick={toggleTheme}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Toggle Theme
      </button>
      <NestedBox />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}
