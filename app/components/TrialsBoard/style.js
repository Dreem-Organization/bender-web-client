import styled from 'styled-components';

const TrialsBoard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  .trials-board-head-container {
    min-height: 40px;
    display: flex;
    align-items: center;
    }
  }
  .trials-board-filters-container {
    min-height: 40px;
    display: flex;
    align-items: center;
    i {
      margin-right: 8px;
      color: ${props => props.theme.main};
      font-size: 1.1rem;
    }
    .trials-board-filters {
      display: flex;
      flex-direction: row;
      .select {
        margin-left: 10px;
      }
    }
  }
  .trials-board-body-container {
    height: 100%;
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
      height: 100%;
    }
    .trials-board-visualize-container {
      .trials-board-visualize-sub-container {
        min-height: 40px;
        display: flex;
        align-items: center;
        i {
          margin-right: 8px;
          color: ${props => props.theme.main};
          font-size: 1.1rem;
        }
        .select {
          margin-left: 10px;
        }
        .trials-board-checkboxes {
          display: flex;
          .checkbox {
            margin-left: 10px;
          }
        }
      }
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
