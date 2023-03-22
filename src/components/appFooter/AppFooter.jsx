import { Box, Flex, UnorderedList, ListItem, Image } from "@chakra-ui/react";
import React from "react";
import AppLogo from "../appLogo/AppLogo";
import AppContainer from "../appContainer/AppContainer";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";
import vk from "../../assets/vk.svg";
const AppFooter = () => {
  return (
    <Box h="150px" p="60px 0 ">
      <AppContainer>
        <Flex w="1200px" align="center" justify={"space-between"}>
          <AppLogo />
          <UnorderedList
            display="flex"
            listStyleType={"none"}
            w="420px"
            justifyContent="space-between"
            mr={"auto"}
          >
            <ListItem>Ресторанам </ListItem>
            <ListItem>Курьерам</ListItem>
            <ListItem>Пресс-центр</ListItem>
            <ListItem>Контакты</ListItem>
          </UnorderedList>
          <Flex w={"127px"} justify="space-between">
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
