import styled from 'styled-components';

const TrialsBoard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  flex-grow: 1;
  .trials-board-body-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    .trials-board-graph-title-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      min-height: 30px;
      .label {
        margin: 0 10px;
        font-family: ${props => props.theme.titleFont};
      }
      .title {
        text-transform: uppercase;
      }
    }
    .trials-board-graph-container {
      flex-grow: 1;
      display: flex;
    }
    .trials-board-details-cointainer {
      padding-top: 10px;
      border-top: 2px solid ${props => props.theme.grey};
      height: 150px;
    }
  }
  .trials-board-no-trials {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default TrialsBoard;
