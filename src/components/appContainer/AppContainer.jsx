import React from "react";
import { Container } from "@chakra-ui/react";

import { breackpointsContainter } from "../../theme/breakpoints";

// eslint-disable-next-line react/prop-types
function AppContainer({ children }) {
  return (
    <Container
      maxW={breackpointsContainter}
      display="flex"
      justifyContent="center"
    >
      {children}
    </Container>
  );
}

export default AppContainer;
