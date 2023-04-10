/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppFooter from "../../appFooter/AppFooter";
import AppHeader from "../../appHeader/AppHeader";
// import MenuItem from "../../menuItem/MenuItem";
// import { breackpointsGrid } from "../../../theme/breakpoints";

// import { ErrorMessage } from "formik";
import MenuList from "../../menuList/MenuList";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import AnimatedComponent from "../../animatedComponent/AnimatedComponent";
import { fetchRestaurantInfo, setStoreName } from "./restaurantsPageSlice";

function RestaurantPage() {
  const { storeName } = useParams();
  const { restaurantInfo } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurantInfo({ collectionName: "RESTAURANTS", storeName }));
    dispatch(setStoreName(storeName));
  }, []);

  return (
    <AnimatedComponent>
      <AppHeader />
      <Flex
        mt="43px"
        w={{ base: "full", md: "443px" }}
        h="42px"
        align="center"
        justify={{ base: "space-evenly", md: "space-between" }}
      >
        <Text as="h5" fontWeight="700" fontSize="36px" lineHeight="42px">
          {restaurantInfo?.name}
        </Text>
        <Text
          display={{ base: "none", md: "block" }}
          fontWeight="700"
          fontSize="18px"
          lineHeight="32px"
          color="brand.yellow"
          position="relative"
          _before={{
            content: '"★"',
            position: "absolute",
            right: "70%",
            transform: "translateX(-70%)",
          }}
        >
          {restaurantInfo?.rating}
        </Text>
        <Text
          display={{ base: "none", md: "block" }}
          fontWeight="400"
          fontSize="18px"
          lineHeight="32px"
          color="brand.gray"
        >
          От {restaurantInfo?.startingPrice} ₴
        </Text>
        <Text
          fontWeight="400"
          fontSize="18px"
          lineHeight="32px"
          color="brand.gray"
        >
          {restaurantInfo?.category}
        </Text>
      </Flex>
      <ErrorBoundary>
        <MenuList />
      </ErrorBoundary>
      <AppFooter />
    </AnimatedComponent>
  );
}

export default RestaurantPage;
