import styled from 'styled-components';

const invertedMain = props =>
  props.theme.name === 'dark' ? props.theme.inverted : props.theme.main;

const mainInverted = props =>
  props.theme.name === 'dark' ? props.theme.main : props.theme.inverted;

const ModalProfile = styled.div`
  padding: 20px;
  width: 500px;
  display: flex;
  flex-direction: column;
  section {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }
  button {
    margin-top: 5px;
    position: relative;
    width: 60px;
    height: 30px;
    background-color: ${mainInverted};
    border: 2px solid ${invertedMain};
    border-radius: 22px;
    transition: 0.3s;
    &:before {
      position: absolute;
      border-radius: 22px;
      content: '';
      height: 22px;
      width: 22px;
      margin-left: ${props => (props.theme.name === 'dark' ? '2px' : '-24px')};
      bottom: 2px;
      background-color: ${invertedMain};
      transition: 0.4s;
    }
    &:hover {
      cursor: pointer;
    }
  }
`;

export default ModalProfile;
