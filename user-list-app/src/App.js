import React, { useState } from 'react';
import UserList from './UserList';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', age: '' });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const errs = {};

    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!validateEmail(form.email)) errs.email = 'Invalid email format.';
    if (!form.age || isNaN(form.age) || parseInt(form.age) <= 0)
      errs.age = 'Age must be a positive number.';

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setUsers([...users, {
      name: form.name,
      email: form.email,
      age: parseInt(form.age),
    }]);

    setForm({ name: '', email: '', age: '' });
    setErrors({});
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New User</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 mb-8">
        {['name', 'email', 'age'].map((field) => (
          <div key={field}>
            <label className="block mb-1 font-medium capitalize">
              {field}<span className="text-red-500">*</span>
            </label>
            <input
              type={field === 'age' ? 'number' : 'text'}
              name={field}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="w-full border p-2 rounded"
            />
            {errors[field] && (
              <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-fit"
        >
          Add User
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">User List</h2>
      <UserList users={users} />
    </div>
  );
}

export default App;
