import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import AppContainer from "../appContainer/AppContainer";
import appBanerBg from "../../assets/appBannerBg.png";
import {
  breackpointsBannerWidth,
  breackpointsBannerPadding,
} from "../../theme/breakpoints";

function AppBanner() {
  return (
    <AppContainer>
      <Box
        w={breackpointsBannerWidth}
        h={{ base: "220px", md: "300px" }}
        mt="40px"
        borderRadius="10px"
        padding={breackpointsBannerPadding}
        background={{
          base: "#FFF1B8",
          md: `url(${appBanerBg}) #FFF1B8 right no-repeat`,
        }}
      >
        <Heading
          as="h1"
          fontWeight="700"
          fontSize={{ base: "20px", sm: "25px", xl: "39px" }}
          lineHeight={{ base: "28px", xl: "46px" }}
          textAlign="left"
        >
          Онлайн-сервис доставки еды на дом
        </Heading>

        <Text
          fontWeight="400"
          fontSize={{ base: "17px", sm: "24px" }}
          lineHeight="28px"
          textAlign="left"
          mt="15px"
        >
          Блюда из любимого ресторана привезет курьер в перчатках, маске и с
          антисептиком
        </Text>
      </Box>
    </AppContainer>
  );
}

export default AppBanner;
