import React from 'react';

const Card = ({ title, children }) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{title}</h2>
      <div>{children}</div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '16px',
    backgroundColor: '#fff',
    boxShadow: '2px 2px 12px rgba(0,0,0,0.1)',
    margin: '10px',
  },
  title: {
    marginBottom: '10px',
    fontSize: '1.2rem',
  },
};

export default Card;
