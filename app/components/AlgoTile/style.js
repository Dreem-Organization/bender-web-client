import styled from 'styled-components';

const AlgoTile = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${props => props.theme.greyDark};
  .algo-tile-ud-container {
    opacity: 0;
    position: absolute;
    right: 20px;
    top: 0;
    transition: 0.2s;
    .delete {
      color: ${props => props.theme.negative};
      font-size: 1rem;
    }
    .update {
      color: ${props => props.theme.main};
      font-size: 1rem;
    }
    i:hover {
      cursor: pointer;
    }
  }
  &:hover {
    .algo-tile-ud-container {
      opacity: 1;
    }
  }
  .algo-tile-head {
    display: flex;
    align-items: center;
    .algo-tile-name {
      color: ${props => props.theme.main};
      text-transform: capitalize;
      font-size: 1.2rem;
      margin-right: 5px;
      max-width: 50%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .algo-tile-trials {
      color: ${props => props.theme.greyDark};
      font-size: 1.2rem;
      font-weight: 100;
      margin-right: 5px;
      max-width: 50%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .algo-tile-hyper {
    font-size: 0.8rem;
    color: ${props => props.theme.main};
    font-weight: bolder;
  }
  .algo-tile-param-container {
    .algo-tile-params-container {
      .algo-tile-param-name,
      .algo-tile-param-category {
        font-size: 0.8rem;
        text-transform: capitalize;
      }
      .algo-tile-param-name {
        margin: 0 8px 0 8px;
        font-weight: bolder;
        text-transform: capitalize;
      }
    }
    .algo-tile-search-space-container {
      span {
        color: ${props => props.theme.main};
        margin-left: 20px;
        font-size: 0.7rem;
      }
    }
  }
  .clipboard-button {
    margin-top: 10px;
  }
  .algo-tile-buttons-container {
    with: 100%;
    display: flex;
    flex-direction: column;
    .button {
      margin-top: 5px;
      font-size: 0.8rem;
    }
  }
`;

export default AlgoTile;
