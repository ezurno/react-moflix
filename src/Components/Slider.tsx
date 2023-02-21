import { AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { BlackOut } from "../Styles/StyledOverlay";
import {
  Box,
  BoxInfo,
  offset,
  SliderRow,
  Wrapper,
} from "../Styles/StyledSlider";
import { IMoviesData } from "../Utils/props";
import { makeImagePath, useWindowDimensions } from "../Utils/utilities";
import { Overlay } from "./Overlay";

const boxVariants: Variants = {
  initial: {
    scale: 1,
  },

  animate: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },

    zIndex: 10,
  },
};

const boxInfoVariants: Variants = {
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

interface ISliderProps {
  data: IMoviesData | undefined;
}

function Slider({ data }: ISliderProps) {
  const history = useHistory(); // react-router v5
  // url을 드나들 수 있음
  const movieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  // console.log(movieMatch); 영화가 맞는지 판독
  const [movieIndex, setMovieIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const width = useWindowDimensions();

  const onNext = () => {
    if (data) {
      if (leaving) return;
      changeLeaving();
      const maxIndex = Math.ceil(data.results.length / offset) - 1;
      setMovieIndex((value) => (value === maxIndex ? 0 : value + 1));
    }
  };

  const changeLeaving = () => {
    setLeaving((current) => !current);
  };

  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`); // url에 /movies/movieId를 입력
  };

  const onOutClicked = () => {
    history.goBack();
  };

  const findMovie =
    movieMatch?.params.movieId &&
    data?.results.find(
      (movie) => String(movie.id) === movieMatch.params.movieId
    );

  return (
    <>
      <button onClick={onNext}>Click</button>;
      <Wrapper>
        <AnimatePresence initial={false} onExitComplete={changeLeaving}>
          <SliderRow
            key={movieIndex}
            // variants={rowVarients} === BUG FIX ===
            initial={{ x: width + 10 }}
            animate={{ x: 0 }}
            exit={{ x: -(width + 10) }}
            transition={{ type: "tween", duration: 1 }}
          >
            {data?.results
              .slice(1)
              .slice(offset * movieIndex, offset * movieIndex + offset)
              .map((value) => (
                <Box
                  variants={boxVariants}
                  key={value.id}
                  bgphoto={makeImagePath(value.backdrop_path, "w500")}
                  whileHover="animate"
                  initial="initial"
                  transition={{ type: "tween" }}
                  onClick={() => onBoxClicked(value.id)}
                  layoutId={`${value.id}`}
                >
                  <BoxInfo variants={boxInfoVariants}>
                    <h4>{value.title}</h4>
                  </BoxInfo>
                </Box>
              ))}
          </SliderRow>
        </AnimatePresence>
      </Wrapper>
      {movieMatch ? (
        <>
          <BlackOut
            onClick={onOutClicked}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          {findMovie && (
            <Overlay
              layoutId={movieMatch.params.movieId}
              overview={findMovie.overview}
              backdrop_path={findMovie.backdrop_path}
              title={findMovie.title}
            />
          )}
        </>
      ) : null}
    </>
  );
}

export default Slider;
