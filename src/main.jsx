import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import "./styles/Style.css";

// extend the theme

const colors = {
  brand: {
    blue: "#1890FF",
    yellow: "#FFC107",
    gray: "#8C8C8C",
  },
};
const fonts = {
  body: "Roboto",
};
const styles = {
  global: {
    body: {
      bg: "linear-gradient(180deg, rgba(245, 245, 245, 0) 1.04%, #F5F5F5 100%)",
      bgColor: "#fff",
    },
  },
};
const theme = extendTheme({ colors, fonts, styles });
ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <Box>
      <App />
    </Box>
  </ChakraProvider>
);
