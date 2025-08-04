
import React from 'react';
import { AuthProvider } from './AuthContext';
import Navbar from './Navbar';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Main />
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
