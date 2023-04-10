// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from "@reduxjs/toolkit";
import restaurants from "../components/pages/mainPage/mainPageSlice";
import menu from "../components/pages/restaurantPage/restaurantsPageSlice";
import cart from "../components/modalCart/modalCartSlice";

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({ type: action });
  }

  return next(action);
};

const store = configureStore({
  reducer: { restaurants, menu, cart },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
});
export default store;
