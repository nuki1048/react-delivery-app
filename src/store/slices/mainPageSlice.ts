/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
// import foodService from "../../../services/foodService";
import { db } from '../../config/firebase';
import { transformData } from '../../lib/firebase-utils';
import { OperationStatus, RestaurantListItem } from '../../global/interfaces';

interface initialState {
  restaurantsData: RestaurantListItem[];
  restaurantsLoadingStatus: OperationStatus;
}

const initialState: initialState = {
  restaurantsData: [],
  restaurantsLoadingStatus: OperationStatus.Idle,
};

export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async (_, { rejectWithValue }): Promise<RestaurantListItem[]> => {
    try {
      const collectionP = collection(db, 'RESTAURANTS');
      const data = await getDocs(collectionP);

      return data.docs.map(transformData<RestaurantListItem>);
    } catch (error) {
      throw rejectWithValue(
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
        state.restaurantsLoadingStatus = OperationStatus.Loading;
      })
      .addCase(
        fetchRestaurants.fulfilled,
        (state, action: PayloadAction<RestaurantListItem[]>) => {
          state.restaurantsData = action.payload;
          state.restaurantsLoadingStatus = OperationStatus.Idle;
        }
      )
      .addCase(fetchRestaurants.rejected, (state) => {
        state.restaurantsLoadingStatus = OperationStatus.Error;
      });
  },
  reducers: {},
});
const { reducer } = mainPageSlice;
export default reducer;
