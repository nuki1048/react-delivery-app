// eslint-disable-next-line import/no-extraneous-dependencies

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  combineReducers,
  configureStore,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import restaurants from './slices/mainPageSlice';
import menu from './slices/restaurantsPageSlice';
import cart from './slices/modalCartSlice';
import auth from './slices/authSlice';
import cabinet from './slices/cabinetSlice';
const rootReducer = combineReducers({
  restaurants,
  menu,
  cart,
  auth,
  cabinet,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
export default store;

export type RootState = {
  restaurants: ReturnType<typeof restaurants>;
  menu: ReturnType<typeof menu>;
  cart: ReturnType<typeof cart>;
  auth: ReturnType<typeof auth>;
  cabinet: ReturnType<typeof cabinet>;
};
export type AppDispatch = typeof store.dispatch;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
  extra: { s: string; n: number };
}>();
