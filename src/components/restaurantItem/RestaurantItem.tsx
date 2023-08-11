import { Box, Flex, Text } from '@chakra-ui/react';

import { breakpointsItem } from '../../theme/breakpoints';
import { RestaurantItemProps } from './ReustarantItem.props';
import {
  restaurantItemFlex,
  restaurantItemMinutesBlock,
  restaurantItemRating,
  restaurantItemRatingBefore,
  restaurantItemText,
  restaurantItemWrapper,
} from '../../theme/styles';

function RestaurantItem({
  name,
  rating,
  startingPrice,
  category,
}: RestaurantItemProps): JSX.Element {
  return (
    <Box {...restaurantItemWrapper}>
      <Flex justify='space-between' align='center'>
        <Text fontWeight='700' fontSize='24px' lineHeight='32px'>
          {name}
        </Text>
        <Box {...restaurantItemMinutesBlock}>50m</Box>
      </Flex>
      <Flex {...restaurantItemFlex}>
        <Box
          {...restaurantItemRating}
          position={'relative'}
          _before={restaurantItemRatingBefore}
        >
          {rating}
        </Box>
        <Text {...restaurantItemText}>From {startingPrice} ₴</Text>
        <Text {...restaurantItemText}>{category}</Text>
      </Flex>
    </Box>
  );
}

export default RestaurantItem;
