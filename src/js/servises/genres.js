import { ALL_GENRES_KEY_LS } from './constants';

import { getAllGenresMovie } from './api';
import store from './localStorage';

const takeGenresToLS = async () => {
  const savedGenres = store.get(ALL_GENRES_KEY_LS) || [];
  if (savedGenres.length) return;
  const { genres } = await getAllGenresMovie();
  store.save(ALL_GENRES_KEY_LS, genres);
};

takeGenresToLS();
