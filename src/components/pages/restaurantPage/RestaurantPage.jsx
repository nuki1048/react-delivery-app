import React, { useEffect, useState } from "react";
import { Flex, Text, Grid, Spinner, Box, Heading } from "@chakra-ui/react";

import AppFooter from "../../appFooter/AppFooter";
import AppHeader from "../../appHeader/AppHeader";
import MenuItem from "../../menuItem/MenuItem";
import { breackpointsGrid } from "../../../theme/breakpoints";
import { Link, useParams } from "react-router-dom";

import foodService from "../../../services/foodService";
import { ErrorMessage } from "formik";

const RestaurantPage = () => {
  const { loading, error, getOneDoc, getFullCollection } = foodService();
  const { storeName } = useParams();
  const [restaurantsInfo, setRestaurantsInfo] = useState(null);
  const [data, setData] = useState([]);

  const getInfo = () => {
    getOneDoc("RESTAURANTS", storeName).then(onInfoLoaded);
  };
  const getData = () => {
    getFullCollection("PRODUCTS").then(onDataLoaded);
  };
  const onInfoLoaded = (info) => {
    setRestaurantsInfo(info);
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  useEffect(() => {
    getInfo();
    getData();
  }, []);

  const renderItems = (arr) => {
    const filteredArr = arr?.filter((item) => item.storeName === storeName);
    const items =
      filteredArr.length > 0 ? (
        filteredArr.map((item) => {
          return (
            <MenuItem
              key={item.id}
              name={item.name}
              price={item.price}
              description={item.description}
            />
          );
        })
      ) : (
        <Box gridColumn="1/4">
          <Heading as="h3">Здесь пока что пусто</Heading>
          <Link to="/">Вернуться на главную страничку</Link>
        </Box>
      );
    return items;
  };
  const items = !(loading || error || !data) ? renderItems(data) : null;
  const spinnerLoading = loading ? (
    <Spinner width="200px" height="200px" gridColumn="1/4" />
  ) : null;
  const error404 = error ? <ErrorMessage /> : null;
  return (
    <>
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
      <Grid
        minH="800px"
        p="46px 0 90px 0 "
        templateColumns={breackpointsGrid}
        gap="30px 24px"
        justifyItems="center"
      >
        {items}
        {spinnerLoading}
        {error404}
      </Grid>
      <AppFooter />
    </>
  );
};

export default RestaurantPage;
