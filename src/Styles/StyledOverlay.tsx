import { motion } from "framer-motion";
import styled from "styled-components";

export const OverlayBox = styled(motion.div)`
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

export const BlackOut = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

export const OverlayTitle = styled.h2`
  font-size: 28px;
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  top: -50px;
  padding: 0 20px;
`;

export const OverlayOverview = styled.p`
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  flex-direction: column;
`;

export const Score = styled.h2`
  font-size: 36px;
`;

export const ToolBox = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Over = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

export const OverHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
`;

export const OverInfo = styled.div`
  color: ${(props) => props.theme.white.darker};
`;
