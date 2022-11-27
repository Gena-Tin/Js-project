import {
  API_KEY,
  BASE_URL_API,
  BASE_URL_IMG,
  FILE_SIZE,
  ALL_GENRES_KEY_LS,
} from '../servises/constants.js';
import {
  fetchMovie,
  getTrendingMovies,
  getAllGenresMovie,
  getMoVieById,
  getSearchMovie,
  takeGenresMovie,
} from '../servises/api.js';

const modalEl = document.querySelector('.modal');
const btnOpenEl = document.querySelector('.gallery-list');
const backdropEL = document.querySelector('.modal__backdrop');
const modalMovieSidesEl = document.querySelector('.modal-content__sides');

function fetchMovies(id) {
  return fetch(id).then(response =>
    response.status === 404
      ? Promise.reject(
          new Error('The resource you requested could not be found.')
        )
      : response.json()
  );
}
const renderMarkup = object => {
  const {
    poster_path,
    id,
    title,
    vote_average,
    vote_count,
    original_title,
    genres,
    overview,
    popularity,
  } = object;
  const genreMovies = genres.map(el => el.name);

  return `
      <div class="modal-content__img">
        <img src="${BASE_URL_IMG}/${FILE_SIZE}${poster_path}" alt="image" />
      </div>
      <div class="modal-content__right-side">
        <h2 class="modal-content__title">${title}</h2>
        <ul class="modal-content__items">
        <li class="modal-content__item">
        <p class="film-details">Vote / Votes</p>
        <p class="film-details__info--number"> 
        <sp class="film-details__rating--orange">${vote_average}</sp>
        <sp class="film-details__rating"> / </sp>
        <sp>${vote_count}</sp>
      </p>
      </li>
      <li class="modal-content__item">
      <p class="film-details">Popularity</p>
      <p class="film-details__info--number">${popularity}</p>
          </li>
          <li class="modal-content__item">
          <p class="film-details">Original Title</p>
          <p class="film-details__info">${original_title}</p>
          </li>
          <li class="modal-content__item">
            <p class="film-details">Genre</p>
            <p class="film-details__info">${genreMovies}</p>
            </li>
            </ul>
        <h3 class="modal-content__about">About</h3>
        <p class="modal-content__description">${overview}</p>
        <div class="modal-content__buttons">
          <button type="button" class="modal-content__btn  btn-watch">
            ADD TO WATCHED
          </button>
          <button type="button" class="modal-content__btn btn-queue">ADD TO QUEUE</button>
        </div>
      </div>
    `;
};

async function openModal() {
  modalEl.classList.add('modal-show');
  document.body.classList.add('stop-scrolling');

  const btnClose = document.querySelector('.modal-content__btn-close');

  btnClose.addEventListener('click', () => closeModal());
  modalEl.addEventListener('click', e => {
    console.log(e.target.classList);
    if (e.target.classList.contains('modal__backdrop')) closeModal();
  });
  window.addEventListener('keydown', modalClosinByEsc);
}

btnOpenEl.addEventListener('click', e => {
  if (e.currentTarget === e.target) return;
  openModal();
  const id = e.target.closest('li').dataset.id;
  getMoVieById(id).then(data => {
    const markup = renderMarkup(data);
    console.log(markup);
    modalMovieSidesEl.innerHTML = markup;
  });
});

// Закриття модалки
function closeModal() {
  modalEl.classList.remove('modal-show');
  document.body.classList.remove('stop-scrolling');
  document.body.style.overflow = '';
  window.removeEventListener('keydown', modalClosinByEsc);
}

function modalClosinByEsc(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

// ----------------
