import styled from 'styled-components';
import {
  slideInRight,
  slideOutRight,
  slideInLeft,
  slideOutLeft,
  rotateBlink,
} from 'KeyFrames';

const Board = styled.div`
  position: absolute;
  background-color: ${props => props.theme.inverted};
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  box-shadow: ${props => props.theme.secondaryShadow};
  height: 100%;
  width: 100%;
  .board-title {
    margin: 10px 20px 0 20px;
    transition: 0.3s;
    padding-bottom: 10px;
    text-transform: capitalize;
    &.loaded {
      border-bottom: 2px solid ${props => props.theme.grey};
    }
    .material-icons {
      color: ${props => props.theme.main};
      position: absolute;
      top: 10px;
      right: 10px;
      transition: 0.4s;
      &.active {
        animation: ${rotateBlink} 1s infinite;
      }
      &.inactive {
        &:hover {
          transform: scale(1.1) rotate(-45deg);
          cursor: pointer;
        }
      }
    }
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
