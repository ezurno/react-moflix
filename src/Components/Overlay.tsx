import {
  Over,
  OverHeader,
  OverInfo,
  OverlayBox,
  OverlayImg,
  OverlayOverview,
  OverlayTitle,
  OverlayTool,
  Score,
  ToolBox,
} from "../Styles/StyledOverlay";
import { makeImagePath } from "../Utils/utilities";

interface IOverlayProps {
  backdrop_path: string;
  title: string;
  overview: string;
  layoutId: string;
}

export function Overlay({
  backdrop_path,
  title,
  overview,
  layoutId,
}: IOverlayProps) {
  return (
    <>
      <OverlayBox layoutId={layoutId}>
        <OverlayImg bgphoto={makeImagePath(`${backdrop_path}`, "w500")} />
        <OverlayTitle>{title}</OverlayTitle>
        <Over>
          <OverlayTool>
            <OverHeader>
              <Score>3.7</Score>
              <ToolBox>
                <span className="material-symbols-outlined">add_circle</span>
                <span className="material-symbols-outlined">recommend</span>
                <span className="material-symbols-outlined">next_plan</span>
              </ToolBox>
            </OverHeader>

            <OverlayOverview>{overview}</OverlayOverview>
          </OverlayTool>
          <OverInfo>123</OverInfo>
        </Over>
      </OverlayBox>
    </>
  );
}

export default Overlay;
