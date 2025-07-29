import React from 'react';
import UserCard from './UserCard';

function UserList({ users }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {users.map((user, index) => (
        <UserCard key={index} {...user} />
      ))}
    </div>
  );
}

export default UserList;
