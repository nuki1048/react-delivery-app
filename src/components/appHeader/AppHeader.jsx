import {
  Flex,
  Box,
  Image,
  Text,
  Input,
  ButtonGroup,
  Button,
  Icon,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React from "react";
import AppContainer from "../appContainer/AppContainer";

import AppLogo from "../appLogo/AppLogo";
const AppHeader = () => {
  return (
    <AppContainer>
      <Flex
        alignItems="center"
        justify="space-between"
        w="1200px"
        h="40px"
        mt="44px"
      >
        <AppLogo />
        <InputGroup w="640px">
          <InputLeftElement
            top="-2px"
            fontSize="1.7em"
            pointerEvents="none"
            color="gray.300"
            children="⌂"
          />
          <Input
            filter=" drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));"
            borderRadius="2px"
            placeholder="Адрес доставки"
          />
        </InputGroup>

        <ButtonGroup>
          <Button backgroundColor="brand.blue" color="#fff" borderRadius="2px">
            Войти
          </Button>
          <Button borderRadius="2px" colorScheme="grey" variant="outline">
            Корзина
          </Button>
        </ButtonGroup>
      </Flex>
    </AppContainer>
  );
};
export default AppHeader;
