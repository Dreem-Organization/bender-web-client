import styled from 'styled-components';
import { slideInBottom } from 'KeyFrames';

const StyledBenderEyes = styled.div`
  position: absolute;
  bottom: -2px;
  left: 50px;
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  animation: ${slideInBottom} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  img {
    width: 100%;
    height: auto;
    opacity: 0.3;
  }
  .eyes-container {
    position: absolute;
  }
`;

export default StyledBenderEyes;
