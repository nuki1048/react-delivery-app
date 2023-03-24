import React from "react";
import { Box, Flex, Grid, Heading, Input, SimpleGrid } from "@chakra-ui/react";

import AppHeader from "../../appHeader/AppHeader";
import AppBanner from "../../appBanner/AppBanner";

import AppFooter from "../../appFooter/AppFooter";
import RestaurantItem from "../../restaurantItem/RestaurantItem";

const MainPage = () => {
  return (
    <>
      <AppHeader />
      <Box as="section">
        <AppBanner />
        <Flex
          p="50px 0 "
          flexDirection={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
        >
          <Heading
            as="h5"
            className="font-bold text-4xl"
            fontWeight="700"
            fontSize="36px"
            lineHeight="42px"
          >
            Рестораны
          </Heading>
          <Input
            placeholder="Поиск блюд и ресторанов"
            w="306px"
            h="40px"
            backgroundColor="#FFF"
          />
        </Flex>
        <SimpleGrid
          p={{ base: "45px 0 20px 0 ", md: "46px 0 90px 0 " }}
          minChildWidth="384px"
          gap="30px 24px"
          justifyItems="center"
        >
          <RestaurantItem />
          <RestaurantItem />
          <RestaurantItem />
          <RestaurantItem />
          <RestaurantItem />
          <RestaurantItem />
        </SimpleGrid>
      </Box>
      <AppFooter />
    </>
  );
};

export default MainPage;
