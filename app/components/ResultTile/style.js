import styled from 'styled-components';

const RankTile = styled.div`
  flex-grow: 1;
  display: flex;
  border-left: 2px solid ${props => props.theme.grey};
  flex-direction: column;
  align-items: center;
  min-width: 200px;
  overflow-y: scroll;
  &.inactive {
    .title,
    .label,
    input {
      color: ${props => props.theme.grey} !important;
    }
  }
  .rank-tile-hp-container {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .rank-tile-hp {
      display: flex;
      flex-direction: row;
      margin: 2px 0 2px 0;
      min-height: 20px;
      input {
        flex-grow: 1;
        font-weight: bold;
        padding: 8px 5px;
        font-size: 0.7rem;
        background-color: ${props => props.theme.grey};
        color: ${props => props.theme.greyDark};
        border-radius: 5px;
        margin: 0 5px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        &:hover {
          cursor: pointer;
        }
      }
      input.right {
        max-width: 50px;
      }
      input.left {
        max-width: 110px;
      }
    }
  }
`;

export default RankTile;
