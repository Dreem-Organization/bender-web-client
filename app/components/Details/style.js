import styled from 'styled-components';

const Details = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  .details-head {
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    align-items: center;
    .details-head-sub {
      padding-right: 40px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      i {
        margin-top: -3px;
        color: ${props => props.theme.main};
      }
    }
    .details-head-under {
      padding-left: 25px;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
  .details-body {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    .details-body-sub {
      height: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      .details-pm-container {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        overflow: scroll;
        text-align: center;
        .details-subtitle {
          min-height: 30px;
        }
        .details-line {
          min-height: 20px;
          display: flex;
          align-items: center;
          margin: 2px 0;
          .label,
          input {
            width: 50%;
            padding: 0 10px;
          }
          .label {
            text-transform: uppercase;
            font-weight: bold;
            text-align: right;
          }
          input {
            height: 20px;
            background-color: ${props => props.theme.grey};
            font-weight: bold;
            border-radius: 5px;
            color: ${props => props.theme.greyDark};
            font-size: 0.7rem;
          }
        }
      }
    }
  }
`;

export default Details;
