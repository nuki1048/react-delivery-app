import { Spinner } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import MainPage from "../pages/mainPage/MainPage";

// import RestaurantPage from "../pages/restaurantPage/RestaurantPage";

const MainPage = lazy(() => import("../pages/mainPage/MainPage"));
const RestaurantPage = lazy(() =>
  import("../pages/restaurantPage/RestaurantPage")
);

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<MainPage />} />
        <Route path="/restaurats/:storeName" element={<RestaurantPage />} />
      </Route>
    )
  );

  return (
    <Suspense
      fallback={<Spinner w="600px" h="600px" m="200px auto 200px auto" />}
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
