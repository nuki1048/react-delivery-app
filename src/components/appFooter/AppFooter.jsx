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
const AppFooter = () => {
  return (
    <Box h="150px" p={breackpointsAppFooterPadding}>
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
            listStyleType={"none"}
            w={breackpointsAppFooterList}
            flexWrap={"wrap"}
            justifyContent={breakpointsFooterFlex}
            mr={"auto"}
            m={breakpointsFooterListMargin}
          >
            <ListItem>Ресторанам </ListItem>
            <ListItem>Курьерам</ListItem>
            <ListItem>Пресс-центр</ListItem>
            <ListItem>Контакты</ListItem>
          </UnorderedList>
          <Flex
            w={"127px"}
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
};

export default AppFooter;
