import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // ← replace this

const WeatherDetails = () => {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('City not found');
        }
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        setError('');
      })
      .catch((err) => setError(err.message));
  }, [city]);

  if (error) return <p style={{ padding: '1rem' }}>{error}</p>;
  if (!weather) return <p style={{ padding: '1rem' }}>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Weather in {weather.name}</h2>
      <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
      <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
      <p><strong>Condition:</strong> {weather.weather[0].description}</p>

      {/* Bonus: Embed Google Maps */}
      <iframe
        title="map"
        width="100%"
        height="300"
        style={{ marginTop: '1rem' }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${city}`}
      ></iframe>
    </div>
  );
};

export default WeatherDetails;
