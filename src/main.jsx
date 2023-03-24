import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import { sizes, styles, fonts, colors } from "./theme/theme";

import "./styles/Style.css";

const theme = extendTheme({ colors, fonts, styles, sizes });
ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <Box>
      <App />
    </Box>
  </ChakraProvider>
);
