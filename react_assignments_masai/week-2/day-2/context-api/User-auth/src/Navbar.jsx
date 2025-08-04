
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Navbar = () => {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Auth App</h1>
      <button
        onClick={toggleAuth}
        className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
      >
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </nav>
  );
};

export default Navbar;
