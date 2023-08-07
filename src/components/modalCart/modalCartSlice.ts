/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { RootState } from '../../store';
import { CheckoutFormOrder } from '../../global/interfaces';

interface cartItem {
  [key: string]: number;
}

interface initialStateCart {
  cart: cartItem;
  cartLoadingStatus: 'idle' | 'loading' | 'error';
  orderStatus: 'waiting' | 'loadindToEnter' | 'EnteredToDB' | 'Error';
}

const initialState: initialStateCart = {
  cart: {},
  cartLoadingStatus: 'idle',
  orderStatus: 'waiting',
};
export const orderPlaces = createAsyncThunk(
  'cart/orderPlaced',
  async (payload: CheckoutFormOrder, { rejectWithValue }) => {
    try {
      const { order } = payload;
      return await addDoc(collection(db, 'ORDERS'), order);

      // eslint-disable-next-line no-shadow
    } catch (error) {
      return rejectWithValue(`we can't add this doc on `);
    }
  }
);
const itemsCart = createSlice({
  name: 'itemsCart',
  initialState,
  reducers: {
    addNewItem: (state, action) => {
      state.cart[action.payload] = (state.cart[action.payload] || 0) + 1;
    },
    removeItem: (state, action) => {
      state.cart[action.payload] > 1
        ? state.cart[action.payload]--
        : delete state.cart[action.payload];
    },
    clearCart: (state) => {
      state.cart = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderPlaces.pending, (state) => {
        state.orderStatus = 'loadindToEnter';
      })
      .addCase(orderPlaces.fulfilled, (state) => {
        state.orderStatus = 'EnteredToDB';
      })
      .addCase(orderPlaces.rejected, (state) => {
        state.orderStatus = 'Error';
      });
  },
});
export const getTotalCartAmount = createSelector(
  (state: RootState) => state.menu.menuData,
  (state: RootState) => state.cart.cart,
  (menu, cart) => {
    let totalAmount = 0;
    Object.keys(cart).forEach((item) => {
      if (cart[item] > 0) {
        const itemInfo = menu.find((product) => product.id === item);
        if (itemInfo) {
          totalAmount += cart[item] * itemInfo.price;
        }
      }
    });
    return totalAmount;
  }
);

const { actions, reducer } = itemsCart;
export default reducer;
export const { addNewItem, removeItem, clearCart } = actions;
