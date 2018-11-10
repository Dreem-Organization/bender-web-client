import styled from 'styled-components';

const Switch = styled.div`
  display: flex;
  flex-direction: column;
  .switch-option {
    height: 15px;
    padding: 0 5px 0 5px;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    background-color: ${props => props.theme.grey};
    span {
      color: ${props => props.theme.inverted};
      font-size: 0.4rem;
      margin: 0;
    }
    transition: 0.3s;
    &:hover {
      cursor: pointer;
      background-color: ${props => props.theme.main};
    }
    &.selected {
      background-color: ${props => props.theme.main};
    }
  }
`;

export default Switch;
