import { AnimatePresence, Variants } from "framer-motion";
import React from "react";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  Box,
  BoxInfo,
  NextBtn,
  offset,
  SliderRow,
  Wrapper,
  SliderHeader,
} from "../Styles/StyledSlider";
import { IMoviesData } from "../Utils/props";
import { makeImagePath, useWindowDimensions } from "../Utils/utilities";
import { Overlay } from "./Overlay";

const boxVariants: Variants = {
  initial: {
    scale: 1,
  },

  animate: {
    borderRadius: "15px",
    overflow: "hidden",
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
    opacity: 0.7,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

interface ISliderProps {
  data: IMoviesData | undefined;
  category: string;
  text: string;
}

function Slider({ data, category, text }: ISliderProps) {
  const [movieIndex, setMovieIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const changeLeaving = () => {
    setLeaving((current) => !current);
  };

  const history = useHistory();
  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`); // url에 /movies/movieId를 입력
  };

  const movieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");

  const width = useWindowDimensions();

  const onNext = () => {
    if (data) {
      if (leaving) return;
      else {
        const maxIndex = Math.ceil(data.results.length / offset) - 1;
        changeLeaving();

        setMovieIndex((value) => (value === maxIndex ? 0 : value + 1));
      }
    }
  };

  const findMovie =
    movieMatch?.params.movieId &&
    data?.results.find(
      (movie) => String(movie.id) === movieMatch.params.movieId
    );

  const resultsData = data?.results
    .slice(1)
    .slice(offset * movieIndex, offset * movieIndex + offset);

  return (
    <>
      <Wrapper>
        <AnimatePresence initial={false} onExitComplete={changeLeaving}>
          <SliderHeader>{text}</SliderHeader>
          <SliderRow
            key={category + movieIndex}
            // variants={rowVarients} === BUG FIX ===
            initial={{ x: width + 10 }}
            animate={{ x: 0 }}
            exit={{ x: -(width + 10) }}
            transition={{ type: "tween", duration: 1 }}
          >
            {resultsData &&
              resultsData.map((value) => (
                <Box
                  onClick={() => onBoxClicked(value.id)}
                  key={category + value.id}
                  variants={boxVariants}
                  bgphoto={makeImagePath(value.backdrop_path, "w500")}
                  whileHover="animate"
                  initial="initial"
                  transition={{ type: "tween" }}
                  layoutId={category + String(value.id)}

                  // layoutId={`${value.id}`}
                >
                  <BoxInfo variants={boxInfoVariants}>
                    <h4>{value.title}</h4>
                  </BoxInfo>
                </Box>
              ))}
          </SliderRow>
        </AnimatePresence>
        <NextBtn onClick={onNext}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </NextBtn>
      </Wrapper>
      {findMovie ? (
        <>
          {/* <BlackOut
            onClick={onOutClicked}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          /> */}
          {<Overlay id={movieMatch.params.movieId} category={category} />}
        </>
      ) : null}
    </>
  );
}

export default React.memo(Slider);
