import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import AppContainer from "../appContainer/AppContainer";
import appBanerBg from "../../assets/appBannerBg.png";
const AppBanner = () => {
  return (
    <AppContainer>
      <Box
        w="100%"
        h="300px"
        backgroundColor="#FFF1B8"
        mt="40px"
        borderRadius="10px"
        padding="67px 590px 80px 73px"
        backgroundImage={appBanerBg}
        backgroundRepeat={"no-repeat"}
        backgroundPosition={"right"}
      >
        <h1 className="font-bold text-4xl text-left">
          Онлайн-сервис доставки еды на дом
        </h1>

        <p className="text-left mt-3.5 font-normal text-xl">
          Блюда из любимого ресторана привезет курьер в перчатках, маске и с
          антисептиком
        </p>
      </Box>
    </AppContainer>
  );
};

export default AppBanner;
