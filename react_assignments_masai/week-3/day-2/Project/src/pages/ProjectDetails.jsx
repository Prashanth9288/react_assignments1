import { useParams, Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';

export default function ProjectDetails() {
  const { id } = useParams();
  const { projects, deleteTask, uid, updateTask } = useProjects();
  const project = projects[id];

  if (!project) return <p>Project not found</p>;

  const toggleComplete = (taskId, completed) => {
    updateTask(uid, id, taskId, { completed: !completed });
  };

  return (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <Link to={`/projects/${id}/edit`}>Edit Project</Link>
      <h3>Tasks</h3>
      <ul>
        {project.tasks
          ? Object.entries(project.tasks).map(([tid, task]) => (
              <li key={tid}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(tid, task.completed)}
                />
                {task.title} ({task.priority})
                <button onClick={() => deleteTask(uid, id, tid)}>❌</button>
              </li>
            ))
          : <p>No tasks yet</p>}
      </ul>
    </div>
  );
}
