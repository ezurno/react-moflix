import { AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { getMovies } from "../api";
import Slider from "../Components/Slider";
import { Banner, Loader, Overview, Title, Wrapper } from "../Styles/StyledHome";
import { IMoviesData } from "../Utils/props";
import { makeImagePath } from "../Utils/utilities";

function Home() {
  const { data: now_data, isLoading: now_isLoading } = useQuery<IMoviesData>(
    ["movies", "now_playing"],
    () => getMovies("now_playing")
  );

  const { data: pop_data, isLoading: pop_isLoading } = useQuery<IMoviesData>(
    ["movies", "popular"],
    () => getMovies("popular")
  );

  const { data: top_data, isLoading: top_isLoading } = useQuery<IMoviesData>(
    ["movies", "top_rated"],
    () => getMovies("top_rated")
  );

  const { data: up_data, isLoading: up_isLoading } = useQuery<IMoviesData>(
    ["movies", "upcoming"],
    () => getMovies("upcoming")
  );

  return (
    <Wrapper>
      {now_isLoading && pop_isLoading && top_isLoading && up_isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(now_data?.results[0].poster_path || "")}
          >
            <Title>{now_data?.results[0].title.toUpperCase()}</Title>
            <Overview>{now_data?.results[0].overview}</Overview>
          </Banner>
          <Slider data={now_data} category="now_playing" text="NOW PLAYING" />
          <Slider data={pop_data} category="popular" text="POPULAR" />
          <Slider data={top_data} category="top" text="TOP RANK" />
          <Slider data={up_data} category="up" text="UPDATE" />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
