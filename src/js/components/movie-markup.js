import refs from '../servises/refs';
import store from '../servises/localStorage';
import DefaultImg from '../../images/default-foto/filmoteka.jpg';
import {
  ALL_GENRES_KEY_LS,
  BASE_URL_IMG,
  FILE_SIZE,
} from '../servises/constants';

const takeGenresMovie = (genreId = []) => {
  const genres = store.get(ALL_GENRES_KEY_LS);
  return genreId.map(elId => genres.find(({ id }) => id === elId)?.name);
};

const movieMarkup = ({
  id,
  title,
  release_date,
  genre_ids,
  poster_path,
} = {}) => {
  const img = poster_path
    ? `${BASE_URL_IMG + FILE_SIZE + poster_path}`
    : DefaultImg;
  const yearMovie = new Date(release_date).getFullYear() || 'No date';
  const genreMovie =
    takeGenresMovie(genre_ids).splice(0, 3)?.join(', ') || 'No genre';
  return `<li class="list-item" data-id="${id}">
      <a href="#" class="list-item__link link">
        <img
          src="${img}"
          alt="exemple"
          class="list-item__img img"
        />
        <h2 class="list-item__title">${title.toUpperCase()}</h2>
      </a>
      <div class="list-item__description">
      <p class="list-item__genre">${genreMovie}</p>
      <span class="list-item__span">&#124</span>
      <time>${yearMovie}</time>
      </div>
    </li>`;
};

const renderMoviesMarkup = (movies = []) =>
  (refs.gallery.innerHTML = movies.map(movieMarkup).join(''));

export { renderMoviesMarkup };
