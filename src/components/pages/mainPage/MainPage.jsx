import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Input, Spinner } from "@chakra-ui/react";

// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../../appHeader/AppHeader";
import AppBanner from "../../appBanner/AppBanner";
import AppFooter from "../../appFooter/AppFooter";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import {
  breackpointsMainPageInput,
  breakpointsHeadingMainPage,
} from "../../../theme/breakpoints";

import RestaurantsList from "../../restaurantsList/RestaurantsList";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

import AnimatedComponent from "../../animatedComponent/AnimatedComponent";
import { fetchRestaurants } from "./mainPageSlice";

function MainPage() {
  const [term, setTerm] = useState("");
  // const [restauratsData, setRestauratsData] = useState([]);
  // const { loading, error, getFullCollection } = foodService();
  const { restaurantsData, restaurantsLoadingStatus } = useSelector(
    (state) => state.restaurants
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // getDataRestaurans();
    dispatch(fetchRestaurants("RESTAURANTS"));
  }, []);

  const filteredData = (arr) =>
    arr.filter((item) => item.name.toLowerCase().includes(term.toLowerCase()));

  const data = filteredData(restaurantsData);

  const loadingSpinner =
    restaurantsLoadingStatus === "loading" ? (
      <Spinner ml="500px" gridColumn="1/4" w="200px" h="200px" />
    ) : null;

  const Error404Message =
    restaurantsLoadingStatus === "error" ? <ErrorMessage /> : null;

  const items =
    restaurantsLoadingStatus === "idle" ? (
      <RestaurantsList data={data} />
    ) : null;

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
          {loadingSpinner}
          {items}
          {Error404Message}
        </ErrorBoundary>
      </Box>
      <AppFooter />
    </AnimatedComponent>
  );
}

export default MainPage;
