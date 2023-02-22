import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 0 60px;
  height: 200px;
  position: relative;
  top: -100px;
  margin-bottom: 180px;
`;

export const SliderRow = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-bottom: 5px;
  position: absolute;
  width: 100%;
`;

export const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;

  /* position: relative; slider가 이미 relative라서 사용하지 않아도 됨  */

  &:first-child {
    transform-origin: center left;
  }

  &:last-child {
    transform-origin: center right;
  }
`;

export const offset = 6;

export const BoxInfo = styled(motion.div)`
  padding: 12px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;

  h4 {
    text-align: center;
    font-size: 14px;
  }
`;

export const PrevBtn = styled.div`
  width: 3.5vh;
  height: 3.5vh;
  top: 13vh;
  position: absolute;
  svg {
    fill: rgb(238, 238, 238);
    :hover {
      fill: rgba(238, 238, 238, 0.7);
    }
  }
  z-index: 1;
  cursor: pointer;
`;

export const NextBtn = styled.div`
  width: 3.5vh;
  height: 3.5vh;
  top: 13vh;
  right: 5px;
  position: absolute;
  svg {
    fill: rgb(238, 238, 238);
    :hover {
      fill: rgba(238, 238, 238, 0.7);
    }
  }
  z-index: 1;
  cursor: pointer;
`;

export const SliderHeader = styled.div`
  font-size: 32px;
  font-weight: 300;
  margin-bottom: 48px;
`;
