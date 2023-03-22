import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import sushi from "../../assets/sushi.png";
const MenuItem = () => {
  return (
    <Box
      w="384px"
      minHeight="414px"
      padding="234px 24px 30px 24px"
      borderRadius="7px"
      background={`url(${sushi}) top center no-repeat`}
      backgroundColor="#FFF"
    >
      <Flex flexDirection="column" textAlign="left">
        <Heading as="h3" fontWeight="400" fontSize="24px" lineHeight="32px">
          Ролл угорь стандарт
        </Heading>
        <Text
          mt="10px"
          fontWeight="400"
          fontSize="18px"
          lineHeight="21px"
          color="#8C8C8C"
        >
          Рис, угорь, соус унаги, кунжут, водоросли нори.
        </Text>
      </Flex>
      <Flex
        w="210px"
        m="25px auto 0 0 "
        mr="auto"
        justify="space-between"
        align="center"
      >
        <Button w="124px" h="40px" colorScheme="linkedin" borderRadius="2px">
          В корзину
        </Button>
        <Text fontWeight="700" fontSize="20px" lineHeight="32px">
          250 ₴
        </Text>
      </Flex>
    </Box>
  );
};

export default MenuItem;
