import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) return null;

  return (
    <div
      style={{
        width: '200px',
        padding: '1rem',
        backgroundColor: '#ddd',
        height: 'calc(100vh - 80px)', 
      }}
    >
      <h3>Sidebar</h3>
      {isLoggedIn && <p>Welcome, User </p>}
    </div>
  );
};

export default Sidebar;
