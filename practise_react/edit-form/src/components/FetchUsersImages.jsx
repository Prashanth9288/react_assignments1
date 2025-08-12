import React, { useEffect, useState } from "react";

export default function FetchUsersImages() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => { 
    const fetchPhotos = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=10");
        const data = await res.json();
        setPhotos(data);
      } catch (err) {
        console.error("Error fetching photos:", err);
      }
    };
    fetchPhotos();
  }, []);

  return (
    <div>
      <h2>Photo Gallery</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "15px" }}>
        {photos.map(photo => (
          <div key={photo.id} style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center" }}>
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              style={{ maxWidth: "100%", height: "auto", marginBottom: "8px" }}
            />
            <p style={{ fontSize: "0.9em", color: "#333" }}>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
