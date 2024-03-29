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
import { RootState } from '../../store/index';
import {
  CartItem,
  CartItemSlice,
  OperationStatus,
  Order,
  WorkflowStatus,
} from '../../global/interfaces';
import { setItemInLocalStorage } from '../../utils/local-storage-utils';

interface InitialStateCart {
  cart: CartItem[];
  cartLoadingStatus: OperationStatus;
  orderStatus: WorkflowStatus;
}

const initialState: InitialStateCart = {
  cart: [],
  cartLoadingStatus: OperationStatus.Idle,
  orderStatus: WorkflowStatus.Waiting,
};
export const orderPlaces = createAsyncThunk(
  'cart/orderPlaced',
  async (
    payload: Order,
    { rejectWithValue }
  ): Promise<DocumentReference<DocumentData>> => {
    try {
      return await addDoc(collection(db, 'ORDERS'), payload);
    } catch (error) {
      throw rejectWithValue(`we can't add this doc on `);
    }
  }
);

export const changeAmountItemInCart = createAsyncThunk<
  void,
  { operation: 'add' | 'remove'; item: CartItemSlice },
  { state: RootState }
>('cart/addItem', (payload, { dispatch, getState }): void => {
  if (payload.operation === 'add') {
    dispatch(addNewItem(payload.item));
  } else {
    dispatch(removeItem(payload.item));
  }

  const { cart } = getState().cart;

  setItemInLocalStorage('cart', cart);
});

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
    getCartFromCookies: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderPlaces.pending, (state) => {
        state.orderStatus = WorkflowStatus.loading;
      })
      .addCase(orderPlaces.fulfilled, (state) => {
        state.orderStatus = WorkflowStatus.EnteredToDB;
      })
      .addCase(orderPlaces.rejected, (state) => {
        state.orderStatus = WorkflowStatus.Error;
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
export const { addNewItem, removeItem, clearCart, getCartFromCookies } =
  actions;
