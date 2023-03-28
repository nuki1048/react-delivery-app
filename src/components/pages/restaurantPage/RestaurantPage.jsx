import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import AppFooter from "../../appFooter/AppFooter";
import AppHeader from "../../appHeader/AppHeader";
// import MenuItem from "../../menuItem/MenuItem";
// import { breackpointsGrid } from "../../../theme/breakpoints";

import foodService from "../../../services/foodService";
// import { ErrorMessage } from "formik";
import MenuList from "../../menuList/MenuList";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import AnimatedComponent from "../../animatedComponent/AnimatedComponent";

function RestaurantPage() {
  const { getOneDoc } = foodService();
  const { storeName } = useParams();
  const [restaurantsInfo, setRestaurantsInfo] = useState(null);

  const onInfoLoaded = (info) => {
    setRestaurantsInfo(info);
  };
  const getInfo = () => {
    getOneDoc("RESTAURANTS", storeName).then(onInfoLoaded);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <AnimatedComponent>
      <AppHeader />
      <Flex mt="43px" w="443px" h="42px" align="center" justify="space-between">
        <Text as="h5" fontWeight="700" fontSize="36px" lineHeight="42px">
          {restaurantsInfo?.name}
        </Text>
        <Text
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
          {restaurantsInfo?.rating}
        </Text>
        <Text
          fontWeight="400"
          fontSize="18px"
          lineHeight="32px"
          color="brand.gray"
        >
          От {restaurantsInfo?.startingPrice} ₴
        </Text>
        <Text
          fontWeight="400"
          fontSize="18px"
          lineHeight="32px"
          color="brand.gray"
        >
          {restaurantsInfo?.category}
        </Text>
      </Flex>
      <ErrorBoundary>
        <MenuList storeName={storeName} />
      </ErrorBoundary>
      <AppFooter />
    </AnimatedComponent>
  );
}

export default RestaurantPage;
