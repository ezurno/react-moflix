import { motion } from "framer-motion";
import styled from "styled-components";

export const OverlayBox = styled(motion.div)`
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 40vw;
  height: 75vh;
  position: fixed;
  border-radius: 15px;
  overflow: hidden;
  overflow-y: scroll;
  z-index: 99;

  background-color: ${(props) => props.theme.black.lighter};
`;

export const BlackOut = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.5;
  z-index: 3;
`;

export const OverlayTitle = styled.h2`
  font-size: 28px;
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  top: -80px;
  padding: 0 50px;
  width: 70%;
`;

export const OverlayOverview = styled.div`
  color: ${(props) => props.theme.white.lighter};

  width: 70%;
  font-size: 16px;
`;

export const OverlayImg = styled.div<{ bgphoto: string }>`
  background-image: linear-gradient(to top, rgba(0, 0, 0, 1), transparent),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 300px;
`;

export const OverlayTool = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 10px;
  flex-direction: column;
  padding-left: 50px;
`;

export const Score = styled.h2`
  font-size: 36px;
  margin-right: 28px;
`;

export const ToolBox = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Over = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin-bottom: 50px;
`;

export const OverHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
`;

export const OverInfo = styled.div`
  color: ${(props) => props.theme.white.darker};
`;

export const Poster = styled.div<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  width: 150px;
  height: 280px;
  position: absolute;
  top: 120px;
  right: 50px;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;

export const OpenYear = styled.span`
  padding: 4px 12px;
  margin: 15px 0;
  color: green;
  font-size: 18px;
  border-radius: 2px;
  border: 2px solid green;
`;

export const Crew = styled.div`
  margin-top: 80px;
  h1 {
    color: gray;
    font-size: 18px;
    margin: 15px 0;
  }

  p {
    font-size: 15px;
    color: ${(props) => props.theme.white.lighter};
    margin-left: 15px;
  }
`;
