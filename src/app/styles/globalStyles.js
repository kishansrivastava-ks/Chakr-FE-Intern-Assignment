// globalStyles.js
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }

  a {
    color: ${({ theme }) => theme.color};
    text-decoration: none;
  }
  div{
    color: ${({ theme }) => theme.color};
    background: ${({ theme }) => theme.background};
  }

  input, button {
    color: ${({ theme }) => theme.color};
    background-color: ${({ theme }) => theme.background};
  }
`;
