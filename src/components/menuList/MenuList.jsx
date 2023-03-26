import { Box, Grid, Heading, Spinner } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import foodService from "../../services/foodService";
import { breackpointsGrid } from "../../theme/breakpoints";

import ErrorMessage from "../errorMessage/ErrorMessage";
import MenuItem from "../menuItem/MenuItem";
const MenuList = ({ storeName }) => {
  const { loading, error, getFullCollection } = foodService();
  const [data, setData] = useState([]);

  const getData = () => {
    getFullCollection("PRODUCTS").then(onDataLoaded);
  };
  const onDataLoaded = (data) => {
    setData(data);
  };

  useEffect(() => {
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
              id={item.id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          );
        })
      ) : (
        <Box gridColumn="1/4">
          <Heading as="h3" mb="30px">
            Здесь пока что пусто
          </Heading>
          <Link style={{ margin: "60px" }} to="/">
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
  );
};

export default MenuList;
