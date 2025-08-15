import { Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';

export default function Dashboard() {
  const { projects, loading } = useProjects();

  if (loading) return <p>Loading projects...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/projects/new">Add Project</Link>
      <ul>
        {Object.entries(projects).map(([id, project]) => (
          <li key={id}>
            <Link to={`/projects/${id}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
