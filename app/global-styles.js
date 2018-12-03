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
`;
