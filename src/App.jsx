import { Box, Flex, Heading, Input } from "@chakra-ui/react";
import "./App.css";
import AppBanner from "./components/appBanner/AppBanner";
import AppFooter from "./components/appFooter/AppFooter";
import AppHeader from "./components/appHeader/AppHeader";
import RestaurantItem from "./components/restaurantItem/RestaurantItem";

function App() {
  return (
    <>
      <AppHeader />
      <Box
        as={"section"}
        background={
          "linear-gradient(180deg,rgba(245, 245, 245, 0) 1.04%,#f5f5f5 100%)"
        }
      >
        <AppBanner />
        <Flex p={"50px 0 "} justify="space-between" align="center">
          <Heading as={"h5"} className="font-bold text-4xl">
            Рестораны
          </Heading>
          <Input
            placeholder="Поиск блюд и ресторанов"
            w={"306px"}
            h={"40px"}
            backgroundColor={"#FFF"}
          />
        </Flex>
        <RestaurantItem />
      </Box>
      <AppFooter />
    </>
  );
}

export default App;
