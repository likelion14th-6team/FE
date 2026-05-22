import { createGlobalStyle } from 'styled-components';

import font from '../assets/fonts/GeekbleMalang2TTF.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GeekbleMalang';
    src: url(${font}) format('truetype');
    font-weight: 400;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    min-height: 100vh;
  }

  body {
    font-family: 'GeekbleMalang', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: linear-gradient(63deg, #D6EDE5 26%, #CEECC4 56%, #ACDAC1 86%);
    background-attachment: fixed;
    color: #0f131c;
    -webkit-font-smoothing: antialiased;
  }
`;

export default GlobalStyle;
