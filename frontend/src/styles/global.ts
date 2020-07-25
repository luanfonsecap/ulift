import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #f1f2f6;
    color: #2f3542;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Sanchez', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5 {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;
