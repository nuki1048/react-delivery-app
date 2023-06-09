import { Spinner } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React, { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

const MainPage = lazy(() => import("../pages/mainPage/MainPage"));
const RestaurantPage = lazy(() =>
  import("../pages/restaurantPage/RestaurantPage")
);
const OrderThanksPage = lazy(() =>
  import("../pages/orderThanksPage/OrderThanksPage")
);
const CheckoutPage = lazy(() => import("../pages/checkoutPage/CheckoutPage"));
const ErrorPage = lazy(() => import("../pages/404/ErrorPage"));

function App() {
  const location = useLocation();
  return (
    <Suspense
      fallback={<Spinner w="600px" h="600px" m="200px auto 200px auto" />}
    >
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route index element={<MainPage />} />
          <Route path="/restaurats/:storeName" element={<RestaurantPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/orderThanks/:orderNum" element={<OrderThanksPage />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default App;
