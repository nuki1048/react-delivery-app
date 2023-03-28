import React from "react";
import { Grid, Spinner } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import PropsTypes from "prop-types";
import AnimatedComponent from "../animatedComponent/AnimatedComponent";
import RestaurantItem from "../restaurantItem/RestaurantItem";
import { breackpointsGrid } from "../../theme/breakpoints";
import foodService from "../../services/foodService";
import ErrorMessage from "../errorMessage/ErrorMessage";

function RestaurantsList({ data }) {
  const { loading, error } = foodService();

  const renderItems = (arr) =>
    arr.map((item) => (
      <Link key={item.id} to={`/restaurats/${item.id}`}>
        <RestaurantItem
          key={item.id}
          storeName={item.id}
          name={item.name}
          price={item.startingPrice}
          category={item.category}
          rating={item.rating}
        />
      </Link>
    ));

  const loadingSpinner = loading ? (
    <Spinner gridColumn="1/4" w="200px" h="200px" />
  ) : null;

  const Error404Message = error ? <ErrorMessage /> : null;

  const items = !(error || loading || !data) ? renderItems(data) : null;

  return (
    <AnimatedComponent>
      <Grid
        p={{ base: "45px 0 20px 0 ", md: "46px 0 90px 0 " }}
        gridTemplateColumns={breackpointsGrid}
        gap="28px 24px"
        minH="700px"
        justifyItems="center"
        alignItems="center"
      >
        {loadingSpinner}
        {Error404Message}
        {items}
      </Grid>
    </AnimatedComponent>
  );
}

RestaurantsList.propTypes = {
  data: PropsTypes.objectOf.isRequired,
};

export default RestaurantsList;
