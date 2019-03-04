import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  a { color: inherit; text-decoration: inherit;}

  body {
    ${'' /* font-family: 'Roboto', sans-serif; */}
    font-family: 'Roboto Slab', serif;
  }

  textarea, select, input, button { outline: none; }

  #app, #app-container {
    display: block;
    position: relative;
    height: 100vh;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  div::-webkit-scrollbar { 
    display: none; 
  }

  .cookies-header-container {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.64);
    display: flex;
    align-items: center;
    flex-direction: column;
    .cookies-header {
      margin-top: 20px;
      min-height: 80px;
      width: 70%;
      min-width: 400px;
      background-color: #fff;
      border-radius: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 20px;
      button {
        margin-top: 20px;
        background-color: green;
        border-radius: 5px;
        padding: 5px 10px;
        color: white;
        &:hover {
          opacity: 0.8;
          cursor: pointer;
        }
      }
    }
  }
`;
