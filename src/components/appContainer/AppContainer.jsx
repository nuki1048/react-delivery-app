import React from "react";
import { Container } from "@chakra-ui/react";

const AppContainer = (props) => {
  return <Container maxW="1200px">{props.children}</Container>;
};
export default AppContainer;
