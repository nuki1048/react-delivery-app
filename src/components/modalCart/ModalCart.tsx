/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import { Flex, Heading, Box, List, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import ErrorMessage from '../errorMessage/ErrorMessage';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { getTotalCartAmount } from '../../store/slices/modalCartSlice';
import { ModalProps } from '../ModalTemplate/ModalTemplate.props';
import { useAppSelector } from '../../store';
import { CartItem as CartItemInterface } from '../../global/interfaces';
import CartItem from '../cartItem/CartItem';
import {
  modalCartButtonCancel,
  modalCartButtonCheckout,
  modalCartList,
  modalCartTextTotal,
} from '../../theme/styles';

function ModalCart({ onClose }: ModalProps): JSX.Element {
  // const { cart, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = useAppSelector(getTotalCartAmount);
  const { cart } = useAppSelector((state) => state.cart);
  const { menuLoadingStatus } = useAppSelector((state) => state.menu);

  const navigate = useNavigate();

  const renderItems = (arr: CartItemInterface[]): JSX.Element[] => {
    return arr.map((item: CartItemInterface) => {
      return (
        <CartItem
          id={item.id}
          key={item.id}
          name={item.name}
          price={item.price}
          image={item.image}
          amount={item.amount}
        />
      );
    });
  };

  const navigateToCheckout = () => {
    onClose();
    navigate('/checkout');
  };
  const items = renderItems(cart);
  const errorMessage = menuLoadingStatus === 'error' ? <ErrorMessage /> : null;

  const cartEmpty =
    cart.length == 0 ? (
      <Heading as='h2' textAlign='center' m='50px 0' fontSize='24px'>
        Your shopping cart is empty!
      </Heading>
    ) : null;

  return (
    <Box>
      <Heading alignContent={'left'} as='h3'>
        Корзина
      </Heading>
      <Flex pt='45px' flexDirection='column' justify='center' align='center'>
        <ErrorBoundary>
          <List {...modalCartList}>
            {items}
            {errorMessage}
            {cartEmpty}
            {menuLoadingStatus}
          </List>
        </ErrorBoundary>
      </Flex>

      <Flex mt='52px' justify='space-between' align='center'>
        <Box {...modalCartTextTotal}>{totalAmount} ₴</Box>
        <Button
          {...modalCartButtonCheckout}
          isDisabled={totalAmount === 0}
          onClick={() => navigateToCheckout()}
        >
          Checkout
        </Button>
        <Button onClick={onClose} {...modalCartButtonCancel}>
          Cancel
        </Button>
      </Flex>
    </Box>
  );
}

export default ModalCart;
