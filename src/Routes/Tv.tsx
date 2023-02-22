import { AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { getMovies, getTv } from "../api";
import Footer from "../Components/Footer";
import Slider from "../Components/Movie/Slider";
import TvSlider from "../Components/Tv/TvSlider";
import {
  Banner,
  BannerIcon,
  BannerInfo,
  BannerPlay,
  Loader,
  Overview,
  Title,
  Wrapper,
} from "../Styles/StyledHome";
import { IMoviesData } from "../Utils/props";
import { makeImagePath } from "../Utils/utilities";

function Tv() {
  const history = useHistory();
  const { data: pop_data, isLoading: pop_isLoading } = useQuery<IMoviesData>(
    ["tv", "popular"],
    () => getTv("popular")
  );

  // top_rated API
  const { data: top_data, isLoading: top_isLoading } = useQuery<IMoviesData>(
    ["tv", "topRated"],
    () => getTv("top_rated")
  );

  // on_the_air API
  const { data: on_data, isLoading: on_isLoading } = useQuery<IMoviesData>(
    ["tv", "ontheair"],
    () => getTv("on_the_air")
  );

  const imagePath = pop_data?.results[0].backdrop_path
    ? pop_data?.results[0].backdrop_path
    : pop_data?.results[0].poster_path;

  return (
    <Wrapper>
      {pop_isLoading && top_isLoading && on_isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(imagePath || "")}>
            <Title>{pop_data?.results[0].name.toUpperCase()}</Title>
            <Overview>{pop_data?.results[0].overview}</Overview>
            <BannerIcon>
              <BannerPlay>Play &gt;</BannerPlay>
              <BannerInfo
                onClick={() => {
                  history.push(`/tv/${pop_data?.results[0].id}`);
                }}
              >
                Info &gt;
              </BannerInfo>
            </BannerIcon>
          </Banner>
          <TvSlider data={pop_data} category="now_playing" text="POP DRAMA" />
          <TvSlider data={top_data} category="top" text="TOP RANK" />
          <TvSlider data={on_data} category="up" text="UPDATE" />
        </>
      )}
      <Footer />
    </Wrapper>
  );
}

export default Tv;
