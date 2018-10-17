import styled from 'styled-components';

const Modals = styled.div`
  display: ${props => (props.modalStates.open ? 'flex' : 'none')};
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
