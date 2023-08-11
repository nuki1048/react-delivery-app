import { useEffect } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';

import { useParams } from 'react-router-dom';
import AppFooter from '../../appFooter/AppFooter';
import AppHeader from '../../appHeader/AppHeader';

import MenuList from '../../menuList/MenuList';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';
import AnimatedComponent from '../../animatedComponent/AnimatedComponent';
import {
  fetchRestaurantInfo,
  setStoreName,
} from '../../../store/slices/restaurantsPageSlice';
import { useAppDispatch, useAppSelector } from '../../../store';
import {
  restaurantInfoRating,
  restaurantInfoText,
  restaurantItemRatingBefore,
  restaurantPageFlex,
  restaurantPageHeading,
} from '../../../theme/styles';

function RestaurantPage(): JSX.Element {
  const { storeName } = useParams();
  const restaurantInfo = useAppSelector((state) => state.menu.restaurantInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (storeName) {
      dispatch(
        fetchRestaurantInfo({ collectionName: 'RESTAURANTS', storeName })
      );
      dispatch(setStoreName(storeName));
    }
  }, []);

  return (
    <AnimatedComponent>
      <AppHeader />
      <Flex {...restaurantPageFlex}>
        <Heading as='h5' {...restaurantPageHeading}>
          {restaurantInfo.name}
        </Heading>
        <Text
          {...restaurantInfoRating}
          position='relative'
          _before={restaurantItemRatingBefore}
        >
          {restaurantInfo.rating}
        </Text>
        <Text display={{ base: 'none', md: 'block' }} {...restaurantInfoText}>
          От {restaurantInfo.startingPrice} ₴
        </Text>
        <Text {...restaurantInfoText}>{restaurantInfo.category}</Text>
      </Flex>
      <ErrorBoundary>
        <MenuList />
      </ErrorBoundary>
      <AppFooter />
    </AnimatedComponent>
  );
}

export default RestaurantPage;
