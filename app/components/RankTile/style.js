import styled from 'styled-components';

const RankTile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .title {
    text-align: center;
    font-size: 3rem;
    &.unranked {
      color: ${props => props.theme.greyDark};
    }
  }
  .label {
    margin-bottom: 20px;
  }
`;

export default RankTile;
