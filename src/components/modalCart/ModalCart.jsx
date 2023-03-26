import React, { useContext, useEffect, useState } from "react";
import { Flex, Heading, Box, List, Button } from "@chakra-ui/react";
import CartItem from "../cartItem/CartItem";
import {
  breackpointsCartFullAmountHeight,
  breakpointsCartFullAmountFont,
} from "../../theme/breakpoints";
import foodService from "../../services/foodService";
import { ShopContext } from "../../context/shop-context";

const ModalCart = ({ onClose }) => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const { getFullCollection } = foodService();
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  });

  const getData = () => {
    getFullCollection("PRODUCTS").then(onDataLoaded);
  };
  const onDataLoaded = (data) => {
    setData(data);
  };

  const renderItems = (arr) => {
    return arr?.map((item) => {
      if (cartItems[item.id] > 0) {
        return <CartItem key={item.id} />;
      }
    });
  };

  const items = renderItems(data);
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
          {items}
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
        <Button
          onClick={onClose}
          ml="18px"
          borderRadius="2px"
          variant="outline"
        >
          Отмена
        </Button>
      </Flex>
    </Box>
  );
};

export default ModalCart;
