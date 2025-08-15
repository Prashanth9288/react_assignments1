import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';

export default function AddProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addProject, uid } = useProjects();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProject(uid, { title, description, createdAt: Date.now() });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Project</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Save</button>
    </form>
  );
}
