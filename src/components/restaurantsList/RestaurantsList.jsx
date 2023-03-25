import { useState, useEffect } from "react";
import { Grid, Spinner } from "@chakra-ui/react";

import RestaurantItem from "../restaurantItem/RestaurantItem";
import { breackpointsGrid } from "../../theme/breakpoints";
import foodService from "../../services/foodService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const RestaurantsList = () => {
  const [restauratsData, setRestauratsData] = useState([]);

  const { loading, error, getFullCollection } = foodService();

  const getDataRestaurans = () => {
    getFullCollection("RESTAURANTS").then(onItemLoaded);
  };

  const onItemLoaded = (data) => {
    setRestauratsData(data);
  };

  useEffect(() => {
    getDataRestaurans();
  }, []);

  const renderItems = (arr) => {
    return arr.map((item) => {
      return (
        <Link key={item.id} to={`/restaurats/${item.id}`}>
          <RestaurantItem
            key={item.id}
            storeName={item.id}
            name={item.name}
            price={item.startingPrice}
            rating={item.rating}
            category={item.category}
          />
        </Link>
      );
    });
  };

  const loadingSpinner = loading ? (
    <Spinner gridColumn="1/4" w="200px" h="200px" />
  ) : null;

  const Error404Message = error ? <ErrorMessage /> : null;

  const items = !(error || loading || !restauratsData)
    ? renderItems(restauratsData)
    : null;

  return (
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
  );
};

export default RestaurantsList;
