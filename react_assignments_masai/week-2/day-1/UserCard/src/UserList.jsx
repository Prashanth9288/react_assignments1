
import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error('Failed to fetch users.');
        const data = await res.json();
        setUsers(data);
        setFiltered(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFiltered(users.filter(user => user.name.toLowerCase().includes(lower)));
  }, [search, users]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Profiles</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {loading && <p className="text-gray-500">Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p className="text-gray-400">No users found.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map(user => (
          <UserCard
            key={user.id}
            name={user.name}
            email={user.email}
            city={user.address.city}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
