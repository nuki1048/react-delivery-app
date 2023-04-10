/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unreachable */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useReducer } from "react";
import { Flex, Box, ListItem, Text, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  breakpointsCartItemNameFont,
  breakpointsCartPriceFont,
} from "../../theme/breakpoints";

import { addNewItem, removeItem } from "../modalCart/modalCartSlice";

// eslint-disable-next-line react/prop-types
function CartItem({ id, name, price, amount }) {
  const dispatch = useDispatch();

  return (
    <ListItem p="8px 0 8px 0" borderBottom="1px solid #D9D9D9">
      <Flex align="center " justify="space-between">
        <Text
          fontWeight="400"
          fontSize={breakpointsCartItemNameFont}
          lineHeight="32px"
        >
          {name}
        </Text>
        <Flex w="215px" justify="space-between" align="center">
          <Text
            mr="auto"
            fontWeight="700"
            fontSize={breakpointsCartPriceFont}
            lineHeight="32px"
          >
            {price} ₴
          </Text>
          <Button
            onClick={() => dispatch(removeItem(id))}
            colorScheme="linkedin"
            variant="outline"
          >
            -
          </Button>
          <Box m="0 13px 0 13px">{amount}</Box>
          <Button
            onClick={() => dispatch(addNewItem(id))}
            colorScheme="linkedin"
            variant="outline"
          >
            +
          </Button>
        </Flex>
      </Flex>
    </ListItem>
  );
}

CartItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CartItem;
