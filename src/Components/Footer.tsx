import styled from "styled-components";
import { FaGithubSquare } from "react-icons/fa";

const Wrapper = styled.div`
  height: 15vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    color: ${(props) => props.theme.white.darker};
    transition: 0.5s color ease-in-out;
    :hover {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  p {
    font-family: "Tilt Warp", cursive;
    color: ${(props) => props.theme.black.lighter};
    margin: 30px 0;
  }
`;

function Footer() {
  return (
    <Wrapper>
      <a href="https://github.com/ezurno/react-moflix">
        <FaGithubSquare size={48} />
      </a>
      <p>2023-02-22 netflix-clone @ezurno</p>
    </Wrapper>
  );
}

export default Footer;
