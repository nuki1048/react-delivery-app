import React from "react";
import { Flex, Heading, Box, List, Button } from "@chakra-ui/react";
import CartItem from "../cartItem/CartItem";
import {
  breackpointsCartFullAmountHeight,
  breakpointsCartFullAmountFont,
} from "../../theme/breakpoints";

const ModalCart = () => {
  return (
    <Box>
      <Heading align="left" as="h3">
        Корзина
      </Heading>
      <Flex
        pt="45px"
        flexDirection="column"
        justify="center"
        align="flex-start"
      >
        <List
          spacing={4}
          w={{ base: "full", lg: "680px" }}
          listStyleType="none"
        >
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </List>
      </Flex>

      <Flex mt="52px" justify="space-between" align="center">
        <Box
          w="106px"
          h={breackpointsCartFullAmountHeight}
          borderRadius="5px"
          p={breakpointsCartFullAmountFont}
          background="#262626"
          color="#FFF"
          fontWeight="700"
          fontSize="20px"
          lineHeight="23px"
        >
          1250 ₴
        </Box>
        <Button
          ml={{ base: "0", md: "auto" }}
          colorScheme="linkedin"
          borderRadius="2px"
        >
          Оформить заказ
        </Button>
        <Button ml="18px" borderRadius="2px" variant="outline">
          Отмена
        </Button>
      </Flex>
    </Box>
  );
};

export default ModalCart;
