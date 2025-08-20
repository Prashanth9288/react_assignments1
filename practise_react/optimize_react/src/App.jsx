
// import React from "react";
// //import ExpensiveComponent from "./components/Usememo.jsx"
// import Parent from './components/Usereactmemo.jsx'
// function App() {
//   return (
//     <>
//     <Parent/>
//     </>
//   )
// }

// export default App

import React from "react";
import useThemeToggle from "./components/Custom.jsx";

function App() {
  const { theme, toggleTheme } = useThemeToggle();

  return (
    <div style={{ 
      background: theme === "light" ? "#fff" : "#333", 
      color: theme === "light" ? "#000" : "#fff",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <h1>{theme.toUpperCase()} MODE</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

export default App;
