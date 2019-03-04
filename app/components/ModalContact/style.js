import styled from 'styled-components';

const ModalCreateExperiment = styled.div`
  padding: 20px;
  width: 700px;
  display: flex;
  flex-direction: column;
  form {
    .button,
    .label {
      width: 100%;
      margin-top: 20px;
      display: block;
    }
    .legal {
      margin-top: 10px;
      font-size: 0.5rem;
      line-height: 0.6rem;
      display: block;
      opacity: 0.6;
    }
  }
`;

export default ModalCreateExperiment;
