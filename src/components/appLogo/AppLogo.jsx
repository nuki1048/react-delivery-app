import React from "react";
import { Box, Image, Heading } from "@chakra-ui/react";
import logo from "../../assets/logo.svg";
const AppLogo = () => {
  return (
    <Box display="flex" w="100px">
      <Image src={logo} alt="Delivery Food Logo" />
      <Heading as="h2" fontWeight="400" fontSize="15px" lineHeight="18px">
        Delivery Food
      </Heading>
    </Box>
  );
};

export default AppLogo;
