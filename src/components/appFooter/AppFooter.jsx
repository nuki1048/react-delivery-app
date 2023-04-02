import { Box, Flex, UnorderedList, ListItem, Image } from "@chakra-ui/react";
import React from "react";
import AppLogo from "../appLogo/AppLogo";
import AppContainer from "../appContainer/AppContainer";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";
import vk from "../../assets/vk.svg";
import {
  breackpointsAppFooterFlex,
  breackpointsAppFooterList,
  breackpointsAppFooterPadding,
  breakpointsFooterFlex,
  breakpointsFooterListMargin,
} from "../../theme/breakpoints";

function AppFooter() {
  return (
    <Box h={{ base: "full", md: "150px" }} p={breackpointsAppFooterPadding}>
      <AppContainer>
        <Flex
          w="full"
          flexDirection={breackpointsAppFooterFlex}
          align="center"
          justify="space-between"
        >
          <AppLogo />
          <UnorderedList
            display="flex"
            listStyleType="none"
            w={breackpointsAppFooterList}
            flexWrap="wrap"
            justifyContent={breakpointsFooterFlex}
            mr="auto"
            m={breakpointsFooterListMargin}
          >
            <ListItem _hover={{ borderBottom: "1px solid" }}>
              Ресторанам{" "}
            </ListItem>
            <ListItem _hover={{ borderBottom: "1px solid" }}>Курьерам</ListItem>
            <ListItem _hover={{ borderBottom: "1px solid" }}>
              Пресс-центр
            </ListItem>
            <ListItem _hover={{ borderBottom: "1px solid" }}>Контакты</ListItem>
          </UnorderedList>
          <Flex
            w="127px"
            mt={{ base: "20px", md: "0" }}
            justify="space-between"
          >
            <Image src={instagram} />
            <Image src={facebook} />
            <Image src={vk} />
          </Flex>
        </Flex>
      </AppContainer>
    </Box>
  );
}

export default AppFooter;
