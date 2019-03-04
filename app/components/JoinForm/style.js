/* eslint-disable */
import styled from 'styled-components';
import { scaleInCenter } from 'KeyFrames';

const LoginForm = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  .join-form-container {
    box-shadow: ${props => props.theme.shadow};
    background-color: white;
    padding: 20px 30px;
    display: flex;
    min-height: 280px;
    max-height: 280px;
    justify-content: space-between;
    flex-direction: column;
    ${props =>
    props.animate
      ? `animation: ${scaleInCenter} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;`
      : ''};
    .join-form-head {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    form {
      display: flex;
      flex-direction: column;
      .form-body {
        display: flex;
        .form-part {
          display: flex;
          flex-direction: column;
        }
      }
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
    .form-cgu-container {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        margin: 0;
      }
      a {
        color: ${props => props.theme.main};
        text-decoration: underline;
      }
      .input {
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
`;

export default LoginForm;
