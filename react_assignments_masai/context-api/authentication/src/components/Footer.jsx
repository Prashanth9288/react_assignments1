import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Footer = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <footer style={{ background: '#eee', padding: '1rem', marginTop: '2rem' }}>
      {isAuthenticated ? <p>Welcome, User 👋</p> : <p>Please log in</p>}
    </footer>
  );
};

export default Footer;
