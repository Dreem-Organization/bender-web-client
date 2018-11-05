import styled from 'styled-components';

const Experiments = styled.div`
  background-color: white;
  box-shadow: ${props => props.theme.secondaryShadow};
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  min-height: 80px;
  min-width: 1000px;
  .title {
    &.link {
      color: ${props => props.theme.greyDark};
      &:hover {
        color: ${props => props.theme.grey};
        cursor: pointer;
      }
    }
  }
  .selected {
    color: ${props => props.theme.greyDark};
    margin-left: 8px;
  }
  .experiments-head-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    .experiments-head-sub-container {
      display: flex;
      align-items: center;
      .experiments-head-portion {
        display: flex;
        flex-direction: row;
        align-items: center;
        .experiments-home {
          color: ${props => props.theme.main};
          transition: 0.2s;
          &:hover {
            cursor: pointer;
            color: ${props => props.theme.light};
            transform: scale(1.1);
          }
        }
        .experiments-link {
          color: ${props => props.theme.greyDark};
          margin: 0 5px;
        }
        .title {
          &.link {
            color: ${props => props.theme.greyDark};
          }
        }
      }
    }
    .select {
      margin: 0 10px;
    }
    .clipboard-button {
      margin-right: 10px;
    }
  }
  .experiments-infos-container {
    display: flex;
    i {
      margin: 5px 8px 0 0;
      color: ${props => props.theme.main};
      font-size: 1.1rem;
    }
    .experiments-infos-sub-container {
      margin-right: 20px;
      .label {
        margin-right: 5px;
      }
    }
  }
`;

export default Experiments;
