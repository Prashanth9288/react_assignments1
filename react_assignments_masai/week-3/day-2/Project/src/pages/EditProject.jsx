import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';
import { useState } from 'react';

export default function EditProject() {
  const { id } = useParams();
  const { projects, updateProject, uid } = useProjects();
  const project = projects[id];
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProject(uid, id, { title, description });
    navigate('/');
  };

  if (!project) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Project</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
}
