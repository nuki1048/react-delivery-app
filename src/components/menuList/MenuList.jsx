import { Box, Grid, MenuItem, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import foodService from "../../services/foodService";
import { breackpointsGrid } from "../../theme/breakpoints";
import ErrorMessage from "../errorMessage/ErrorMessage";
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
  );
};

export default MenuList;
