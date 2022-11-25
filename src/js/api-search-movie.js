import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  getTrendingMovies,
  getMoVieById,
  getSearchMovie,
} from './servises/api';
import refs from './servises/refs';
import { renderMoviesMarkup } from './components/movie-markup';
import { toggleLoader } from './servises/loader';

let searcQuery = null;

const renderTrendingMovies = async () => {
  const { page, results, total_pages } = await getTrendingMovies();
  renderMoviesMarkup(results);
};

const onSearchMoviesByQuery = async e => {
  e.preventDefault();

  const value = e.currentTarget.elements.query.value.trim();

  if (!value) return Notify.failure('Enter your search query');
  if (value === searcQuery) return;

  searcQuery = value;

  const { page, results, total_pages } = await getSearchMovie(value);
  console.log('🚀 ~ results', results);
  renderMoviesMarkup(results);
};

renderTrendingMovies();
// refs.searchForm.addEventListener('submit', onSearchMoviesByQuery);
