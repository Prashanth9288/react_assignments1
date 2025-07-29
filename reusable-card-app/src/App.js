import React from 'react';
import Card from './components/Card';

function App() {
  return (
    <div style={styles.container}>
      <Card title="Card One">
        <p>This is the content of the first card.</p>
      </Card>

      <Card title="Card Two">
        <ul>
          <li>First item</li>
          <li>Second item</li>
        </ul>
      </Card>

      <Card title="Card Three">
        <img
          src="https://via.placeholder.com/150"
          alt="Placeholder"
          style={{ borderRadius: '8px' }}
        />
        <p>This card includes an image.</p>
      </Card>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    gap: '16px',
    padding: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};

export default App;
