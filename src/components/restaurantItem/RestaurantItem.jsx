import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import pizza from "../../assets/pizza.jpg";
const RestaurantItem = () => {
  return (
    <Box
      w={"384px"}
      minH={"378px"}
      boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.05)"}
      borderRadius={"7px"}
      backgroundImage={pizza}
      backgroundPosition={"top center"}
      backgroundRepeat={"no-repeat"}
      backgroundColor={"#FFF"}
      p={"268px 24px 35px 24px"}
    >
      <Flex justify={"space-between"} align="center">
        <h3 className="font-bold text-2xl">Пицца плюс</h3>
        <div className="font-normal bg-black text-white text-sm w-14 h-5 rounded-sm flex items-center justify-center">
          50 мин
        </div>
      </Flex>
      <Flex
        w={"205px"}
        m={"0 auto 0 20px"}
        justify={"space-between"}
        align="center"
      >
        <div className="font-bold text-lg text-yellow-300">4.5</div>
        <div className="font-normal text-lg text-neutral-500">От 900 ₴</div>
        <div className="font-normal text-lg text-neutral-500">Пицца</div>
      </Flex>
    </Box>
  );
};

export default RestaurantItem;
