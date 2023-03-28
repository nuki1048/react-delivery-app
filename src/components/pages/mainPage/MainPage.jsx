import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Input } from "@chakra-ui/react";

import AppHeader from "../../appHeader/AppHeader";
import AppBanner from "../../appBanner/AppBanner";
import AppFooter from "../../appFooter/AppFooter";

import {
  breackpointsMainPageInput,
  breakpointsHeadingMainPage,
} from "../../../theme/breakpoints";

import RestaurantsList from "../../restaurantsList/RestaurantsList";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import foodService from "../../../services/foodService";
import AnimatedComponent from "../../animatedComponent/AnimatedComponent";

function MainPage() {
  const [term, setTerm] = useState("");
  const [restauratsData, setRestauratsData] = useState([]);
  const { getFullCollection } = foodService();

  const onItemLoaded = (data) => {
    setRestauratsData(data);
  };

  const getDataRestaurans = () => {
    getFullCollection("RESTAURANTS").then(onItemLoaded);
  };

  useEffect(() => {
    getDataRestaurans();
  }, []);

  const filteredData = (arr) =>
    arr.filter((item) => item.name.toLowerCase().includes(term.toLowerCase()));

  const data = filteredData(restauratsData);
  return (
    <AnimatedComponent>
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
            onChange={(e) => setTerm(e.target.value)}
            value={term}
            placeholder="Поиск блюд и ресторанов"
            w={breackpointsMainPageInput}
            h="40px"
            backgroundColor="#FFF"
          />
        </Flex>
        <ErrorBoundary>
          <RestaurantsList data={data} />
        </ErrorBoundary>
      </Box>
      <AppFooter />
    </AnimatedComponent>
  );
}

export default MainPage;
