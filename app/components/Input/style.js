/* eslint-disable */
import styled from 'styled-components';

const Input = styled.input`
  flex-grow: 1;
  height: 30px;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9em;
  font-weight: bold;
  color: ${props => props.theme.greyDark};
  border-bottom: 3px solid
    ${props =>
      props.meta.error && props.meta.visited && !props.meta.active
        ? props.theme.negative
        : props.theme.grey};
  transition: 0.4s;
  &:focus {
    border-bottom: 3px solid ${props => props.theme.main};
  }
`;

export default Input;
