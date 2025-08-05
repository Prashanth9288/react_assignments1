import React from 'react';

const products = [
  'Product 1',
  'Product 2',
  'Product 3',
  'Product 4',
  'Product 5',
  'Product 6',
];

const MainContent = () => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    padding: '1rem',
    flex: 1,
  };

  const cardStyle = {
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  };

  return (
    <main style={gridStyle}>
      {products.map((product, idx) => (
        <div key={idx} style={cardStyle}>
          {product}
        </div>
      ))}
    </main>
  );
};

export default MainContent;
