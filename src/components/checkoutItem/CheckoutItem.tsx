import { Box, Flex, Image, ListItem, Text } from '@chakra-ui/react';
import { CheckoutItemProps } from './CheckoutItem.props';
import { checkoutItemListItem } from '../../theme/styles';

function CheckoutItem({ name, price, amount, image }: CheckoutItemProps) {
  return (
    <ListItem {...checkoutItemListItem}>
      <Image src={image} mr='14px' w='65px' h='65px' objectFit='contain' />
      <Flex flexDirection='column' mr='auto'>
        <Box>{name}</Box>
        <Text color='#697386'>
          Qty{' '}
          <Box as='span' color='#1A1F36'>
            {amount}
          </Box>
        </Text>
      </Flex>
      <Text mb='auto'>₴{price}</Text>
    </ListItem>
  );
}

export default CheckoutItem;
