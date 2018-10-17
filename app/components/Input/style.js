import styled from 'styled-components';

const Input = styled.input`
  height: 30px;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9em;
  font-weight: bold;
  color: ${props => props.theme.greyDark};
  border-bottom: 3px solid ${props => props.theme.grey};
  transition: 0.4s;
  &:focus {
    border-bottom: 3px solid ${props => props.theme.main};
  }
`;

export default Input;
