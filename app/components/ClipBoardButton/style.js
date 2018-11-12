import styled from 'styled-components';

const ClipBoardButton = styled.button`
  display: flex;
  align-items: center;
  border-radius: 5px;
  font-size: 0.7rem;
  height: 1.5rem;
  background-color: ${props => props.theme.grey};
  padding: 0 0 0 5px;
  color: ${props => props.theme.greyDark};
  font-weight: bold;
  overflow: hidden;
  input {
    flex-grow: 1;
    color: ${props => props.theme.greyDark};
    font-weight: bold;
    padding: 0 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .clipboard-button-copy {
    height: 1.5rem;
    color: ${props => props.theme.inverted};
    background-color: ${props => props.theme.main};
    display: flex;
    align-items: center;
    padding: 0 5px;
    i {
      font-size: 1rem !important;
    }
    transition: 0.2s;
    &:hover {
      cursor: pointer;
      background-color: ${props => props.theme.light};
    }
  }
`;

export default ClipBoardButton;
