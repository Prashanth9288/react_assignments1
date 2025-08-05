import React from "react";
import { AuthProvider } from "./context/AuthContent";
import { ThemeProvider } from "./context/ThemeContext";
import ReactDOM from 'react-dom/client'
import App from './App'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App/>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
)