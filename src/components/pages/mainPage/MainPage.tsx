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

import { fetchRestaurants } from '../../../store/slices/mainPageSlice';
import { useAppDispatch, useAppSelector } from '../../../store';
import AnimatedComponent from '../../animatedComponent/AnimatedComponent';
import { RestaurantListItem } from '../../../global/interfaces';
import {
  mainPageFlex,
  mainPageHeading,
  mainPageInput,
} from '../../../theme/styles';

const MainPage = (): JSX.Element => {
  const [term, setTerm] = useState('');
  const { restaurantsData, restaurantsLoadingStatus } = useAppSelector(
    (state) => state.restaurants
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, []);

  const filteredData = (arr: RestaurantListItem[]) =>
    arr.filter((restaurant) => restaurant.name.includes(term));

  const data = filteredData(restaurantsData);

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
        <Flex {...mainPageFlex}>
          <Heading as='h5' {...mainPageHeading}>
            Restaurants
          </Heading>
          <Input
            onChange={(e) => setTerm(e.target.value)}
            value={term}
            placeholder='Search for food and restaurants'
            {...mainPageInput}
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
