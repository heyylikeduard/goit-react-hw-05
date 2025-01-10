import { useEffect, useState, Suspense } from 'react';
import { useParams, useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/tmdbAPI';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError('Не вдалося завантажити інформацію про фільм.');
      }
    };
    getMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(location.state?.from || '/movies'); // Повернення на попередню сторінку або на /movies
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Завантаження...</p>;
  }

  const { title, poster_path, release_date, vote_average, overview, genres } = movie;

  return (
    <div>
      <button onClick={handleGoBack}>Go Back</button>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          width="300"
        />
        <div>
          <h2>{title}</h2>
          <p>Release Date: {release_date}</p>
          <p>Rating: {vote_average}</p>
          <p>Overview: {overview}</p>
          <p>Genres: {genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
      <nav>
        <Link to="cast" state={{ from: location.state?.from }}>Cast</Link> |{' '}
        <Link to="reviews" state={{ from: location.state?.from }}>Reviews</Link>
      </nav>
      <Suspense fallback={<p>Завантаження...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
