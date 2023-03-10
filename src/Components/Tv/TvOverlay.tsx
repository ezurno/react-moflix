import { Variants } from "framer-motion";
import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import {
  getMovieCredit,
  getMovieDetail,
  getTvCredit,
  getTvDetail,
} from "../../api";
import { Loader } from "../../Styles/StyledHome";
import {
  BlackOut,
  Crew,
  OpenYear,
  Over,
  OverBar,
  OverHeader,
  OverInfo,
  OverlayBox,
  OverlayImg,
  OverlayOverview,
  OverlayTitle,
  OverlayTool,
  PlayBtn,
  Poster,
  Score,
  ToolBox,
} from "../../Styles/StyledOverlay";
import { ICrewData, IMovieInfoData } from "../../Utils/props";
import { makeImagePath } from "../../Utils/utilities";

interface IOverlayProps {
  category?: string;
  tvId: string;
}

const overlayVariants: Variants = {
  initial: { y: 150, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  exit: { y: 150, opacity: 0 },
};

const blackOutVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0 },
};

export function Overlay({ category, tvId }: IOverlayProps) {
  const history = useHistory();

  const { data: infoData, isLoading: infoLoading } = useQuery<IMovieInfoData>(
    ["movie", `${category}_detail`],
    () => getTvDetail(tvId)
  );

  const { data: creditData, isLoading: creditLoading } = useQuery<ICrewData>(
    ["movie", `${category}_credit`],
    () => getTvCredit(tvId)
  );

  return (
    <>
      {infoLoading && creditLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <BlackOut
            onClick={() => history.goBack()}
            variants={blackOutVariants}
            initial="initial"
            animate="animate"
          />
          <OverlayBox
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <OverlayImg
              bgphoto={makeImagePath(`${infoData?.backdrop_path}`, "w500")}
            />
            <OverlayTitle>{infoData?.name}</OverlayTitle>
            <Over>
              <OverlayTool>
                <OverBar>
                  <OpenYear>{infoData?.first_air_date}</OpenYear>
                  <PlayBtn>
                    <h1>PLAY</h1>
                    <span className="material-symbols-outlined">
                      play_circle
                    </span>
                  </PlayBtn>
                </OverBar>

                <OverHeader>
                  <Score>{infoData?.vote_average.toFixed(1)}???</Score>

                  <ToolBox>
                    <span className="material-symbols-outlined">
                      add_circle
                    </span>
                    <span className="material-symbols-outlined">recommend</span>
                    <span className="material-symbols-outlined">next_plan</span>
                  </ToolBox>
                </OverHeader>

                <OverlayOverview>{infoData?.overview}</OverlayOverview>
              </OverlayTool>
              <OverInfo>
                <Poster bgphoto={makeImagePath(`${infoData?.poster_path}`)} />
                <Crew>
                  <h1>ACTOR: </h1>
                  {creditData?.cast.slice(0, 7).map((crew, index) => (
                    <p key={crew + String(index)}>{crew.name}</p>
                  ))}

                  <h1>AUTHOR: </h1>
                  {creditData?.crew.slice(0, 2).map((crew, index) => (
                    <p key={crew + String(index)}>{crew.name}</p>
                  ))}
                </Crew>
              </OverInfo>
            </Over>
          </OverlayBox>
        </>
      )}
    </>
  );
}

export default Overlay;
