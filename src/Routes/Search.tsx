import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getSearchMovie, getSearchTv, ISearchData } from "../api";
import Footer from "../Components/Footer";
import SearchMovie from "../Components/Searching/SearchMovie";
import SearchTv from "../Components/Searching/SearchTv";
import { Wrapper } from "../Styles/StyledHome";
import { Searching, SearchTitle } from "../Styles/StyledSearch";

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  // url의 값 ?keyword=value& 에서 keyword= 값을 가져오는 방법
  console.log(keyword);

  const { data: movie_Data, refetch: movie_refetch } = useQuery<ISearchData>(
    ["search", "movie"],
    () => getSearchMovie(keyword!),
    { enabled: !!keyword }
  );

  const { data: tv_Data, refetch: tv_refetch } = useQuery<ISearchData>(
    ["search", "tv"],
    () => getSearchTv(keyword!),
    {
      enabled: !!keyword,
    }
  );

  useEffect(() => {
    movie_refetch();
    tv_refetch();
  }, [keyword]); // 검색 시 rerendering
  return (
    <>
      {keyword === null ? (
        <div>NOT ACCEPT</div>
      ) : (
        <Searching>
          <SearchTitle>
            Reasult of search... <span>{keyword}</span>
          </SearchTitle>
          <SearchMovie keyword={keyword} movieData={movie_Data!} />
          <SearchTv keyword={keyword} tvData={tv_Data!} />
        </Searching>
      )}
      <Footer />
    </>
  );
}

export default Search;
