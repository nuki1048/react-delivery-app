import React, { useReducer } from "react";
import { Flex, Box, ListItem, Text, Button } from "@chakra-ui/react";
import {
  breakpointsCartItemNameFont,
  breakpointsCartPriceFont,
} from "../../theme/breakpoints";
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
      break;
    case "decrement":
      return { count: state.count - 1 };
      break;
    default:
      throw new Error("ERROR");
      break;
  }
}
const CartItem = () => {
  const [state, dispatch] = useReducer(reducer, { count: 1 });
  return (
    <ListItem p="8px 0 8px 0" borderBottom="1px solid #D9D9D9">
      <Flex align="center " justify="space-between">
        <Text
          fontWeight="400"
          fontSize={breakpointsCartItemNameFont}
          lineHeight="32px"
        >
          Ролл угорь стандарт
        </Text>
        <Flex w="215px" justify="space-between" align="center">
          <Text
            mr="auto"
            fontWeight="700"
            fontSize={breakpointsCartPriceFont}
            lineHeight="32px"
          >
            250 ₴
          </Text>
          <Button
            onClick={() => dispatch({ type: "decrement" })}
            colorScheme="linkedin"
            variant="outline"
          >
            -
          </Button>
          <Box m="0 13px 0 13px">{state.count}</Box>
          <Button
            onClick={() => dispatch({ type: "increment" })}
            colorScheme="linkedin"
            variant="outline"
          >
            +
          </Button>
        </Flex>
      </Flex>
    </ListItem>
  );
};

export default CartItem;
