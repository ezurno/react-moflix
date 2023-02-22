import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: black;
  height: 200vh;
  overflow-x: hidden;
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 60px;

  background-image: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 1)
    ),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

export const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 12px;
`;

export const Overview = styled.p`
  font-size: 24px;
  width: 40vw;
`;

export const BannerIcon = styled.div`
  margin-top: 50px;
  display: flex;
`;
export const BannerPlay = styled.span`
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.white.darker};
  color: ${(props) => props.theme.black.lighter};
  padding: 10px 30px;
  font-size: 30px;
  margin-right: 50px;
  border: 2px solid ${(props) => props.theme.white.darker};
  border-radius: 15px;
  cursor: pointer;

  transition: 0.5s color ease-in-out, 0.5s background-color ease-in-out;
  :hover {
    background-color: transparent;
    color: ${(props) => props.theme.white.darker};
  }
`;
export const BannerInfo = styled.span`
  text-align: center;
  justify-content: center;
  align-items: center;
  border: 2px solid ${(props) => props.theme.white.darker};
  border-radius: 15px;

  padding: 10px 30px;
  font-size: 30px;
  margin-right: 50px;
  font-size: 30px;
  cursor: pointer;

  transition: 0.5s color ease-in-out, 0.5s background-color ease-in-out;
  :hover {
    background-color: ${(props) => props.theme.white.darker};
    color: ${(props) => props.theme.black.lighter};
  }
`;
