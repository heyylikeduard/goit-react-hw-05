import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../services/tmdbAPI';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const query = searchParams.get('query') || ''; // Отримуємо пошуковий запит із URL

  useEffect(() => {
    if (!query) return; // Якщо запит порожній, не викликаємо API

    const searchMovies = async () => {
      try {
        const data = await fetchMoviesByQuery(query);
        setMovies(data);
      } catch (err) {
        setError('Не вдалося знайти фільми.');
      }
    };

    searchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.query.value.trim();
    if (searchValue === '') return;
    setSearchParams({ query: searchValue }); // Оновлюємо URL із запитом
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" defaultValue={query} placeholder="Search movies" />
        <button type="submit">Search</button>
      </form>

      {error && <p>{error}</p>}

      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: location }} // Передаємо попередню локацію
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
