import React, { createContext, useState } from "react";
import theme_main from "../Theme";
import styled from "styled-components";

export const ThemeContextProvider = createContext();

const Div = styled.div`
  padding: 30px 50px;
  min-height: 100vh;
  background: ${(props) => theme_main[props.mode].secondary};
  // * {
  //   background: ${(props) => theme_main[props.mode].secondary};
  //   color: ${(props) => theme_main[props.mode].primary};
  // }
`;

const ThemeContext = ({ children }) => {
  const [mode, setMode] = useState("light");

  return (
    <ThemeContextProvider.Provider value={{ mode, setMode }}>
      <Div mode={mode}>{children}</Div>
    </ThemeContextProvider.Provider>
  );
};

export default ThemeContext;
