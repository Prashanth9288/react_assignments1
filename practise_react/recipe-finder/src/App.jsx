
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

import HomePage from "./pages/HomePage";
import RecipeDetailPage from "./components/RecipeDetailPage";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./context/ThemeContext";

function App(){
  const{ theme }=useTheme();
  
  return (
    <div style={{
      background: theme === "light" ? "#f8f8f8" : "#222",
      color: theme === "light" ? "#000" : "#fff",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <Router>
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;