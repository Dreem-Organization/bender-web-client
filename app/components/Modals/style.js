import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    display: none;
    opacity: 0;
  }
  1% {
    display: flex;
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Modals = styled.div`
  &.is-open {
    display: flex;
    animation: ${fadeIn} 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  }
  opacity: 0;
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.59);
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  .modal-container {
    position: relative;
    background-color: ${props => props.theme.inverted};
    transition: 0.3s;
    max-height: 90vh;
    .modal-close {
      position: absolute;
      right: 0;
      top: 0;
      transition: 0.1s;
      color: ${props => props.theme.grey};
      &:hover {
        cursor: pointer;
        color: ${props => props.theme.negative};
      }
    }
  }
`;

export default Modals;
