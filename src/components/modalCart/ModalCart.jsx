/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { Flex, Heading, Box, List, Button, Spinner } from "@chakra-ui/react";
import PropTypes from "prop-types";
import CartItem from "../cartItem/CartItem";
import {
  breackpointsCartFullAmountHeight,
  breakpointsCartFullAmountFont,
} from "../../theme/breakpoints";

import ErrorMessage from "../errorMessage/ErrorMessage";
import foodService from "../../services/foodService";
import { ShopContext } from "../../context/shop-context";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

function ModalCart({ onClose }) {
  const { cart, getTotalCartAmount } = useContext(ShopContext);

  const totalAmount = getTotalCartAmount();
  const { loading, error, getFullCollection } = foodService();
  const [data, setData] = useState([]);

  const onDataLoaded = (newData) => {
    setData(newData);
  };
  const getData = () => {
    getFullCollection("PRODUCTS").then(onDataLoaded);
  };

  useEffect(() => {
    getData();
  }, []);

  const renderItems = (arr) => {
    // eslint-disable-next-line array-callback-return, consistent-return
    return arr.map((item) => {
      if (+cart[item.id] !== 0 && cart[item.id] !== undefined) {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            amount={cart[item.id]}
          />
        );
      }
    });
  };

  const items = !(loading || error || !data) ? renderItems(data) : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const loadingSpinner = loading ? (
    <Spinner w="100px" h="100px" ml="30%" />
  ) : null;
  return (
    <Box>
      <Heading align="left" as="h3">
        Корзина
      </Heading>
      <Flex pt="45px" flexDirection="column" justify="center" align="center">
        <ErrorBoundary>
          <List
            spacing={4}
            w={{ base: "full", md: "680px" }}
            listStyleType="none"
          >
            {items}
            {errorMessage}
            {loadingSpinner}
          </List>
        </ErrorBoundary>
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
          {totalAmount} ₴
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
}
ModalCart.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalCart;
