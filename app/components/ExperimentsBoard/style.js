import styled from 'styled-components';

const ExperimentsBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 10px;
  .experiments-board-button-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    i {
      font-size: 1.5rem;
    }
  }
  .experiments-board-empty {
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }
`;

export default ExperimentsBoard;
