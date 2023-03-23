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
  useDisclosure,
} from "@chakra-ui/react";

import React from "react";
import AppContainer from "../appContainer/AppContainer";
import ModalTemplate from "../ModalTemplate/ModalTemplate";
import ModalLoginForm from "../modalLoginForm/ModalLoginForm";
import ModalCart from "../modalCart/ModalCart";
import AppLogo from "../appLogo/AppLogo";

const AppHeader = () => {
  const modalLogin = useDisclosure();
  const modalCart = useDisclosure();
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
          <Button
            onClick={modalLogin.onOpen}
            backgroundColor="brand.blue"
            color="#fff"
            borderRadius="2px"
          >
            Войти
          </Button>
          <ModalTemplate
            isOpen={modalLogin.isOpen}
            onClose={modalLogin.onClose}
            Component={ModalLoginForm}
            dataType={"modalLogin"}
          />
          <Button
            onClick={modalCart.onOpen}
            borderRadius="2px"
            colorScheme="grey"
            variant="outline"
          >
            Корзина
          </Button>
          <ModalTemplate
            isOpen={modalCart.isOpen}
            onClose={modalCart.onClose}
            Component={ModalCart}
            dataType={"modalCart"}
          />
        </ButtonGroup>
      </Flex>
    </AppContainer>
  );
};
export default AppHeader;
