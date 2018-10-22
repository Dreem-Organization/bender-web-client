import styled from 'styled-components';

const StyledGithubButton = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  button {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    &:hover {
      cursor: pointer;
    }
  }
  .image {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  transition: 0.1s;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export default StyledGithubButton;
