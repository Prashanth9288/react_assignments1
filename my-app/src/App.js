import React from "react";
import UserProfile from "./UserProfile";

function App() {
  const user = {
    name: "Uppara prashanth",
    email: "prashanth939288@gmail.com",
  };

  return (
    <div>
      <h1>Welcome</h1>
      <UserProfile user={user} />
    </div>
  );
}

export default App;
