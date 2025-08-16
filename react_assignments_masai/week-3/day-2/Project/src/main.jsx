import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProjectsProvider } from "./context/ProjectsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ProjectsProvider>
        <App />
      </ProjectsProvider>
    </AuthProvider>
  </BrowserRouter>
);
