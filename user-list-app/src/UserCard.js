import React from 'react';

function UserCard({ name, email, age }) {
  return (
    <div className="border rounded-xl p-4 shadow bg-white">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-600">{email}</p>
      <p className="text-gray-500">Age: {age}</p>
    </div>
  );
}

export default UserCard;
