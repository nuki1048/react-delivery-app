import React from "react";
import { Grid } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import PropsTypes from "prop-types";
import AnimatedComponent from "../animatedComponent/AnimatedComponent";
import RestaurantItem from "../restaurantItem/RestaurantItem";
import { breackpointsGrid } from "../../theme/breakpoints";

function RestaurantsList({ data }) {
  const renderItems = (arr) =>
    arr.map((item) => (
      <Link key={item.id} to={`/restaurats/${item.id}`}>
        <RestaurantItem
          key={item.id}
          storeName={item.id}
          name={item.name}
          price={+item.startingPrice}
          category={item.category}
          rating={item.rating}
        />
      </Link>
    ));

  const items = renderItems(data);

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
        {items}
      </Grid>
    </AnimatedComponent>
  );
}

RestaurantsList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropsTypes.array.isRequired,
};

export default RestaurantsList;
