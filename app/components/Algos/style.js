import styled from 'styled-components';

const Algos = styled.div`
  background-color: white;
  min-width: 200px;
  border-left: 2px solid ${props => props.theme.grey};
  display: flex;
  flex-direction: column;
  overflow: scroll;
  .algos-head {
    min-height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 2px solid ${props => props.theme.grey};
  }
  .algo-list {
    width: 100%;
    .algo-tile {
      border-bottom: 2px solid ${props => props.theme.grey};
    }
    .algo-list-empty {
      display: flex;
      justify-content: center;
      padding-top: 20px;
    }
  }
  .algos-create-container {
    min-height: 60px;
    display: flex;
    justify-content: center;
  }
`;

export default Algos;
