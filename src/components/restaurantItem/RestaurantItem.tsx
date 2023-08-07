import { Box, Flex, Text } from '@chakra-ui/react';

import { breakpointsItem } from '../../theme/breakpoints';
import { RestaurantItemProps } from './ReustarantItem.props';

function RestaurantItem({
  name,
  rating,
  startingPrice,
  category,
}: RestaurantItemProps): JSX.Element {
  return (
    <Box
      w={breakpointsItem}
      h='378px'
      boxShadow='0px 4px 12px rgba(0, 0, 0, 0.05)'
      borderRadius='7px'
      background={`url(/pizza.jpg) top center no-repeat`}
      backgroundColor='#FFF'
      p='268px 24px 35px 24px'
      transition='0.5s all'
      _hover={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)' }}
    >
      <Flex justify='space-between' align='center'>
        <Text fontWeight='700' fontSize='24px' lineHeight='32px'>
          {name}
        </Text>
        <Box
          w='55px'
          h='22px'
          display='flex'
          alignItems='center'
          justifyContent='center'
          borderRadius='2px'
          backgroundColor='#000'
          color='#FFF'
          fontWeight='400'
          fontSize='12px'
          lineHeight='20px'
        >
          50m
        </Box>
      </Flex>
      <Flex w='205px' m='0 auto 0 20px' justify='space-between' align='center'>
        <Box
          fontWeight='700'
          position='relative'
          _before={{
            content: '"★"',
            position: 'absolute',
            right: '70%',
            transform: 'translateX(-70%)',
          }}
          fontSize='18px'
          lineHeight='32px'
          color='#FFC107'
        >
          {rating}
        </Box>
        <Box
          fontWeight='400'
          fontSize='18px'
          lineHeight='32px'
          color=' #8C8C8C'
        >
          From {startingPrice} ₴
        </Box>
        <Box
          fontWeight='400'
          fontSize='18px'
          lineHeight='32px'
          color=' #8C8C8C'
        >
          {category}
        </Box>
      </Flex>
    </Box>
  );
}

export default RestaurantItem;
