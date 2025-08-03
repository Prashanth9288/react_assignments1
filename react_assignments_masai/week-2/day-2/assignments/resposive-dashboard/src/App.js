import React from "react";

import './App.css';

function App(){
  return (
    <div className="app-container">
      <header className="navbar">Navbar</header>
      <aside className="sidebar">Sidebar</aside>
      <main className="main-content">
        <div className="card-grid">
          <div className="card">Product 1</div>
          <div className="card">Product 2</div>
          <div className="card">Product 3</div>
        </div>
      </main>
      <footer className="footer">Footer</footer>
    </div>
  )
}

export default App;
