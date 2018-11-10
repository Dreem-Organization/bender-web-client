import styled from 'styled-components';

const ModalCreateExperiment = styled.div`
  padding: 20px;
  width: 500px;
  display: flex;
  flex-direction: column;
  form {
    .label,
    button {
      margin-top: 15px;
    }
    display: flex;
    flex-direction: column;
    .metrics-list {
      display: flex;
      flex-wrap: wrap;
      .metric {
        display: flex;
        position: relative;
        input {
          padding-left: 5px;
          max-width: 80px;
        }
        i {
          z-index: 10;
          opacity: 0;
          top: 0;
          right: 60px;
          font-size: 0.8rem;
          position: absolute;
          transition: 0.3s;
          color: ${props => props.theme.negative};
          &:hover {
            cursor: pointer;
          }
        }
        &:hover {
          i {
            opacity: 1;
          }
        }
        .switch {
          width: 60px;
        }
      }
    }
    .spec {
      margin: auto 0 auto 10px;
    }
  }
`;

export default ModalCreateExperiment;
