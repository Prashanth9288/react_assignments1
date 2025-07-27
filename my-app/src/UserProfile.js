import React from "react";

function UserProfile(props) {
  return (
    <div>
      <h2>User Profile</h2>
      {props.user && (
        <div>
          <p>Name: {props.user.name}</p>
          <p>Email: {props.user.email}</p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
