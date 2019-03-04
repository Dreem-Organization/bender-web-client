import styled from 'styled-components';

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  visibility: hidden;
  position: fixed;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  top: 0;
  background-color: white;
  padding: 20px;
  .cgu-text-container {
    flex-grow: 1;
  }
  &.open {
    visibility: visible;
  }
`;

export default Menu;
