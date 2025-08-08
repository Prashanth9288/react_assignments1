import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <div>
      <Link to={`/movie/${movie.imdbID}`}>
        <img src={movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'} alt={movie.Title} />
        <h3>{movie.Title} ({movie.Year})</h3>
      </Link>
    </div>
  );
}
