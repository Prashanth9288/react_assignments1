import React from 'react';

const ProfileCard = ({
  name = "John Doe",
  age,
  bio = "This user hasn't written a biography yet."
}) => {
  const truncatedBio = bio.length > 100
    ? bio.slice(0, 100) + "… Read More"
    : bio;

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-md p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-500 text-sm">Age: {age}</p>
      </div>
      <p className="text-gray-700 text-sm">
        <span className="font-medium">Bio:</span> {truncatedBio}
      </p>
    </div>
  );
};

export default ProfileCard;
