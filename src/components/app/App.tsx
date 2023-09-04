import { Spinner } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { Navigate } from 'react-router-dom';
import { checkAuth } from '../../store/slices/authSlice';
import Cabinet from '../pages/cabinet/Cabinet';
import {
  checkItemInLocalStorage,
  getItemFormLocalStorage,
  setItemInLocalStorage,
} from '../../utils/local-storage-utils';
import { CartItem } from '../../global/interfaces';
import { getCartFromCookies } from '../../store/slices/modalCartSlice';

const MainPage = lazy(() => import('../pages/mainPage/MainPage'));
const RestaurantPage = lazy(
  () => import('../pages/restaurantPage/RestaurantPage')
);
const OrderThanksPage = lazy(
  () => import('../pages/orderThanksPage/OrderThanksPage')
);
const CheckoutPage = lazy(() => import('../pages/checkoutPage/CheckoutPage'));
const ErrorPage = lazy(() => import('../pages/404/ErrorPage'));

function App(): JSX.Element {
  const { cart } = useAppSelector((store) => store.cart);
  const { isReady, user } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const localStorageCart = checkItemInLocalStorage('cart')
      ? getItemFormLocalStorage<CartItem[] | null>('cart')
      : null;

    if (!localStorageCart) {
      setItemInLocalStorage<CartItem[]>('cart', []);
    }
    dispatch(getCartFromCookies(localStorageCart as CartItem[]));

    dispatch(checkAuth());
  }, []);

  return (
    <Suspense
      fallback={
        <Spinner w={300} h={300} m='200px auto 200px auto' display='flex' />
      }
    >
      <AnimatePresence mode='wait'>
        {isReady && (
          <Routes key={location.pathname} location={location}>
            <Route index element={<MainPage />} />
            <Route path='/restaurats/:storeName' element={<RestaurantPage />} />
            <Route
              path='/checkout'
              element={
                cart ? <Navigate to='/' replace={false} /> : <CheckoutPage />
              }
            />
            <Route path='*' element={<ErrorPage />} />
            <Route
              path='/orderThanks/:orderNum'
              element={<OrderThanksPage />}
            />
            <Route
              path='/cabinet'
              element={user ? <Cabinet /> : <Navigate to='/' replace={false} />}
            />
          </Routes>
        )}
      </AnimatePresence>
    </Suspense>
  );
}

export default App;
