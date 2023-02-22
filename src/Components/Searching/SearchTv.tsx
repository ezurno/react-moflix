import { Variants } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { ISearchData } from "../../api";
import {
  SearchingBox,
  SearchingBoxInfo,
  SearchingMovie,
  SearchingTitle,
  SearchingTv,
  SearchingValue,
} from "../../Styles/StyledSearch";
import { makeImagePath } from "../../Utils/utilities";
import Overlay from "../Movie/Overlay";
import TvOverlay from "../Tv/TvOverlay";

interface ITvSearch {
  keyword: string;
  tvData: ISearchData;
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

function SearchTv({ keyword, tvData }: ITvSearch) {
  const history = useHistory();
  const [tvId, setTvId] = useState<number>();

  const onClickMovie = (tvId: number) => {
    setTvId(tvId);
    history.push(`/search/tv/${tvId}?keyword=${keyword}`);
  };

  const tvMatch = useRouteMatch<{ tvId: string }>("/search/tv/:tvId:keyword");

  const findMovieData = tvData?.results.find((item) => item.id === tvId);

  return (
    <SearchingTv>
      <SearchingTitle>
        <span className="material-symbols-outlined">tv_gen</span>TV
      </SearchingTitle>
      <SearchingValue>
        {tvData?.results.map((data) => (
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
      {tvMatch ? (
        <>
          <TvOverlay tvId={String(findMovieData?.id)} category="search" />
        </>
      ) : null}
    </SearchingTv>
  );
}

export default SearchTv;
