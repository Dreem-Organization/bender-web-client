import styled from 'styled-components';
import { slideInRight, slideOutRight, shrink } from 'KeyFrames';

const Toast = styled.div`
  color: ${props => props.theme.inverted};
  background-color: ${props => props.theme.main};
  padding: 10px;
  transition: 0.2s;
  border-radius: 5px;
  margin: 10px;
  height: 70px;
  font-size: 0.9rem;
  overflow: hidden;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }

  &.example-enter {
  }

  &.example-enter.example-enter-active {
    animation: ${slideInRight} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  &.example-leave {
  }

  &.example-leave.example-leave-active {
    animation-name: ${slideOutRight}, ${shrink};
    animation-iteration-count: 1, 1;
    animation-duration: 0.5s, 0.2s;
    animation-delay: 0s, 0.5s;
    animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53), ease-out;
  }
`;

export default Toast;
