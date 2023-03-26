import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import { BrowserRouter } from "react-router-dom";

import { sizes, styles, fonts, colors } from "./theme/theme";

import "./styles/Style.css";
import ShopContext from "./context/shop-context";

const theme = extendTheme({ colors, fonts, styles, sizes });
ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <ShopContext>
      <App />
    </ShopContext>
  </ChakraProvider>
);
