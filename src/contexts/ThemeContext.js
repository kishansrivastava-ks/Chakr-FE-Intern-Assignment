import React, { createContext, useState, useContext } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../app/styles/globalStyles";

const themes = {
  light: {
    background: "#fff",
    color: "#000",
  },
  dark: {
    background: "#333",
    color: "#fff",
  },
  purpleLight: {
    background: "#f3e5f5",
    color: "#4a148c",
  },
  purpleDark: {
    background: "#4a148c",
    color: "#f3e5f5",
  },
};

const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const [theme, setTheme] = useState(themes.dark);

  const changeTheme = (themeName) => {
    setTheme(themes[themeName]);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
