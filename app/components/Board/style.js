import styled from 'styled-components';
import {
  slideInRight,
  slideOutRight,
  slideInLeft,
  slideOutLeft,
} from 'KeyFrames';

const Board = styled.div`
  position: absolute;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: ${props => props.theme.secondaryShadow};
  height: 100%;
  width: 100%;
  .board-title {
    margin: 10px 20px 0 20px;
    border-bottom: 2px solid ${props => props.theme.grey};
    padding-bottom: 10px;
    text-transform: capitalize;
  }

  &.slide-prev-enter.slide-prev-enter-active {
    animation: ${slideInRight} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  &.slide-prev-leave.slide-prev-leave-active {
    animation: ${slideOutLeft} 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  }

  &.slide-next-enter.slide-next-enter-active {
    animation: ${slideInLeft} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  &.slide-next-leave.slide-next-leave-active {
    animation: ${slideOutRight} 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  }
`;

export default Board;
