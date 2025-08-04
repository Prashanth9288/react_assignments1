import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DataPage() {
  const [posts, setPosts] = useState([]);  
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Fetched Data</h1>
      <Link to="/" style={{ display: "inline-block", marginBottom: "20px" }}>
       Back to Home
      </Link>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: "10px" }}>
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default DataPage;
