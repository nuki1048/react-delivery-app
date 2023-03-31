import { Flex, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import AppContainer from "../../appContainer/AppContainer";
import AppHeader from "../../appHeader/AppHeader";
import AnimatedComponent from "../../animatedComponent/AnimatedComponent";

function OrderThanksPage() {
  const navigate = useNavigate();
  const [time, setTime] = useState(10);

  const timeoutLink = setTimeout(() => {
    setTime((state) => state - 1);
  }, 1000);
  if (time === 0) {
    clearTimeout(timeoutLink);
    navigate("/");
  }
  return (
    <AnimatedComponent>
      <AppHeader />
      <AppContainer>
        <Flex
          p="200px 0 330px 0"
          flexDirection="column"
          align="center"
          justify="space-between"
        >
          <Heading fontSize="42px" as="h2">
            Спасибо за заказ!
          </Heading>{" "}
          <Text mt="30px" fontSize="24px" lineHeight="16px">
            {" "}
            Мы с вами свяжемся =)
          </Text>
          <CheckIcon mt="30px" color="green" w={40} h={40} />
          <Text borderBottom="1px solid" mt="50px" fontSize="32px">
            Вы перейдете на главную страницу через {time}
          </Text>
        </Flex>
      </AppContainer>
    </AnimatedComponent>
  );
}

export default OrderThanksPage;
