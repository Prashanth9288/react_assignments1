import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { FeedbackProvider } from "./context/FeedbackContext";
import FeedbackFormPage from "./pages/FeedbackFormPage";
import FeedbackSummaryPage from "./pages/FeedbackSummaryPage";
import "./App.css";

const Nav: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <nav className="nav">
      <Link className={`nav-link ${pathname === "/" ? "active" : ""}`} to="/">Form</Link>
      <Link className={`nav-link ${pathname === "/summary" ? "active" : ""}`} to="/summary">Summary</Link>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <FeedbackProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<FeedbackFormPage />} />
          <Route path="/summary" element={<FeedbackSummaryPage />} />
        </Routes>
      </Router>
    </FeedbackProvider>
  );
};

export default App;
