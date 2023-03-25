import React, { useState, useEffect } from "react";
import { Box, Flex, Grid, Heading, Input } from "@chakra-ui/react";

import AppHeader from "../../appHeader/AppHeader";
import AppBanner from "../../appBanner/AppBanner";
import AppFooter from "../../appFooter/AppFooter";

import {
  breackpointsMainPageInput,
  breakpointsHeadingMainPage,
} from "../../../theme/breakpoints";

import RestaurantsList from "../../restaurantsList/RestaurantsList";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

const MainPage = () => {
  return (
    <>
      <AppHeader />
      <Box as="section">
        <AppBanner />
        <Flex p="50px 0 " justify="space-between" align="center">
          <Heading
            as="h5"
            className="font-bold text-4xl"
            fontWeight="700"
            fontSize={breakpointsHeadingMainPage}
            lineHeight="42px"
          >
            Рестораны
          </Heading>
          <Input
            placeholder="Поиск блюд и ресторанов"
            w={breackpointsMainPageInput}
            h="40px"
            backgroundColor="#FFF"
          />
        </Flex>
        <ErrorBoundary>
          <RestaurantsList />
        </ErrorBoundary>
      </Box>
      <AppFooter />
    </>
  );
};

export default MainPage;
