/* eslint-disable */
import styled from 'styled-components';
import { scaleInCenter } from 'KeyFrames';

const LoginForm = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  .login-form-container {
    box-shadow: ${props => props.theme.shadow};
    background-color: white;
    padding: 20px 30px;
    width: 300px;
    display: flex;
    min-height: 280px;
    max-height: 280px;
    justify-content: space-between;
    flex-direction: column;
    ${props =>
    props.animate
      ? `animation: ${scaleInCenter} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;`
      : ''};
    .login-form-head {
      display: flex;
      justify-content: space-between;
    }
    form {
      display: flex;
      flex-direction: column;
      .input,
      .button {
        margin: 5px;
      }
    }
    .label {
      margin-top: 5px;
      text-align: center;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export default LoginForm;
