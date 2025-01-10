import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';
const API_READ_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2JkMDhiODJlNjNlNWE0NjEwMGEyNjk4M2RiOTY4ZCIsIm5iZiI6MTczNjQ0MjY1Ny42NzI5OTk5LCJzdWIiOiI2NzgwMDMyMWE2Nzc4YWE1YjM3YjNlNWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VRhs7BtlgqEvMbyCHO3pBA6T_-3PDpM147M7-ql_cpo'; // Токен доступу для читання API
const API_KEY = 'd3bd08b82e63e5a46100a26983db968d'; // Ключ API

const headers = {
  Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
};

// Запит популярних фільмів
export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${API_URL}/trending/movie/day`, { headers });
  return response.data.results;
};

// Запит фільмів за ключовим словом
export const fetchMoviesByQuery = async (query) => {
  const response = await axios.get(`${API_URL}/search/movie`, {
    headers,
    params: {
      api_key: API_KEY, 
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return response.data.results;
};

// Запит деталей фільму
export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`${API_URL}/movie/${movieId}`, { headers });
  return response.data;
};


// Запит акторського складу
export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(`${API_URL}/movie/${movieId}/credits`, { headers });
  return response.data;
};

// Запит оглядів
export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`${API_URL}/movie/${movieId}/reviews`, { headers });
  return response.data;
};