import styled from 'styled-components';

const ModalCreateAlgo = styled.div`
  padding: 20px;
  width: 650px;
  display: flex;
  flex-direction: column;
  form {
    display: flex;
    flex-direction: column;
    .parameters-list {
      margin-top: 10px;
      .parameters-head {
        display: flex;
        flex-direction: row;
        .spec {
          margin-left: 10px;
        }
      }
      .parameters {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 10px;
        .delete-container {
          font-size: 0.8rem;
          transition: 0.3s;
          color: ${props => props.theme.grey};
          &:hover {
            cursor: pointer;
            color: ${props => props.theme.negative};
          }
        }
        .input,
        .select {
          margin-left: 10px;
        }
        .spec {
          margin: 5px 0 5px 10px;
        }
        .non-categoricals {
          display: flex;
          flex-direction: row;
          .input {
            width: 50px;
          }
        }
        .categoricals {
          display: flex;
          .categorical-list {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .categorical {
              max-width: 100px;
              position: relative;
              input {
                width: 100%;
              }
              i {
                opacity: 0;
                top: 0;
                right: 0;
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
            }
          }
        }
      }
    }
    .submit {
      margin-top: 20px;
    }
  }
  .create-algo-no-update {
    display: none;
  }
`;

export default ModalCreateAlgo;