export interface IMoviesData {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IInfoData {
  genres: IGenres[];
  release_date: string;
  runtime: number;
  vote_average: number;
}

export interface IGenres {
  id: number;
  name: string;
}
