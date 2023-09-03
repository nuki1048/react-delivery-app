/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/logo.svg';

import CheckoutItem from '../../checkoutItem/CheckoutItem';

import CheckoutForm from '../../checkoutForm/CheckoutForm';
import AnimatedComponent from '../../animatedComponent/AnimatedComponent';
import { getTotalCartAmount } from '../../../store/slices/modalCartSlice';
import { useAppSelector } from '../../../store';
import { CartItem } from '../../../global/interfaces';
import {
  checkoutPageFlex,
  checkoutPageGrid,
  checkoutPageListItem,
  checkoutPagePrivacy,
  checkoutPageTerms,
  checkoutPageUl,
  checkoutPageUlTwo,
  checkoutPageWrapper,
} from '../../../theme/styles';

function CheckoutPage(): JSX.Element {
  const { cart } = useAppSelector((state) => state.cart);
  const amountWithOutTaxes = useAppSelector(getTotalCartAmount);
  const amountTaxes = Math.round((amountWithOutTaxes / 100) * 6.5);
  const amountWithTaxes = amountWithOutTaxes + amountTaxes;

  const renderItems = (arr: CartItem[]): JSX.Element[] => {
    return arr.map((cartItem: CartItem) => (
      <CheckoutItem
        key={cartItem.id}
        name={cartItem.name}
        price={cartItem.price}
        image={cartItem.image}
        amount={cartItem.amount}
      />
    ));
  };

  const items = renderItems(cart);
  return (
    <AnimatedComponent>
      <Box {...checkoutPageWrapper}>
        <Grid {...checkoutPageGrid}>
          <GridItem gridColumn='1/2'>
            <Link to='/'>
              <Flex {...checkoutPageFlex}>
                <ArrowBackIcon />
                <Image borderRadius='100%' width='32px' h='32px' src={logo} />
                <Text fontSize='14px'>Delivery Food</Text>
              </Flex>
            </Link>

            <Flex
              display={{ base: 'none', md: 'block' }}
              mt='40px'
              w='150px'
              flexDirection='column'
            >
              <Text color='#697386' fontSize='14px'>
                Pay Delivery Food
              </Text>
              <Text fontWeight='700' fontSize='36px' lineHeight='44px'>
                ₴ {amountWithTaxes}
              </Text>
            </Flex>

            <Box w={{ base: 'full', md: '350px' }}>
              <UnorderedList
                {...checkoutPageUl}
                style={{ scrollbarWidth: 'none' }}
              >
                {items}
              </UnorderedList>
              <UnorderedList {...checkoutPageUlTwo}>
                <ListItem {...checkoutPageListItem}>
                  <Flex align='center' justify='space-between'>
                    <Text color='#1A1F36'>Subtotal</Text>{' '}
                    <Text color=' #1A1F36'>₴{amountWithOutTaxes}</Text>
                  </Flex>
                </ListItem>
                <ListItem {...checkoutPageListItem}>
                  <Flex align='center' justify='space-between'>
                    <Text color='#697386'>Sales tax (6.5%)</Text>{' '}
                    <Text color='#697386'>₴{amountTaxes}</Text>
                  </Flex>
                </ListItem>
                <ListItem h='44px' p='12px 0'>
                  <Flex align='center' justify='space-between'>
                    <Text color='#697386'>Total due</Text>{' '}
                    <Text color='#697386'>₴{amountWithTaxes}</Text>
                  </Flex>
                </ListItem>
              </UnorderedList>
            </Box>
            <Box {...checkoutPageTerms}>
              <Flex align='center' w='263px' justify='space-between'>
                <Text fontSize='12px'>Powered by</Text>
                <Image borderRadius='100%' width='32px' src={logo} />
                <Box {...checkoutPagePrivacy} />
                <Text fontSize='12px'>Terms</Text>
                <Text fontSize='12px'>Privacy</Text>
              </Flex>
            </Box>
          </GridItem>
          <CheckoutForm
            orderPriceInfo={{
              subtotal: amountWithOutTaxes,
              taxes: amountTaxes,
              total: amountWithTaxes,
            }}
          />
        </Grid>
      </Box>
    </AnimatedComponent>
  );
}

export default CheckoutPage;
