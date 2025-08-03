
import React from 'react';

const UserCard = ({ name, email, city }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
      <p className="text-sm text-gray-600">{email}</p>
      <p className="text-sm text-gray-500">City: {city}</p>
    </div>
  );
};

export default UserCard;
