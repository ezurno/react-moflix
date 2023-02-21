import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovieInfo, getMovies } from "../api";
import { makeImagePath, useWindowDimensions } from "../Utils/utilities";

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

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;

  /* position: relative; slider가 이미 relative라서 사용하지 않아도 됨  */

  &:first-child {
    transform-origin: center left;
  }

  &:last-child {
    transform-origin: center right;
  }
`;

// const rowVarients: Variants = {
//   hidden: {
//     x: window.innerWidth + 10, // 10은 grid의 gap-size
//   },
//   visible: {
//     x: 0,
//   },
//   exit: { x: -window.outerWidth - 10 },
// };
// ===== BUG FIX =====

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

const offset = 6;

const BoxInfo = styled(motion.div)`
  padding: 12px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;

  h4 {
    text-align: center;
    font-size: 14px;
  }
`;

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

const Overlay = styled(motion.div)`
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 35vw;
  height: 80vh;
  position: fixed;
  border-radius: 15px;
  overflow: hidden;
  overflow-y: scroll;

  background-color: ${(props) => props.theme.black.lighter};
`;

const BlackOut = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const OverlayTitle = styled.h2`
  font-size: 28px;
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  top: -50px;
  padding: 0 20px;
`;

const OverlayOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};

  width: 70%;
  font-size: 16px;
`;

const OverlayImg = styled.div<{ bgphoto: string }>`
  background-image: linear-gradient(to top, rgba(0, 0, 0, 1), transparent),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 300px;
`;

const OverlayTool = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  flex-direction: column;
`;

const Score = styled.h2`
  font-size: 36px;
`;

const ToolBox = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Over = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const OverHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const OverInfo = styled.div`
  color: ${(props) => props.theme.white.darker};
`;

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

function Home() {
  const history = useHistory(); // react-router v5
  // url을 드나들 수 있음
  const movieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  // console.log(movieMatch); 영화가 맞는지 판독

  const { data, isLoading } = useQuery<IMoviesData>(
    ["movies", "nowPlaying"],
    getMovies
  );

  // console.log(data, isLoading);

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

  console.log(findMovie); //movie 의 값 가져옴

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
          </Slider>
          <AnimatePresence>
            {movieMatch ? (
              <>
                <BlackOut
                  onClick={onOutClicked}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <Overlay layoutId={movieMatch.params.movieId}>
                  {findMovie && (
                    <>
                      <OverlayImg
                        bgphoto={makeImagePath(
                          `${findMovie.backdrop_path}`,
                          "w500"
                        )}
                      />
                      <OverlayTitle>{findMovie.title}</OverlayTitle>
                      <Over>
                        <OverlayTool>
                          <OverHeader>
                            <Score>3.7</Score>
                            <ToolBox>
                              <span className="material-symbols-outlined">
                                add_circle
                              </span>
                              <span className="material-symbols-outlined">
                                recommend
                              </span>
                              <span className="material-symbols-outlined">
                                next_plan
                              </span>
                            </ToolBox>
                          </OverHeader>

                          <OverlayOverview>
                            {findMovie.overview}
                          </OverlayOverview>
                        </OverlayTool>
                        <OverInfo>123</OverInfo>
                      </Over>
                    </>
                  )}
                </Overlay>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
