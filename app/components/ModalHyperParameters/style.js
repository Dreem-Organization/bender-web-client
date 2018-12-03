import styled from 'styled-components';

const ModalHyperParameters = styled.div`
  padding: 20px;
  width: 500px;
  display: flex;
  flex-direction: column;
  .modal-hyper-parameters-container {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .modal-hyper-parameters-sub {
      display: flex;
      flex-direction: row;
      margin: 2px 0 2px 0;
      min-height: 20px;
      input {
        flex-grow: 1;
        font-weight: bold;
        padding: 8px 5px;
        font-size: 0.7rem;
        transition: 0.3s;
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
    }
  }
  .button {
    margin-top: 10px;
    padding: 0 10px;
    width: 100%;
  }
`;

export default ModalHyperParameters;
