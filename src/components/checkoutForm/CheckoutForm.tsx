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
import PropTypes from 'prop-types';
import applePay from '../../assets/applePay.svg';

import VisaIcon from '../icons/VisaIcon';
import MasterCardIcon from '../icons/MasterCardIcon';
import AmericanExpressIcon from '../icons/AmericanExpressIcon';
import { clearCart, orderPlaces } from '../../store/slices/modalCartSlice';
import { CheckoutFormProps } from './CheckoutForm.props';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { CartItem, CartOrder } from '../../global/interfaces';
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

function CheckoutForm({ amountWithTaxes }: CheckoutFormProps): JSX.Element {
  const navigate = useNavigate();

  const [type, setType] = useState<string>('');
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state: RootState) => state.cart);

  const createCartObj = () => {
    const cartPositions: CartOrder[] = [];
    // eslint-disable-next-line array-callback-return
    cart.map((item: CartItem) => {
      if (item.amount >= 0) {
        const cartItem = { name: item.name, amount: item.amount };
        cartPositions.push(cartItem);
      }
    });
    return cartPositions;
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      creditCard: '',
      YYMM: '',
      CVC: '',
      nameOnCard: '',
      region: '',
      index: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Incorrectly entered mail!')
        .required('Required field'),
      creditCard: Yup.string()
        .max(16, 'Minimum length 16!')
        .test(
          'test-number', // this is used internally by yup
          'The card number is not valid', // validation message
          (value) => {
            setType(String(valid?.number(value)?.card?.type));
            return valid.number(value).isValid;
          }
        )
        .required('Required field'),
      CVC: Yup.string()
        .min(3, 'Minimum length 3!')
        .max(4, 'Maximum length 4!')
        .test(
          'test-number', // this is used internally by yup
          'The card number is not valid', // validation message
          (value) => valid.cvv(value).isValid
        )

        .required('Required field'),
      YYMM: Yup.string()
        .max(4, 'Maximum length 4!')
        .test(
          'test-number', // this is used internally by yup
          'Карта просроченна', // validation message
          (value) => valid.expirationDate(value).isValid
        ),

      nameOnCard: Yup.string()
        .required('Required field')
        .test(
          'test-number', // this is used internally by yup
          'First name last name entered incorrectly.', // validation message
          (value) => valid.cardholderName(value).isValid
        ),
      region: Yup.string().required('Required field'),
      index: Yup.string()
        .required('Required field')
        .min(5, 'Minimum length 5!')
        .test(
          'test-number', // this is used internally by yup
          'First name last name entered incorrectly', // validation message
          (value) => valid.postalCode(value).isValid
        ),
    }),
    onSubmit: (values) => {
      if (amountWithTaxes) {
        // eslint-disable-next-line no-unused-vars
        const numberOrder = Math.floor(Math.random() * (12414 - 1000) + 1000);
        const cartPos = createCartObj();
        dispatch(
          orderPlaces({
            order: {
              email: values.email,
              name: values.nameOnCard,
              orderNum: numberOrder,
              region: values.region,
              cart: cartPos,
              date: new Date(),
            },
          })
        );
        navigate(`/orderThanks/${numberOrder}`);
        dispatch(clearCart());
      }
    },
  });
  const typeCardBrand = (cardType: string): JSX.Element => {
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

  const iconCard = typeCardBrand(type);

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
                  name='YYMM'
                  type='number'
                  onChange={formik.handleChange}
                  value={formik.values.YYMM}
                  onBlur={formik.handleBlur}
                  placeholder='MM/YY'
                  borderRadius='0px 0px 0px 8px'
                />

                {formik.touched.YYMM && formik.errors.YYMM ? (
                  <>
                    <br />
                    <Box color='#E53E3E' mt='15px'>
                      {formik.errors.YYMM}
                    </Box>
                  </>
                ) : null}
                <Input
                  name='CVC'
                  type='number'
                  onChange={formik.handleChange}
                  value={formik.values.CVC}
                  onBlur={formik.handleBlur}
                  placeholder='CVC'
                  borderRadius='0px 0px 8px 0px'
                />
                {formik.touched.CVC && formik.errors.CVC ? (
                  <Box color='#E53E3E' mt='15px'>
                    {formik.errors.CVC}
                  </Box>
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
              isDisabled={!amountWithTaxes}
            >
              To pay ₴{amountWithTaxes}
            </Button>
          </VStack>
        </form>
      </Flex>
    </GridItem>
  );
}

CheckoutForm.propTypes = {
  amountWithTaxes: PropTypes.number.isRequired,
};

export default CheckoutForm;
