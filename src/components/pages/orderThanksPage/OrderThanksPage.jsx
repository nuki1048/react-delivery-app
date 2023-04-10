import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { CheckIcon } from "@chakra-ui/icons";
import { Link, useParams } from "react-router-dom";
import AppContainer from "../../appContainer/AppContainer";
import AppHeader from "../../appHeader/AppHeader";
import AnimatedComponent from "../../animatedComponent/AnimatedComponent";

function OrderThanksPage() {
  const { orderNum } = useParams();

  return (
    <AnimatedComponent>
      <AppHeader />
      <AppContainer>
        <Flex
          p={{ base: "100px 0 330px 0", md: "200px 0 330px 0" }}
          flexDirection="column"
          align="center"
          justify="space-between"
        >
          <Heading fontSize={{ base: "33px", md: "42px" }} as="h2">
            Заказ № {orderNum} принят в работу
          </Heading>{" "}
          <Text mt="30px" fontSize="24px" lineHeight="16px">
            {" "}
            Мы с вами свяжемся =)
          </Text>
          <CheckIcon mt="30px" color="green" w={40} h={40} />
          <Link to="/">
            <Text
              borderBottom="1px solid"
              mt="50px"
              fontSize={{ base: "20px", md: "32px" }}
            >
              Ссылка на главную страницу
            </Text>
          </Link>
        </Flex>
      </AppContainer>
    </AnimatedComponent>
  );
}

export default OrderThanksPage;
