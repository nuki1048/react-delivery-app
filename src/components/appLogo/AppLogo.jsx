import React from "react";
import { Box, Image } from "@chakra-ui/react";
import logo from "../../assets/logo.svg";
const AppLogo = () => {
  return (
    <Box display="flex" w="100px">
      <Image src={logo} alt="Delivery Food Logo" />
      <h2 className="font-normal text-sm">Delivery Food</h2>
    </Box>
  );
};

export default AppLogo;
