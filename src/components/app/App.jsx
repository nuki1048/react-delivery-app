import { Spinner } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React, { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ErrorPage from "../pages/404/ErrorPage";

// import MainPage from "../pages/mainPage/MainPage";

// import RestaurantPage from "../pages/restaurantPage/RestaurantPage";

const MainPage = lazy(() => import("../pages/mainPage/MainPage"));
const RestaurantPage = lazy(() =>
  import("../pages/restaurantPage/RestaurantPage")
);

function App() {
  // const router = createBrowserRouter(
  //   createRoutesFromElements(<Route path="/" />)
  // );
  const location = useLocation();
  return (
    <Suspense
      fallback={<Spinner w="600px" h="600px" m="200px auto 200px auto" />}
    >
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route index element={<MainPage />} />
          <Route path="/restaurats/:storeName" element={<RestaurantPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default App;
