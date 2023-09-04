import { Flex, Box, ListItem, Text, Button, Image } from '@chakra-ui/react';
import { changeAmountItemInCart } from '../../store/slices/modalCartSlice';
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

  const onAddItemToCart = (): void => {
    dispatch(changeAmountItemInCart({ item: props, operation: 'add' }));
  };

  const onRemoveItemFromCart = (): void => {
    dispatch(changeAmountItemInCart({ item: props, operation: 'remove' }));
  };

  return (
    <ListItem {...cartItemListItem}>
      <Image src={srcImage} {...cartItemImage} />
      <Text {...cartItemTextPositionName}>{name}</Text>
      <Flex {...cartItemFlexControls}>
        <Text {...cartItemTextPrice}>{price} ₴</Text>
        <Button onClick={onRemoveItemFromCart} {...cartItemButton}>
          -
        </Button>
        <Box m='0 13px 0 13px'>{amount}</Box>
        <Button onClick={onAddItemToCart} {...cartItemButton}>
          +
        </Button>
      </Flex>
    </ListItem>
  );
}

export default CartItem;
