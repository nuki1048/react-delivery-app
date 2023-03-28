import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/app/App";

import { sizes, styles, fonts, colors } from "./theme/theme";

import "./styles/Style.css";
// eslint-disable-next-line import/no-named-as-default
import ShopContext from "./context/shop-context";

const theme = extendTheme({ colors, fonts, styles, sizes });
ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <ShopContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ShopContext>
  </ChakraProvider>
);
