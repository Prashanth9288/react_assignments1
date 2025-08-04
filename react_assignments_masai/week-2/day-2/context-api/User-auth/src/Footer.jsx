import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Footer = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <footer className="bg-gray-100 text-center p-4 text-gray-700">
      {isLoggedIn ? 'Welcome, User' : 'Please log in'}
    </footer>
  );
};

export default Footer;
