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
