import { Grid } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import AnimatedComponent from '../animatedComponent/AnimatedComponent';
import RestaurantItem from '../restaurantItem/RestaurantItem';
import { breackpointsGrid } from '../../theme/breakpoints';
import { RestaurantsListProps } from './RestaurantsList.props';
import { RestaurantListItem } from '../../global/interfaces';
import { restaurantsListGrid } from '../../theme/styles';

function RestaurantsList({ data }: RestaurantsListProps): JSX.Element {
  const renderItems = (arr: RestaurantListItem[]) =>
    arr.map((item) => (
      <Link key={item.id} to={`/restaurats/${item.id}`}>
        <RestaurantItem
          id={item.id}
          name={item.name}
          startingPrice={item.startingPrice}
          category={item.category}
          rating={item.rating}
        />
      </Link>
    ));

  const items = renderItems(data);

  return (
    <AnimatedComponent>
      <Grid {...restaurantsListGrid}>{items}</Grid>
    </AnimatedComponent>
  );
}

export default RestaurantsList;
