import React, { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import Header from './components/Header.jsx';
import Content from './components/Content.jsx';

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const appStyle = {
    backgroundColor: theme === 'light' ? '#fff' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
    minHeight: '100vh',
    padding: '2rem',
    transition: 'all 0.3s',
  };

  return (
    <div style={appStyle}>
      <h1>React Theme Context</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      <Header />
      <Content />
    </div>
  );
};

export default App;
