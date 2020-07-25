import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100vh;
    color: #2f3542;
  }

  body {
    background: #fff;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Sanchez', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5 {
    font-weight: 500;
    color: #2f3542;
  }

  button {
    cursor: pointer;
  }
`;
