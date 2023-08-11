import { Flex, Box, ListItem, Text, Button, Image } from '@chakra-ui/react';
import { addNewItem, removeItem } from '../../store/slices/modalCartSlice';
import { CartItemProps } from './CartItem.props';
import {
  cartItemButton,
  cartItemFlexControls,
  cartItemImage,
  cartItemListItem,
  cartItemTextPositionName,
  cartItemTextPrice,
} from '../../theme/styles';
import { useAppDispatch } from '../../store';

function CartItem(props: CartItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { name, price, amount, image } = props;
  const srcImage = image
    ? image
    : 'https://fakeimg.pl/64x35/ffffff/909090?text=Product&font=bebas';

  return (
    <ListItem {...cartItemListItem}>
      <Image src={srcImage} {...cartItemImage} />
      <Text {...cartItemTextPositionName}>{name}</Text>
      <Flex {...cartItemFlexControls}>
        <Text {...cartItemTextPrice}>{price} ₴</Text>
        <Button onClick={() => dispatch(removeItem(props))} {...cartItemButton}>
          -
        </Button>
        <Box m='0 13px 0 13px'>{amount}</Box>
        <Button onClick={() => dispatch(addNewItem(props))} {...cartItemButton}>
          +
        </Button>
      </Flex>
    </ListItem>
  );
}

export default CartItem;
