/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from 'react';

import { Box, Grid, Heading, Spinner } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { createSelector } from '@reduxjs/toolkit';

import ErrorMessage from '../errorMessage/ErrorMessage';
import MenuItem from '../menuItem/MenuItem';
import AnimatedComponent from '../animatedComponent/AnimatedComponent';
import { fetchMenu } from '../../store/slices/restaurantsPageSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { RootState } from '../../store/RootState';
import { MenuItem as MenuItemInterface } from '../../global/interfaces';
import { menuListGrid, menuListLink } from '../../theme/styles';

function MenuList(): JSX.Element {
  const filter = createSelector(
    (state: RootState) => state.menu.menuData,
    (state: RootState) => state.menu.storeName,
    (menu, name) =>
      menu.filter((item: MenuItemInterface) => item.storeName === name)
  );
  const { menuLoadingStatus } = useAppSelector((state) => state.menu);
  const filteredData = useAppSelector(filter);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMenu());
  }, []);

  const renderItems = (arr: MenuItemInterface[]) => {
    const items =
      arr.length > 0 ? (
        arr.map((item: MenuItemInterface) => (
          <MenuItem
            storeName={item.storeName}
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
          />
        ))
      ) : (
        <Box gridColumn='1/4'>
          <Heading as='h3' m='60px 0 30px 0 ' mb='30px'>
            There's nothing here yet
          </Heading>
          <Link style={{ ...menuListLink, textAlign: 'center' }} to='/'>
            Back to home page
          </Link>
        </Box>
      );
    return items;
  };
  const items = menuLoadingStatus === 'idle' ? renderItems(filteredData) : null;
  const loadingSpinner =
    menuLoadingStatus === 'loading' ? (
      <Spinner width='200px' height='200px' display='flex' gridColumn={2} />
    ) : null;
  const error = menuLoadingStatus === 'error' ? <ErrorMessage /> : null;
  return (
    <AnimatedComponent>
      <Grid {...menuListGrid}>
        {error}
        {items}
        {loadingSpinner}
      </Grid>
    </AnimatedComponent>
  );
}
export default MenuList;
