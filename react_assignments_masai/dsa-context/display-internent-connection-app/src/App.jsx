import React, { useEffect, useState } from "react";

function App(){
  const [isOnline,setIsOnline]=useState(navigator.onLine);

  const [users,setUsers]=useState([]);

  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    function handleOnline(){
      setIsOnline(true);
    }
    function handleOffline(){
      setIsOnline(false)
    }

    window.addEventListener("online",handleOnline);
    window.addEventListener("offline",handleOffline);

    return ()=>{
    window.removeEventListener("online",handleOnline);
    window.removeEventListener("offline",handleOffline);
  };
  },[]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>{isOnline ? "you are online" : "No internent connection"}</h2>

      <h3>Fetched Used List:</h3>
      {loading ? (
        <p>Loading users....</p>
      ):(
        <ul>
          {users.map((user)=>(
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default App;