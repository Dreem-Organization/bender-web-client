import styled from 'styled-components';

const ModalProfile = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  .delete-account-sub-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      .button {
        flex-grow: 1;
        margin: 0 5px;
      }
    }
  }
`;

export default ModalProfile;
