import styled from 'styled-components';

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  span {
    margin-left: 5px;
    font-family: 'Roboto', sans-serif;
    font-size: 0.9em;
    font-weight: bold;
    color: ${props => props.theme.greyDark};
  }
  input {
    &:hover {
      cursor: pointer;
    }
  }
`;

export default Checkbox;
