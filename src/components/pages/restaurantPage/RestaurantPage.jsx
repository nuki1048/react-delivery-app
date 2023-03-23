import React from "react";
import { Flex, Input, Heading, Box, Text, Grid } from "@chakra-ui/react";

import AppFooter from "../../appFooter/AppFooter";
import AppHeader from "../../appHeader/AppHeader";
import MenuItem from "../../menuItem/MenuItem";

const RestaurantPage = () => {
  return (
    <>
      <AppHeader />
      <Flex mt="43px" w="443px" h="42px" align="center" justify="space-between">
        <Text as="h5" fontWeight="700" fontSize="36px" lineHeight="42px">
          Тануки
        </Text>
        <Text
          fontWeight="700"
          fontSize="18px"
          lineHeight="32px"
          color="brand.yellow"
        >
          4.5
        </Text>
        <Text
          fontWeight="400"
          fontSize="18px"
          lineHeight="32px"
          color="brand.gray"
        >
          От 900 ₴
        </Text>
        <Text
          fontWeight="400"
          fontSize="18px"
          lineHeight="32px"
          color="brand.gray"
        >
          Пицца и суши
        </Text>
      </Flex>
      <Grid p="46px 0 90px 0 " templateColumns="repeat(3,1fr)" gap="30px 24px">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </Grid>

      <AppFooter />
    </>
  );
};

export default RestaurantPage;
