import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Main = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <main className="p-6 text-center text-xl text-gray-800">
      {isLoggedIn ? 'You are logged in. Welcome back!' : 'Please log in to continue.'}
    </main>
  );
};

export default Main;
