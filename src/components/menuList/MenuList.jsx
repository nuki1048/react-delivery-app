import React, { useEffect, useState } from "react";

import { Box, Grid, Heading, Spinner } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import { ShopContext } from "../../context/shop-context";
import foodService from "../../services/foodService";
import { breackpointsGrid } from "../../theme/breakpoints";

import ErrorMessage from "../errorMessage/ErrorMessage";
import MenuItem from "../menuItem/MenuItem";
import AnimatedComponent from "../animatedComponent/AnimatedComponent";

function MenuList({ storeName }) {
  const { loading, error, getFullCollection } = foodService();
  const [data, setData] = useState([]);
  const onDataLoaded = (newData) => {
    setData(newData);
  };

  const getData = () => {
    getFullCollection("PRODUCTS").then(onDataLoaded);
  };

  useEffect(() => {
    getData();
  }, []);

  const renderItems = (arr) => {
    const filteredArr = arr?.filter((item) => item.storeName === storeName);
    const items =
      filteredArr.length > 0 ? (
        filteredArr.map((item) => (
          <MenuItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
          />
        ))
      ) : (
        <Box gridColumn="1/4">
          <Heading as="h3" mb="30px">
            Здесь пока что пусто
          </Heading>
          <Link style={{ margin: "60px", textDecoration: "underline" }} to="/">
            Вернуться на главную страничку
          </Link>
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
    <AnimatedComponent>
      <Grid
        minH="800px"
        p="46px 0 90px 0 "
        templateColumns={breackpointsGrid}
        templateRows="418px"
        gap="30px 24px"
        justifyItems="center"
      >
        {items}
        {spinnerLoading}
        {error404}
      </Grid>
    </AnimatedComponent>
  );
}
MenuList.propTypes = {
  storeName: PropTypes.string.isRequired,
};

export default MenuList;
