import { useEffect, useState } from 'react';
import { Box, Flex, Heading, Input, Spinner } from '@chakra-ui/react';

// eslint-disable-next-line import/no-extraneous-dependencies
import AppHeader from '../../appHeader/AppHeader';
import AppBanner from '../../appBanner/AppBanner';
import AppFooter from '../../appFooter/AppFooter';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import {
  breackpointsMainPageInput,
  breakpointsHeadingMainPage,
} from '../../../theme/breakpoints';

import RestaurantsList from '../../restaurantsList/RestaurantsList';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';

import { fetchRestaurants } from './mainPageSlice';
import { useAppDispatch, useAppSelector } from '../../../store';
import AnimatedComponent from '../../animatedComponent/AnimatedComponent';

const MainPage = (): JSX.Element => {
  const [term, setTerm] = useState('');
  const { restaurantsData, restaurantsLoadingStatus } = useAppSelector(
    (state) => state.restaurants
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    // getDataRestaurans();
    dispatch(fetchRestaurants());
  }, []);

  // const filteredData = (arr) => arr.filter((item) => item);

  const data = restaurantsData;

  const loadingSpinner =
    restaurantsLoadingStatus === 'loading' ? (
      <Spinner ml='500px' gridColumn='1/4' w='200px' h='200px' />
    ) : null;

  const Error404Message =
    restaurantsLoadingStatus === 'error' ? <ErrorMessage /> : null;

  const items =
    restaurantsLoadingStatus === 'idle' ? (
      <RestaurantsList data={data} />
    ) : null;

  return (
    <AnimatedComponent>
      <AppHeader />
      <Box as='section'>
        <AppBanner />
        <Flex p='50px 0 ' justify='space-between' align='center'>
          <Heading
            as='h5'
            className='font-bold text-4xl'
            fontWeight='700'
            fontSize={breakpointsHeadingMainPage}
            lineHeight='42px'
          >
            Restaurants
          </Heading>
          <Input
            onChange={(e) => setTerm(e.target.value)}
            value={term}
            placeholder='Search for food and restaurants'
            w={breackpointsMainPageInput}
            h='40px'
            backgroundColor='#FFF'
          />
        </Flex>
        <ErrorBoundary>
          {loadingSpinner}
          {items}
          {Error404Message}
        </ErrorBoundary>
      </Box>
      <AppFooter />
    </AnimatedComponent>
  );
};

export default MainPage;
