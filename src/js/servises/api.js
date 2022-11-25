import { API_KEY, BASE_URL_API } from './constants';

const fetchMovie = url =>
  fetch(url).then(response =>
    response.status === 404
      ? Promise.reject(
          new Error('The resource you requested could not be found.')
        )
      : response.json()
  );

const getTrendingMovies = (currentPage = 1) => {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    page: currentPage,
  });

  const url = `${BASE_URL_API}/trending/movie/week?${searchParams}`;
  return fetchMovie(url);
};

const getAllGenresMovie = () => {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
  });

  const url = `${BASE_URL_API}/genre/movie/list?${searchParams}`;
  return fetchMovie(url);
};

const getMoVieById = id => {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    append_to_response: 'videos',
  });

  const url = `${BASE_URL_API}/movie/${id}?${searchParams}`;
  return fetchMovie(url);
};

const getSearchMovie = (searhQuery = '', currentPage = 1) => {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    query: searhQuery,
    page: currentPage,
  });

  const url = `${BASE_URL_API}/search/movie?${searchParams}`;
  return fetchMovie(url);
};

// const getMoVieVideoTrailerById = id => {
//   const searchParams = new URLSearchParams({
//     api_key: API_KEY,
//     language: 'en-US',
//   });

//   const url = `${BASE_URL_API}/movie/${id}/videos?${searchParams}`;
//   return fetchMovie(url);
// };

export { getTrendingMovies, getAllGenresMovie, getMoVieById, getSearchMovie };
