import React, { useEffect, useState } from "react";


export default function MyApp() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();

        // Add random image for each user
        const usersWithImages = data.map(user => ({
          ...user,
          image: `https://i.pravatar.cc/150?img=${user.id}` // placeholder image
        }));

        setUsers(usersWithImages);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {users.map(user => (
        <div key={user.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <img
            src={user.image}
            alt={user.name}
            style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
          /><br/> <br/>
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
}
