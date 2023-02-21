const API_KEY = "bf337bf14426b2433da0e98951939ed8";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getMovies() {
  return await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export async function getMovieInfo(movieId: string) {
  return await fetch(`${BASE_URL}/movie/${movieId}api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
