import styled from 'styled-components';

const ExperimentTile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 2px solid ${props => props.theme.grey};
  font-family: ${props => props.theme.titleFont};
  .experiment-tile-info-container {
    display: flex;
    flex-direction: column;
    .experiment-tile-name {
      font-size: 1rem;
      font-weight: bold;
      color: ${props => props.theme.main};
    }
    .experiment-tile-owner {
      display: flex;
      align-items: center;
      font-size: 0.8rem;
      color: ${props => props.theme.greyDark};
      i {
        color: ${props => props.theme.main};
        font-size: 1.2rem;
      }
    }
  }
  .experiment-tile-meta-container {
    display: flex;
    align-items: center;
    .experiment-tile-meta-sub-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 10px;
      .experiment-tile-number {
        font-size: 1.4rem;
        color: ${props => props.theme.greyDark};
      }
      .experiment-tile-label {
        font-size: 0.6rem;
        color: ${props => props.theme.greyDark};
      }
    }
    .button {
      width: 0px;
      overflow: hidden;
      transition: width 0.3s;
    }
  }
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.grey};
    .button {
      width: 30px;
    }
  }
`;

export default ExperimentTile;
