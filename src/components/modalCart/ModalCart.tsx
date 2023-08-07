/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import { Flex, Heading, Box, List, Button, Spinner } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../cartItem/CartItem';
import {
  breackpointsCartFullAmountHeight,
  breakpointsCartFullAmountFont,
} from '../../theme/breakpoints';

import ErrorMessage from '../errorMessage/ErrorMessage';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { fetchMenu } from '../pages/restaurantPage/restaurantsPageSlice';
import { getTotalCartAmount } from './modalCartSlice';
import { ModalProps } from '../ModalTemplate/ModalTemplate.props';

function ModalCart({ onClose }: ModalProps): JSX.Element {
  // const { cart, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = useSelector(getTotalCartAmount);
  const { cart, cartLoadingStatus } = useSelector((state) => state.cart);
  const { menuData, menuLoadingStatus } = useSelector((state) => state.menu);

  const navigate = useNavigate();

  const renderItems = (arr) => {
    // eslint-disable-next-line array-callback-return, consistent-return
    return arr.map((item) => {
      if (+cart[item.id] >= 0) {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            amount={cart[item.id]}
          />
        );
      }
    });
  };

  const navigateToCheckout = () => {
    onClose();
    navigate('/checkout');
  };
  const items = renderItems(menuData);
  const errorMessage = menuLoadingStatus === 'error' ? <ErrorMessage /> : null;
  const loadingSpinner =
    menuLoadingStatus === 'loading' ? (
      <Spinner w='100px' h='100px' ml='30%' />
    ) : null;
  const cartEmpty = totalAmount ? null : (
    <Heading as='h2' textAlign='center' m='50px 0' fontSize='24px'>
      Your shopping cart is empty!
    </Heading>
  );

  return (
    <Box>
      <Heading align='left' as='h3'>
        Корзина
      </Heading>
      <Flex pt='45px' flexDirection='column' justify='center' align='center'>
        <ErrorBoundary>
          <List
            spacing={4}
            w={{ base: 'full', md: '680px' }}
            listStyleType='none'
          >
            {items}
            {errorMessage}
            {cartEmpty}
            {menuLoadingStatus}
          </List>
        </ErrorBoundary>
      </Flex>

      <Flex mt='52px' justify='space-between' align='center'>
        <Box
          w='106px'
          h={breackpointsCartFullAmountHeight}
          borderRadius='5px'
          p={breakpointsCartFullAmountFont}
          background='#262626'
          color='#FFF'
          fontWeight='700'
          fontSize={{ base: '15px', md: '20px' }}
          lineHeight='23px'
        >
          {totalAmount} ₴
        </Box>
        <Button
          ml={{ base: '0', md: 'auto' }}
          colorScheme='linkedin'
          borderRadius='2px'
          isDisabled={totalAmount === 0}
          onClick={() => navigateToCheckout()}
          fontSize={{ base: '10px', md: '16px' }}
          lineHeight='24px'
        >
          Checkout
        </Button>
        <Button
          onClick={onClose}
          ml={{ base: 0, md: '18px' }}
          borderRadius='2px'
          variant='outline'
        >
          Cancel
        </Button>
      </Flex>
    </Box>
  );
}
ModalCart.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalCart;
