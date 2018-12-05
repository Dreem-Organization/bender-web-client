import styled from 'styled-components';

const ModalCreateExperiment = styled.div`
  padding: 20px;
  width: 500px;
  display: flex;
  flex-direction: column;
  form {
    .button,
    textarea {
      width: 100%;
      margin-top: 10px;
    }
  }
`;

export default ModalCreateExperiment;
