import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { Accordion } from '@chakra-ui/react';
import OrderListItem from './orderListItem';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchOrderList } from '../../store/slices/cabinetSlice';
const OrderListTab = (): JSX.Element => {
  const { orderList } = useAppSelector((state) => state.cabinet);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrderList(user?.uid));
  }, []);
  return (
    <Box
      as='section'
      width='870px'
      height='800px'
      padding='40px 80px 35px 80px'
    >
      <Accordion>
        {orderList &&
          orderList.map((item) => <OrderListItem {...item} key={item.id} />)}
      </Accordion>
    </Box>
  );
};

export default OrderListTab;
