import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProjectsProvider } from './context/ProjectsContext.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProjectDetails from './pages/ProjectDetails.jsx';
import AddProject from './pages/AddProject.jsx';
import EditProject from './pages/EditProject.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

export default function App() {
  return (
    <AuthProvider>
      <ProjectsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/projects/new" element={<PrivateRoute><AddProject /></PrivateRoute>} />
            <Route path="/projects/:id" element={<PrivateRoute><ProjectDetails /></PrivateRoute>} />
            <Route path="/projects/:id/edit" element={<PrivateRoute><EditProject /></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </ProjectsProvider>
    </AuthProvider>
  );
}
