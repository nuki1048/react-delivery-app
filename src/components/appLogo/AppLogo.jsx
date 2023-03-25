import React from "react";
import { Box, Image, Heading } from "@chakra-ui/react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
const AppLogo = () => {
  return (
    <Link to="/">
      <Box display="flex" w="100px">
        <Image src={logo} alt="Delivery Food Logo" />
        <Heading as="h2" fontWeight="400" fontSize="15px" lineHeight="18px">
          Delivery Food
        </Heading>
      </Box>
    </Link>
  );
};

export default AppLogo;
