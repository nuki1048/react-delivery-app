/* eslint-disable react/no-children-prop */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  VStack,
} from '@chakra-ui/react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import valid from 'card-validator';

import { useNavigate } from 'react-router-dom';
import applePay from '../../assets/applePay.svg';

import VisaIcon from '../icons/VisaIcon';
import MasterCardIcon from '../icons/MasterCardIcon';
import AmericanExpressIcon from '../icons/AmericanExpressIcon';
import { clearCart, orderPlaces } from '../../store/slices/modalCartSlice';
import { CheckoutFormProps } from './CheckoutForm.props';
import { useAppDispatch, useAppSelector } from '../../store';
import { RootState } from '../../store/RootState';
import { CartItem, CartItemOrder, Order } from '../../global/interfaces';
import {
  checkoutFormAfter,
  checkoutFormApplePayButton,
  checkoutFormBefore,
  checkoutFormButtonSubmit,
  checkoutFormChoiceStyle,
  checkoutFormGridItem,
  checkoutFormInput,
  checkoutFormSelect,
} from '../../theme/styles';
import { auth } from '../../config/firebase';

const data = [
  'Odessa Oblast',
  'Dnipropetrovsk region',
  'Zhytomyr Oblast',
  'Poltava Oblast',
  'Kherson Oblast',
  'Kiev Oblast',
  'Zaporizhzhya Oblast',
  'Lugansk Oblast',
  'Donetsk Oblast',
  'Vinnitsa Oblast',
  'AR Crimea',
  'Kirovograd region',
  'Nikolaev region',
  'Sumy Oblast',
  'Lviv Oblast',
  'Cherkassy Oblast',
  'Khmelnitsky Oblast',
  'Volyn region',
];

interface FormValues {
  email: string;
  nameOnCard: string;
  region: string;
  index: string;
  cardExpiration: string;
  cvcCode: string;
}

function CheckoutForm({ orderPriceInfo }: CheckoutFormProps): JSX.Element {
  const navigate = useNavigate();

  const [type, setType] = useState<string>('');
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state: RootState) => state.cart);

  const createCartObj = (): CartItemOrder[] => {
    const cartPositions: CartItemOrder[] = [];
    // eslint-disable-next-line array-callback-return
    cart.map((item: CartItem) => {
      if (item.amount >= 0) {
        const cartItem = {
          name: item.name,
          amount: item.amount,
          price: item.price,
        };
        cartPositions.push(cartItem);
      }
    });
    return cartPositions;
  };

  const createCartOrder = (
    values: Omit<FormValues, 'cvcCode' | 'cardExpiration'>
  ): Order => {
    const numberOrder = crypto.randomUUID();
    const cartItems = createCartObj();
    return {
      credentials: {
        email: values.email,
        name: values.nameOnCard,
        orderNum: numberOrder,
      },
      delivery: {
        region: values.region,
        country: 'Ukraine',
        index: values.index,
      },
      total: orderPriceInfo,
      items: cartItems,
    } as Order;
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      creditCard: '',
      cardExpiration: '',
      cvcCode: 0,
      nameOnCard: '',
      region: '',
      index: '',
    },
    validationSchema: Yup.object<FormValues>({
      email: Yup.string()
        .email('Incorrectly entered mail!')
        .required('Required field'),
      creditCard: Yup.string()
        .max(16, 'Minimum length 16!')
        .test('test-number', 'The card number is not valid', (value) => {
          setType(String(valid?.number(value)?.card?.type));
          return valid.number(value).isValid;
        })
        .required('Required field'),
      cvcCode: Yup.string()
        .min(3, 'Minimum length 3!')
        .max(4, 'Maximum length 4!')
        .test(
          'cvcCode',
          'The card number is not valid',
          (value) => valid.cvv(value).isValid
        )

        .required('Required field'),
      cardExpiration: Yup.string()
        .max(4, 'Maximum length 4!')
        .test(
          'cardExpiration',
          'Your card is expired',
          (value) => valid.expirationDate(value).isValid
        ),

      nameOnCard: Yup.string()
        .required('Required field')
        .test(
          'nameOnCard',
          'First name last name entered incorrectly.',
          (value) => valid.cardholderName(value).isValid
        ),
      region: Yup.string().required('Required field'),
      index: Yup.string()
        .required('Required field')
        .min(5, 'Minimum length 5!')
        .test(
          'index',
          'First name last name entered incorrectly',
          (value) => valid.postalCode(value).isValid
        ),
    }),
    onSubmit: (values) => {
      const orderObject = createCartOrder(values);
      if (auth) {
        orderObject.userId = auth.currentUser?.uid;
      }
      dispatch(orderPlaces(orderObject));
      navigate(`/orderThanks/${orderObject.credentials.orderNum}`);
      dispatch(clearCart());
    },
  });
  const getIconCardBrand = (cardType: string): JSX.Element => {
    switch (cardType) {
      case 'mastercard':
        return <InputRightElement children={<MasterCardIcon />} />;
      case 'visa':
        return <InputRightElement children={<VisaIcon />} />;
      case 'american-express':
        return <InputRightElement children={<AmericanExpressIcon />} />;
      default:
        return <></>;
    }
  };

  const iconCard = getIconCardBrand(type);

  return (
    <GridItem {...checkoutFormGridItem}>
      <Button {...checkoutFormApplePayButton}>
        <Image src={applePay} />
      </Button>
      <Box
        {...checkoutFormChoiceStyle}
        textAlign='center'
        position='relative'
        _before={checkoutFormBefore}
        _after={checkoutFormAfter}
      >
        Or pay with a card
      </Box>

      <Flex mt='32px'>
        <form onSubmit={formik.handleSubmit}>
          <VStack w={{ base: 'full' }} spacing='32px'>
            <FormControl>
              <FormLabel color='#697386'>Email</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                name='email'
                type='email'
                w={{ base: 'full', md: '421px' }}
              />
              {formik.touched.email && formik.errors.email ? (
                <Box color='#E53E3E' mt='15px'>
                  {formik.errors.email}
                </Box>
              ) : null}
            </FormControl>
            <FormControl>
              <FormLabel color='#697386'>Credit card</FormLabel>
              <InputGroup>
                <Input
                  id='credit-card'
                  name='creditCard'
                  type='number'
                  onChange={formik.handleChange}
                  value={formik.values.creditCard}
                  onBlur={formik.handleBlur}
                  placeholder='1234 1234 1234 1234'
                  borderRadius='8px 8px 0px 0px'
                />
                {formik.touched.creditCard && formik.errors.creditCard ? (
                  <Box color='#E53E3E' mt='15px'>
                    {formik.errors.creditCard}
                  </Box>
                ) : null}
                {iconCard}
              </InputGroup>
              <InputGroup>
                <Input
                  name='cardExpiration'
                  type='number'
                  onChange={formik.handleChange}
                  value={formik.values.cardExpiration}
                  onBlur={formik.handleBlur}
                  placeholder='MM/YY'
                  borderRadius='0px 0px 0px 8px'
                />

                {formik.touched.cardExpiration &&
                formik.errors.cardExpiration ? (
                  <>
                    <br />
                    <Box color='#E53E3E' mt='15px'>
                      {formik.errors.cardExpiration}
                    </Box>
                  </>
                ) : null}
                <Input
                  name='cvcCode'
                  type='number'
                  onChange={formik.handleChange}
                  value={formik.values.cvcCode}
                  onBlur={formik.handleBlur}
                  placeholder='CVC'
                  borderRadius='0px 0px 8px 0px'
                />
                {formik.touched.cvcCode && formik.errors.cvcCode ? (
                  <>
                    <br />
                    <Box color='#E53E3E' mt='15px'>
                      {formik.errors.cvcCode}
                    </Box>
                  </>
                ) : null}
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel color='#697386'>Name on credit card</FormLabel>
              <Input
                name='nameOnCard'
                onChange={formik.handleChange}
                value={formik.values.nameOnCard}
                onBlur={formik.handleBlur}
                type='text'
                w={{ base: 'full', md: '421px' }}
              />
              {formik.touched.nameOnCard && formik.errors.nameOnCard ? (
                <Box color='#E53E3E' mt='15px'>
                  {formik.errors.nameOnCard}
                </Box>
              ) : null}
            </FormControl>
            <FormControl>
              <FormLabel color='#697386'>Region</FormLabel>
              <Select
                onChange={formik.handleChange}
                value={formik.values.region}
                onBlur={formik.handleBlur}
                name='region'
                {...checkoutFormSelect}
              >
                {data.map((region: string) => (
                  <option value={region} key={region}>
                    {region}
                  </option>
                ))}
              </Select>
              {formik.touched.region && formik.errors.region ? (
                <Box color='#E53E3E' mt='15px'>
                  {formik.errors.region}
                </Box>
              ) : null}
              <Input
                onChange={formik.handleChange}
                value={formik.values.index}
                onBlur={formik.handleBlur}
                name='index'
                {...checkoutFormInput}
              />
              {formik.touched.index && formik.errors.index ? (
                <Box color='#E53E3E' mt='15px'>
                  {formik.errors.index}
                </Box>
              ) : null}
            </FormControl>
            <Button
              type='submit'
              {...checkoutFormButtonSubmit}
              isDisabled={!orderPriceInfo.total}
            >
              To pay ₴{orderPriceInfo.total}
            </Button>
          </VStack>
        </form>
      </Flex>
    </GridItem>
  );
}

export default CheckoutForm;
