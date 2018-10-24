import styled from 'styled-components';

const Menu = styled.div`
  display: flex;
  box-shadow: ${props => props.theme.secondaryShadow};
  flex-direction: column;
  align-items: center;
  min-width: 60px;
  margin: 0;
  padding: 0;
  background-color: ${props => props.theme.inverted};
  position: relative;
  z-index: 10;
  .menu-logo-container {
    margin-top: 10px;
    position: relative;
    height: 40px;
    width: 40px;
    &:hover {
      .fixed {
        display: none;
      }
      .animated {
        display: block;
      }
    }
    .image {
      position: absolute;
      top: 0;
      left: 0;
    }
    .fixed {
      ${p => (p.fetching.length > 0 ? 'display: none' : 'display: block')};
    }
    .animated {
      ${p => (p.fetching.length > 0 ? 'display: block' : 'display: none')};
    }
  }
  .button {
    margin-top: 20px;
  }
  transition: 0.3s;
  margin-left: ${props => (props.visible ? 0 : '-60px')};
  .hide {
    position: absolute;
    top: 50vh;
    right: 0;
    display: inline-block;
    width: 0.7rem;
    height: 0.7rem;
    border-top: 0.1rem solid ${props => props.theme.main};
    border-right: 0.1rem solid ${props => props.theme.main};
    transform: rotate(-135deg);
    transition: 0.1s;
    opacity: 0.5;
    &:hover {
      opacity: 1;
      cursor: pointer;
      transform: rotate(-135deg) scale(1.2);
    }
    &.hidden {
      transform: rotate(45deg);
      right: -10px;
      &:hover {
        cursor: pointer;
        transform: rotate(45deg) scale(1.2);
      }
    }
  }
`;

export default Menu;
