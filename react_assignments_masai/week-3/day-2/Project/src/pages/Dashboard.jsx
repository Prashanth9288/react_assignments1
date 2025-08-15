import { useProjects } from "../context/ProjectsContext";

export default function Dashboard() {
  const context = useProjects();
  if (!context) return <p>Loading...</p>;

  const { projects } = context;

  return (
    <div>
      <h1>Dashboard</h1>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul>
          {projects.map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
