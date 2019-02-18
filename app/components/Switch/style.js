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
  .input-error {
    white-space: nowrap;
    position: absolute;
    z-index: 10000;
    top: -30px;
    right: 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .input-error-arrow {
      position: absolute;
      width: 0;
      height: 0;
      bottom: -5px;
      left: 10px;
      border-right: 5px solid transparent;
      border-top: 5px solid ${props => props.theme.negative};
      border-left: 5px solid transparent;
    }
    span {
      font-size: 0.7rem;
      border-radius: 3px;
      padding: 5px;
      background-color: ${props => props.theme.negative};
      color: ${props => props.theme.inverted};
    }
  }
`;

export default Switch;
