import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import { useTheme } from './context/ThemeContext';

const App = () => {
  const { theme } = useTheme();

  const appStyle = {
    backgroundColor: theme === 'light' ? '#f0f0f0' : '#1e1e1e',
    color: theme === 'light' ? '#000' : '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };

  const layoutStyle = {
    display: 'flex',
    flex: 1,
  };

  return (
    <div style={appStyle}>
      <Navbar />
      <div style={layoutStyle}>
        <Sidebar />
        <MainContent />
      </div>
      <Footer />
    </div>
  );
};

export default App;
