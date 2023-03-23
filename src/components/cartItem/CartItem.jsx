import React from "react";
import { Flex, Box, ListItem, Text, Button } from "@chakra-ui/react";
const CartItem = () => {
  return (
    <ListItem p="8px 0 8px 0" borderBottom="1px solid #D9D9D9">
      <Flex align="center " justify="space-between">
        <Text fontWeight="400" fontSize="18px" lineHeight="32px">
          Ролл угорь стандарт
        </Text>
        <Flex w="215px" justify="space-between" align="center">
          <Text fontWeight="700" fontSize="20px" lineHeight="32px">
            250 ₴
          </Text>
          <Button colorScheme="linkedin" variant="outline">
            -
          </Button>
          <Box>1</Box>
          <Button colorScheme="linkedin" variant="outline">
            +
          </Button>
        </Flex>
      </Flex>
    </ListItem>
  );
};

export default CartItem;
