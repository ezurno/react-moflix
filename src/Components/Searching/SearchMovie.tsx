import { Variants } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { ISearchData } from "../../api";
import {
  SearchingBox,
  SearchingBoxInfo,
  SearchingMovie,
  SearchingTitle,
  SearchingValue,
} from "../../Styles/StyledSearch";
import { makeImagePath } from "../../Utils/utilities";
import Overlay from "../Movie/Overlay";

interface IMovieSearch {
  keyword: string;
  movieData: ISearchData;
}
const searchBoxVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.3,
    y: -20,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween",
    },
  },
};

const searchBoxInfoVariants: Variants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween",
    },
  },
};

function SearchMovie({ keyword, movieData }: IMovieSearch) {
  const history = useHistory();
  const [movieId, setMovieId] = useState<number>();

  const onClickMovie = (movieId: number) => {
    setMovieId(movieId);
    history.push(`/search/movie/${movieId}?keyword=${keyword}`);
  };

  const movieMatch = useRouteMatch<{ movieId: string }>(
    "/search/movie/:movieId:keyword"
  );

  const findMovieData = movieData?.results.find((item) => item.id === movieId);

  return (
    <SearchingMovie>
      <SearchingTitle>
        <span className="material-symbols-outlined">movie</span>Movie
      </SearchingTitle>
      <SearchingValue>
        {movieData?.results.map((data) => (
          <SearchingBox
            variants={searchBoxVariants}
            onClick={() => onClickMovie(data.id)}
            key={`movie${data.id}`}
            bgphoto={makeImagePath(
              data.backdrop_path || data.poster_path,
              "w500"
            )}
            initial="initial"
            whileHover="hover"
            transition={{ type: "tween" }}
          >
            <SearchingBoxInfo variants={searchBoxInfoVariants}>
              <h4>{data.title ? data.title : data.name}</h4>
            </SearchingBoxInfo>
          </SearchingBox>
        ))}
      </SearchingValue>
      {movieMatch ? (
        <>
          <Overlay id={String(findMovieData?.id)} category="search" />
        </>
      ) : null}
    </SearchingMovie>
  );
}

export default SearchMovie;
