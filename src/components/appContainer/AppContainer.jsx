import React from "react";
import { Container } from "@chakra-ui/react";
import { breackpointsContainter } from "../../theme/theme";
const AppContainer = ({ children }) => {
  return <Container maxW={breackpointsContainter}>{children}</Container>;
};
export default AppContainer;
