import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import pizza from "../../assets/pizza.jpg";
const RestaurantItem = () => {
  return (
    <Box
      w="384px"
      minH="378px"
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.05)"
      borderRadius="7px"
      background={`url(${pizza}) top center no-repeat`}
      backgroundColor="#FFF"
      p="268px 24px 35px 24px"
    >
      <Flex justify="space-between" align="center">
        <Text fontWeight="700" fontSize="24px" lineHeight="32px">
          Пицца плюс
        </Text>
        <Box
          w="55px"
          h="22px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="2px"
          backgroundColor="#000"
          color="#FFF"
          fontWeight="400"
          fontSize="12px"
          lineHeight="20px"
        >
          50 мин
        </Box>
      </Flex>
      <Flex w="205px" m="0 auto 0 20px" justify="space-between" align="center">
        <Box fontWeight="700" fontSize="18px" lineHeight="32px" color="#FFC107">
          4.5
        </Box>
        <Box
          fontWeight="400"
          fontSize="18px"
          lineHeight="32px"
          color=" #8C8C8C"
        >
          От 900 ₴
        </Box>
        <Box
          fontWeight="400"
          fontSize="18px"
          lineHeight="32px"
          color=" #8C8C8C"
        >
          Пицца
        </Box>
      </Flex>
    </Box>
  );
};

export default RestaurantItem;
