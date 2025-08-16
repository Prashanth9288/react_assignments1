import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Log from "./pages/Log";
import Export from "./pages/Export";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Dashboard</Link> | 
        <Link to="/log">Log</Link> | 
        <Link to="/export">Export</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/log" element={<Log/>}/>
        <Route path="/export" element={<Export/>}/>
      </Routes>
    </BrowserRouter>
  );
}
