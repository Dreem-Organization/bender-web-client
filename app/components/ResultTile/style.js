import styled from 'styled-components';

const RankTile = styled.div`
  flex-grow: 1;
  display: flex;
  border-left: 2px solid ${props => props.theme.grey};
  transition: 0.3s;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  .title {
    transition: 0.3s;
    font-size: 2.6rem;
  }
  &.inactive {
    .title {
      color: ${props => props.theme.grey} !important;
    }
  }
  &:hover {
    cursor: pointer;
    .title {
      transform: scale(1.1);
    }
  }
`;

export default RankTile;
