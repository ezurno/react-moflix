import { motion } from "framer-motion";
import styled from "styled-components";

export const Searching = styled(motion.div)`
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 150px;
  padding: 0 80px;
  font-size: 24px;
`;
export const SearchTitle = styled(motion.div)`
  font-family: "Tilt Warp", cursive;
  font-size: 72px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 0px 60px;
  color: ${(props) => props.theme.black.lighter};
  span {
    color: ${(props) => props.theme.white.lighter};
  }
`;
export const SearchingMovie = styled(motion.div)`
  font-family: "Tilt Warp", cursive;
  border-bottom: 2px solid ${(props) => props.theme.white.darker};
  width: 100%;
  margin-top: 80px;
`;
export const SearchingTv = styled(motion.div)`
  font-family: "Tilt Warp", cursive;
  border-bottom: 2px solid ${(props) => props.theme.white.darker};
  width: 100%;
  margin-top: 80px;
  margin-bottom: 80px;
`;

export const SearchingTitle = styled(motion.div)`
  font-size: 25px;
  margin-bottom: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.white.darker};
  span {
    font-size: 72px;
    margin-right: 30px;
  }
`;

export const SearchingValue = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 5px;
  width: 100%;
  margin-bottom: 60px;
`;

export const SearchingBox = styled(motion.div)<{ bgphoto: string }>`
  height: 180px;
  border-radius: 15px;
  background-image: url(${(props) => props.bgphoto});
  background-color: ${(props) => props.theme.black.lighter};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  overflow: hidden;

  font-size: 10px;
  text-align: center;
  color: white;
`;

export const SearchingBoxInfo = styled(motion.div)`
  opacity: 0;
  padding: 10px;
  background-color: rgba(28, 28, 28, 0.6);
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 13px;
  }
`;
