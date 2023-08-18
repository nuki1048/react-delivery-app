/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { transformData } from '../../lib/firebase-utils';
import {
  MenuItem,
  OperationStatus,
  RestaurantListItem,
} from '../../global/interfaces';

interface initialState {
  menuData: MenuItem[];
  menuLoadingStatus: OperationStatus;
  storeName: string;
  restaurantInfo: Partial<RestaurantListItem>;
}

const initialState: initialState = {
  menuData: [],
  menuLoadingStatus: OperationStatus.Idle,
  storeName: '',
  restaurantInfo: {},
};

interface fetchRestaurantInfoInterface {
  collectionName: string;
  storeName: string;
}

export const fetchRestaurantInfo = createAsyncThunk(
  'menu/fetchRestaurantInfo',
  async (
    payload: fetchRestaurantInfoInterface,
    { rejectWithValue }
  ): Promise<RestaurantListItem> => {
    try {
      const { collectionName, storeName } = payload;
      const docRef = doc(db, collectionName, storeName);
      const docSnap = await getDoc(docRef);

      return docSnap.data() as RestaurantListItem;
    } catch (error) {
      throw rejectWithValue(`Unable to load data from this collection`);
    }
  }
);
export const fetchMenu = createAsyncThunk(
  'menu/fetchMenu',
  async (_, { rejectWithValue }): Promise<MenuItem[]> => {
    try {
      const collectionP = collection(db, 'PRODUCTS');
      const data = await getDocs(collectionP);
      return data.docs.map(transformData<MenuItem>);
    } catch (error) {
      throw rejectWithValue(`Unable to load data from this collection`);
    }
  }
);

const restaurantsPageSlice = createSlice({
  name: 'mainPage',
  initialState,
  reducers: {
    setStoreName: (state, action: PayloadAction<string>) => {
      state.storeName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantInfo.pending, (state) => {
        state.menuLoadingStatus = OperationStatus.Loading;
      })
      .addCase(
        fetchRestaurantInfo.fulfilled,
        (state, action: PayloadAction<RestaurantListItem>) => {
          state.restaurantInfo = action.payload;
          state.menuLoadingStatus = OperationStatus.Idle;
        }
      )
      .addCase(fetchRestaurantInfo.rejected, (state) => {
        state.menuLoadingStatus = OperationStatus.Error;
      })
      .addCase(fetchMenu.pending, (state) => {
        state.menuLoadingStatus = OperationStatus.Loading;
      })
      .addCase(
        fetchMenu.fulfilled,
        (state, action: PayloadAction<MenuItem[]>) => {
          state.menuData = action.payload;
          state.menuLoadingStatus = OperationStatus.Idle;
        }
      )
      .addCase(fetchMenu.rejected, (state) => {
        state.menuLoadingStatus = OperationStatus.Loading;
      });
  },
});
const { reducer, actions } = restaurantsPageSlice;
export default reducer;
export const { setStoreName } = actions;
