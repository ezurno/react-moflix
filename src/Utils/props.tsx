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
  name: string;
}

export interface IMovieInfoData {
  id: number;
  backdrop_path: string;
  poster_path: string;

  overview: string;
  vote_average: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  title: string;
  original_title?: string;
  name: string;
  original_name?: string;
  first_air_date: string;
  release_date: string;
}

export interface ICrewData {
  id: number;
  cast: [
    {
      id: number;
      name: string;
      original_name: string;
      character: string;
    }
  ];
  crew: [
    {
      id: number;
      known_for_department: string;
      name: string;
    }
  ];
}
