import styled from 'styled-components';

const RankingBoard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px 20px;
  .ranking-board-container {
    overflow: scroll;
    .ranking-board-head {
      display: flex;
      flex-direction: row;
      transition: 0.3s;
      border-bottom: 2px solid ${props => props.theme.grey};
      .label {
        text-align: center;
      }
      .ranking-board-listing {
        flex-grow: 1;
        min-width: 200px;
        display: flex;
        justify-content: center;
        .label {
          text-transform: uppercase;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .ranking-board-list {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      .ranking-board-list-elem {
        display: flex;
        flex-direction: row;
        min-height: 175px;
        max-height: 175px;
        padding: 10px 0;
        transition: 0.3s;
        border-bottom: 2px solid ${props => props.theme.grey};
        .tile {
          transition: 0.3s;
          border-left: 2px solid ${props => props.theme.grey};
          &.stats {
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 200px;
            flex-grow: 1;
          }
          &.inactive {
            color: ${props => props.theme.grey};
          }
        }
      }
    }
  }
  .ranking-board-add-algo {
    width: 100%;
    transition: 0.3s;
    border-top: 2px solid ${props => props.theme.grey};
    display: flex;
    justify-content: center;
    .spec {
      padding-top: 10px;
    }
  }
  .ranking-board-rank {
    min-width: 90px;
    max-width: 90px;
  }
  .ranking-board-algo {
    min-width: 250px;
    max-width: 250px;
  }
`;

export default RankingBoard;
