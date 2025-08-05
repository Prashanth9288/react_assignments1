import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Main = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <main style={{ padding: '2rem' }}>
      {isAuthenticated ? (
        <h2>You're logged in! Welcome to the dashboard.</h2>
      ) : (
        <h2>Please log in to continue.</h2>
      )}
    </main>
  );
};

export default Main;
