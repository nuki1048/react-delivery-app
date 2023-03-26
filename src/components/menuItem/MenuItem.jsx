import React, { useContext, useRef } from "react";
import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";

import { breakpointsItem } from "../../theme/breakpoints";
import { ShopContext } from "../../context/shop-context";
const MenuItem = ({ name, price, description, image, id }) => {
  const toast = useToast();
  const toastIdRef = useRef();
  const { addToCart } = useContext(ShopContext);
  const descriptionSlice =
    description.length > 65 ? `${description.slice(0, 65)}...` : description;

  const onItemAddToCart = (id) => {
    addToast();
    addToCart(id);
  };
  const addToast = () => {
    toastIdRef.current = toast({
      description: `Товар успешно добавлен в корзину`,
      status: "success",
      isClosable: true,
    });
  };
  return (
    <Box
      w={breakpointsItem}
      padding="234px 24px 30px 24px"
      borderRadius="7px"
      background={`url(${image}) top center no-repeat`}
      backgroundColor="#FFF"
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.05)"
    >
      <Flex flexDirection="column" textAlign="left">
        <Heading as="h3" fontWeight="400" fontSize="24px" lineHeight="32px">
          {name}
        </Heading>
        <Text
          mt="10px"
          fontWeight="400"
          fontSize="18px"
          lineHeight="21px"
          color="#8C8C8C"
        >
          {descriptionSlice}
        </Text>
      </Flex>
      <Flex
        w="210px"
        m="25px auto 0 0 "
        mr="auto"
        justify="space-between"
        align="center"
      >
        <Button
          onClick={() => onItemAddToCart(id)}
          w="124px"
          h="40px"
          backgroundColor="brand.blue"
          color="#fff"
          borderRadius="2px"
        >
          В корзину
        </Button>
        <Text fontWeight="700" fontSize="20px" lineHeight="32px">
          {price} ₴
        </Text>
      </Flex>
    </Box>
  );
};

export default MenuItem;
