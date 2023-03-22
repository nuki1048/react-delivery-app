import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import AppContainer from "../appContainer/AppContainer";
import appBanerBg from "../../assets/appBannerBg.png";
const AppBanner = () => {
  return (
    <AppContainer>
      <Box
        w="1200px"
        h="300px"
        mt="40px"
        borderRadius="10px"
        padding="67px 590px 80px 73px"
        background={`url(${appBanerBg}) right no-repeat`}
        backgroundColor="#FFF1B8"
      >
        <Heading
          as="h1"
          fontWeight="700"
          fontSize="39px"
          lineHeight="46px"
          textAlign="left"
        >
          Онлайн-сервис доставки еды на дом
        </Heading>

        <Text
          fontWeight="400"
          fontSize="24px"
          lineHeigh="28px"
          textAlign="left"
          mt="15px"
        >
          Блюда из любимого ресторана привезет курьер в перчатках, маске и с
          антисептиком
        </Text>
      </Box>
    </AppContainer>
  );
};

export default AppBanner;
