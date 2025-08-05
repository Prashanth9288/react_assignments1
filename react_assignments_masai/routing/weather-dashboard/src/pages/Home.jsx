import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (city.trim()) {
      navigate(`/weather/${city.trim()}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Search City Weather</h2>
      <input
        type="text"
        value={city}
        placeholder="Enter city name..."
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: '0.5rem', width: '300px', marginRight: '1rem' }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Home;
