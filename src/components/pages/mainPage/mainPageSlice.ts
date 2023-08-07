/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
} from 'firebase/firestore';
// import foodService from "../../../services/foodService";
import { db } from '../../../config/firebase';
import { transformData } from '../../../lib/firebase-utils';
import { RestaurantListItem } from '../../../global/interfaces';

interface initialState {
  restaurantsData: RestaurantListItem[];
  restaurantsLoadingStatus: string;
}

const initialState: initialState = {
  restaurantsData: [],
  restaurantsLoadingStatus: 'idle',
};

export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async (_, { rejectWithValue }) => {
    try {
      const collectionP = collection(db, 'RESTAURANTS');
      const data = await getDocs(collectionP);

      return data.docs.map(transformData<RestaurantListItem>);
    } catch (error) {
      return rejectWithValue(
        `Unable to load data from the ${'RESTAURANTS'} collection`
      );
    }
  }
);

const mainPageSlice = createSlice({
  name: 'mainPage',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.restaurantsLoadingStatus = 'loading';
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.restaurantsData = action.payload;
        state.restaurantsLoadingStatus = 'idle';
      })
      .addCase(fetchRestaurants.rejected, (state) => {
        state.restaurantsLoadingStatus = 'error';
      });
  },
  reducers: {},
});
const { reducer } = mainPageSlice;
export default reducer;
