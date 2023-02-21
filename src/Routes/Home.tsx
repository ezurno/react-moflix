import { AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { getMovies } from "../api";
import Slider from "../Components/Slider";
import { Banner, Loader, Overview, Title, Wrapper } from "../Styles/StyledHome";
import { IMoviesData } from "../Utils/props";
import { makeImagePath } from "../Utils/utilities";

function Home() {
  const { data, isLoading } = useQuery<IMoviesData>(
    ["movies", "nowPlaying"],
    getMovies
  );

  // console.log(data, isLoading);

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
          <Slider data={data} />

          <AnimatePresence></AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
