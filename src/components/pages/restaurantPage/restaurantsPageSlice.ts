/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { transformData } from '../../../lib/firebase-utils';
import { MenuItem } from '../../../global/interfaces';

interface initialState {
  menuData: MenuItem[];
  menuLoadingStatus: 'idle' | 'loading' | 'error';
  storeName: string;
  restaurantInfo: any;
}

const initialState: initialState = {
  menuData: [],
  menuLoadingStatus: 'idle',
  storeName: '',
  restaurantInfo: null,
};

interface fetchRestaurantInfoInterface {
  collectionName: string;
  storeName: string;
}

export const fetchRestaurantInfo = createAsyncThunk(
  'menu/fetchRestaurantInfo',
  async (payload: fetchRestaurantInfoInterface, { rejectWithValue }) => {
    try {
      const { collectionName, storeName } = payload;
      const docRef = doc(db, collectionName, storeName);
      const docSnap = await getDoc(docRef);

      return docSnap.data();
    } catch (error) {
      return rejectWithValue(`Unable to load data from this collection`);
    }
  }
);
export const fetchMenu = createAsyncThunk(
  'menu/fetchMenu',
  async (_, { rejectWithValue }) => {
    try {
      const collectionP = collection(db, 'PRODUCTS');
      const data = await getDocs(collectionP);
      return data.docs.map(transformData<MenuItem>);
    } catch (error) {
      return rejectWithValue(`Unable to load data from this collection`);
    }
  }
);

const restaurantsPageSlice = createSlice({
  name: 'mainPage',
  initialState,
  reducers: {
    setStoreName: (state, action) => {
      state.storeName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantInfo.pending, (state) => {
        state.menuLoadingStatus = 'loading';
      })
      .addCase(fetchRestaurantInfo.fulfilled, (state, action) => {
        state.restaurantInfo = action.payload;
        state.menuLoadingStatus = 'idle';
      })
      .addCase(fetchRestaurantInfo.rejected, (state) => {
        state.menuLoadingStatus = 'error';
      })
      .addCase(fetchMenu.pending, (state) => {
        state.menuLoadingStatus = 'loading';
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.menuData = action.payload;
        state.menuLoadingStatus = 'idle';
      })
      .addCase(fetchMenu.rejected, (state) => {
        state.menuLoadingStatus = 'error';
      });
  },
});
const { reducer, actions } = restaurantsPageSlice;
export default reducer;
export const { setStoreName } = actions;
