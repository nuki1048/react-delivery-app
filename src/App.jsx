import { Flex, Input } from "@chakra-ui/react";
import "./App.css";
import AppBanner from "./components/appBanner/AppBanner";
import AppFooter from "./components/appFooter/AppFooter";
import AppHeader from "./components/appHeader/AppHeader";
import RestaurantItem from "./components/restaurantItem/RestaurantItem";

function App() {
  return (
    <>
      <AppHeader />
      <main className="main">
        <AppBanner />
        <Flex p={"50px 0 "} justify="space-between" align="center">
          <h3 className="font-bold text-4xl">Рестораны</h3>
          <Input
            placeholder="Поиск блюд и ресторанов"
            w={"306px"}
            h={"40px"}
            backgroundColor={"#FFF"}
          />
        </Flex>
        <RestaurantItem />
      </main>
      <AppFooter />
    </>
  );
}

export default App;
