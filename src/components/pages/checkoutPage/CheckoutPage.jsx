/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import logo from "../../../assets/logo.svg";

import CheckoutItem from "../../checkoutItem/CheckoutItem";
import { ShopContext } from "../../../context/shop-context";
import CheckoutForm from "../../checkoutForm/CheckoutForm";
import AnimatedComponent from "../../animatedComponent/AnimatedComponent";

function CheckoutPage() {
  const { data, cart, getTotalCartAmount } = useContext(ShopContext);

  const amountWithOutTaxes = getTotalCartAmount();
  const amountTaxes = Math.round((amountWithOutTaxes / 100) * 6.5);
  const amountWithTaxes = amountWithOutTaxes + amountTaxes;

  const renderItems = (arr) =>
    // eslint-disable-next-line array-callback-return, consistent-return
    arr?.map((item) => {
      if (+cart[item.id] !== 0 && cart[item.id] !== undefined) {
        return (
          <CheckoutItem
            key={item.id}
            name={item.name}
            price={+item.price}
            image={item?.image}
            amount={+cart[item.id]}
          />
        );
      }
    });

  const items = renderItems(data);
  return (
    <AnimatedComponent>
      <Box
        minH="670px"
        p={{
          base: "20px",
          sm: "50px",
          lg: "100px 50px ",
          xl: "103px 177px 127px 150px",
        }}
      >
        <Grid
          gap={{ base: "40px", lg: "100px", xl: "190px" }}
          templateColumns={{ md: "1fr", lg: "1fr 2fr" }}
        >
          <GridItem gridColumn="1/2">
            <Link to="/">
              <Flex
                _hover={{ transform: "scale(1.02)" }}
                transition="0.5s all"
                w="150px"
                align="center"
                justify="space-between"
              >
                <ArrowBackIcon />
                <Image borderRadius="100%" width="32px" h="32px" src={logo} />
                <Text fontSize="14px">Delivery Food</Text>
              </Flex>
            </Link>

            <Flex
              display={{ base: "none", md: "block" }}
              mt="40px"
              w="150px"
              flexDirection="column"
            >
              <Text color="#697386" fontSize="14px">
                Pay Delivery Food
              </Text>
              <Text fontWeight="700" fontSize="36px" lineHeight="44px">
                ₴ {amountWithTaxes}
              </Text>
            </Flex>

            <Box w={{ base: "full", md: "350px" }}>
              <UnorderedList
                maxH="200px"
                w="full"
                overflow="scroll"
                style={{ scrollbarWidth: "none" }}
                mt="30px"
                ml="0"
                spacing="23px"
              >
                {items}
              </UnorderedList>
              <UnorderedList
                w="257px"
                m={{ base: "30px auto 0 auto", md: "23px 0 0 auto " }}
                listStyleType="none"
              >
                <ListItem
                  h="44px"
                  p="12px 0"
                  borderBottom="1px solid rgba(60, 66, 87, 0.12)"
                >
                  <Flex align="center" justify="space-between">
                    <Text color="#1A1F36">Промежуточный итог</Text>{" "}
                    <Text color=" #1A1F36">₴{amountWithOutTaxes}</Text>
                  </Flex>
                </ListItem>
                <ListItem
                  h=" 44px"
                  p="12px 0"
                  borderBottom="1px solid rgba(60, 66, 87, 0.12)"
                >
                  <Flex align="center" justify="space-between">
                    <Text color="#697386">Налог с продаж (6,5 %)</Text>{" "}
                    <Text color="#697386">₴{amountTaxes}</Text>
                  </Flex>
                </ListItem>
                <ListItem h=" 44px" p="12px 0">
                  <Flex align="center" justify="space-between">
                    <Text color="#697386">Итого к оплате</Text>{" "}
                    <Text color="#697386">₴{amountWithTaxes}</Text>
                  </Flex>
                </ListItem>
              </UnorderedList>
            </Box>
            <Box
              mt="120px"
              display={{ base: "none", md: "none", xl: "flex" }}
              alignContent="center"
            >
              <Flex align="center" w="263px" justify="space-between">
                <Text fontSize="12px">Powered by</Text>
                <Image borderRadius="100%" width="32px" src={logo} />
                <Box
                  w="22px"
                  h="0"
                  border="1px solid #8792A2"
                  transform="rotate(90deg)"
                />
                <Text fontSize="12px">Terms</Text>
                <Text fontSize="12px">Privacy</Text>
              </Flex>
            </Box>
          </GridItem>
          <CheckoutForm amountWithTaxes={+amountWithTaxes} />
        </Grid>
      </Box>
    </AnimatedComponent>
  );
}

export default CheckoutPage;
