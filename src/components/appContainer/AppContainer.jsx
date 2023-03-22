import React from "react";
import { Container } from "@chakra-ui/react";

const AppContainer = ({ children }) => {
  return <Container maxW="1200px">{children}</Container>;
};
export default AppContainer;
