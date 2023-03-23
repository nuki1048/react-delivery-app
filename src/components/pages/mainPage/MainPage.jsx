import React from "react";
import { Box, Flex, Grid, Heading, Input } from "@chakra-ui/react";

import AppHeader from "../../appHeader/AppHeader";
import AppBanner from "../../appBanner/AppBanner";
import MenuItem from "../../menuItem/MenuItem";
import AppFooter from "../../appFooter/AppFooter";
import RestaurantItem from "../../restaurantItem/RestaurantItem";

const MainPage = () => {
  return (
    <>
      <AppHeader />
      <Box as="section">
        <AppBanner />
        <Flex p="50px 0 " justify="space-between" align="center">
          <Heading as="h5" className="font-bold text-4xl">
            Рестораны
          </Heading>
          <Input
            placeholder="Поиск блюд и ресторанов"
            w="306px"
            h="40px"
            backgroundColor="#FFF"
          />
        </Flex>
        <Grid
          p="46px 0 90px 0 "
          templateColumns="repeat(3,1fr)"
          gap="30px 24px"
        >
          <RestaurantItem />
          <RestaurantItem />
          <RestaurantItem />
          <RestaurantItem />
          <RestaurantItem />
          <RestaurantItem />
        </Grid>
      </Box>
      <AppFooter />
    </>
  );
};

export default MainPage;
