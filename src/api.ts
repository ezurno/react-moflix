const API_KEY = "bf337bf14426b2433da0e98951939ed8";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getMovies(category: string) {
  return await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export async function getMovieDetail(id: string) {
  return await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
  ).then((response) => {
    return response.json();
  });
}

export async function getMovieCredit(id: string) {
  return await fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  ).then((response) => {
    return response.json();
  });
}

/// TV

export async function getTv(tvCategory: string) {
  return await fetch(
    `${BASE_URL}/tv/${tvCategory}?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => {
    return response.json();
  });
}

export async function getTvDetail(tv_id: string) {
  return await fetch(
    `${BASE_URL}/tv/${tv_id}?api_key=${API_KEY}&language=en-US`
  ).then((response) => {
    return response.json();
  });
}

export async function getTvCredit(tv_id: string) {
  return await fetch(
    `${BASE_URL}/tv/${tv_id}/credits?api_key=${API_KEY}&language=en-US`
  ).then((response) => {
    return response.json();
  });
}

/////// search ///////

export interface ISearchResult {
  id: number;
  name?: string;
  title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  original_title: string;
  release_date?: string;
  first_air_date?: string;
}

export interface ISearchData {
  page: number;
  results: ISearchResult[];
  total_pages: number;
  total_results: number;
  dates: string;
}

export async function getSearchMovie(keyword: string) {
  return await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1`
  ).then((response) => {
    return response.json();
  });
}

export async function getSearchTv(keyword: string) {
  return await fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`
  ).then((response) => {
    return response.json();
  });
}
