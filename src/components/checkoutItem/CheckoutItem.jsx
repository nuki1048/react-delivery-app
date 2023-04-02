import React from "react";
import { Box, Flex, Image, ListItem, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { breakpointsCheckoutItem } from "../../theme/breakpoints";

function CheckoutItem({ name, price, amount, image }) {
  return (
    <ListItem
      w={breakpointsCheckoutItem}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Image src={image} mr="14px" w="65px" h="65px" objectFit="contain" />
      <Flex flexDirection="column" mr="auto">
        <Box>{name}</Box>
        <Text color="#697386">
          Qty{" "}
          <Box as="span" color="#1A1F36">
            {amount}
          </Box>
        </Text>
      </Flex>
      <Text mb="auto">₴{price}</Text>
    </ListItem>
  );
}
CheckoutItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default CheckoutItem;
