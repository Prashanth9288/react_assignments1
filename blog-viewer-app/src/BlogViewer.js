import React, { useState } from 'react';

// Blog data
const blogs = [
  {
    title: "Mastering JavaScript",
    content: "JavaScript is a powerful language for web development.",
  },
  {
    title: "React in Indian Startups",
    content: "React is widely used in many Indian tech companies.",
  },
  {
    title: "Career in Web Development",
    content: "Explore job roles and growth in web development.",
  },
];

function BlogViewer() {
  // State to store the selected blog
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Blog Titles</h1>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {blogs.map((blog, index) => (
          <li
            key={index}
            onClick={() => setSelectedBlog(blog)}
            style={{
              cursor: 'pointer',
              color: 'blue',
              marginBottom: '8px',
              textDecoration: 'underline',
            }}
          >
            {blog.title}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '30px' }}>
        {selectedBlog ? (
          <>
            <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>{selectedBlog.title}</h2>
            <p style={{ color: '#333' }}>{selectedBlog.content}</p>
          </>
        ) : (
          <p style={{ color: '#666' }}>Select a blog to read</p>
        )}
      </div>
    </div>
  );
}

export default BlogViewer;
