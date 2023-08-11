/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { RootState } from '..';
import {
  CartItem,
  CartItemSlice,
  CheckoutFormOrder,
} from '../../global/interfaces';

interface InitialStateCart {
  cart: CartItem[];
  cartLoadingStatus: 'idle' | 'loading' | 'error';
  orderStatus: 'waiting' | 'loadindToEnter' | 'EnteredToDB' | 'Error';
}

const initialState: InitialStateCart = {
  cart: [],
  cartLoadingStatus: 'idle',
  orderStatus: 'waiting',
};
export const orderPlaces = createAsyncThunk(
  'cart/orderPlaced',
  async (
    payload: CheckoutFormOrder,
    { rejectWithValue }
  ): Promise<DocumentReference<DocumentData>> => {
    try {
      const { order } = payload;
      return await addDoc(collection(db, 'ORDERS'), order);

      // eslint-disable-next-line no-shadow
    } catch (error) {
      throw rejectWithValue(`we can't add this doc on `);
    }
  }
);
const itemsCart = createSlice({
  name: 'itemsCart',
  initialState,
  reducers: {
    addNewItem: (state, action: PayloadAction<CartItemSlice>) => {
      const itemCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemCart) {
        itemCart.amount++;
      }
      if (!itemCart) {
        const newCartItem = { ...action.payload, amount: 1 };
        state.cart.push(newCartItem);
      }
    },
    removeItem: (state, action: PayloadAction<CartItemSlice>) => {
      const itemCart = state.cart.find((item) => item.id === action.payload.id);
      if (!itemCart) {
        return state;
      }
      if (itemCart.amount > 1) {
        itemCart.amount--;
      }
      if (itemCart.amount === 1) {
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      }
    },
    clearCart: (state) => {
      state.cart = [];
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
  (state: RootState) => state.cart.cart,
  (cart: CartItem[]): number => {
    let totalAmount = 0;
    cart.forEach((cartItem: CartItem): void => {
      totalAmount += cartItem.amount * cartItem.price;
    });
    return totalAmount;
  }
);

const { actions, reducer } = itemsCart;
export default reducer;
export const { addNewItem, removeItem, clearCart } = actions;
