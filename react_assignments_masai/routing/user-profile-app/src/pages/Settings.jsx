import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

const Settings = () => {
  const { user, updateUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ name: user.name, email: user.email });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    alert("User updated successfully!");
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Settings;
