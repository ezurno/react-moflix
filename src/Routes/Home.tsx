import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies } from "../api";
import { makeImagePath } from "../Utils/utilities";

const Wrapper = styled.div`
  background-color: black;
  height: 200vh;
  overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 60px;

  background-image: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 1)
    ),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 12px;
`;

const Overview = styled.p`
  font-size: 24px;
  width: 40vw;
`;

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

const Slider = styled.div`
  position: relative;
`;

const SliderRow = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-bottom: 5px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
`;

const rowVarients: Variants = {
  hidden: {
    x: window.innerWidth + 10, // 10은 grid의 gap-size
  },
  visible: {
    x: 0,
  },
  exit: { x: -window.outerWidth - 10 },
};

const offset = 6;

function Home() {
  const { data, isLoading } = useQuery<IMoviesData>(
    ["movies", "nowPlaying"],
    getMovies
  );
  // console.log(data, isLoading);

  const [movieIndex, setMovieIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

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

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].poster_path || "")}>
            <Title>{data?.results[0].title.toUpperCase()}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <button onClick={onNext}>Click</button>
          <Slider>
            <AnimatePresence onExitComplete={changeLeaving}>
              <SliderRow
                key={movieIndex}
                variants={rowVarients}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * movieIndex, offset * movieIndex + offset)
                  .map((value) => (
                    <Box
                      key={value.id}
                      bgPhoto={makeImagePath(value.backdrop_path, "w500")}
                    />
                  ))}
              </SliderRow>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
