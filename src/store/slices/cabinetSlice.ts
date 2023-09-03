import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OperationStatus, Order } from '../../global/interfaces';
import {
  DocumentReference,
  Query,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { transformData } from '../../lib/firebase-utils';
import { auth, db } from '../../config/firebase';
import { RootState } from '..';
import { User, updateProfile } from 'firebase/auth';

interface UserInfo {
  displayName: string;
  address: string;
  gender: string;
}

interface initialStateCabinet {
  orderList: Order[];
  userInfo: UserInfo | null;
  loadingStatus: OperationStatus;
}

const initialState: initialStateCabinet = {
  orderList: [],
  loadingStatus: OperationStatus.Idle,
  userInfo: null,
};

export const fetchOrderList = createAsyncThunk(
  'cabinet/fetchOrderList',
  async (
    payload: string | undefined,
    { rejectWithValue }
  ): Promise<Order[]> => {
    try {
      const collectionQuery = query(
        collection(db, 'ORDERS'),
        where('userId', '==', payload)
      ) as Query<Order[]>;
      const response = await getDocs<Order[]>(collectionQuery);
      return response.docs.map(transformData<Order>);
    } catch (error) {
      throw rejectWithValue('Unable to load data from this collection');
    }
  }
);

export const fetchUserInfo = createAsyncThunk<
  UserInfo,
  undefined,
  { state: RootState }
>(
  'cabinet/fetchUserInfo',
  async (_, { rejectWithValue, getState }): Promise<UserInfo> => {
    const { user } = getState().auth;

    if (!user) {
      throw rejectWithValue('User is not authenticated');
    }

    const docRef = doc(db, 'USERS', user.uid) as DocumentReference<UserInfo>;
    try {
      const response = await getDoc<UserInfo>(docRef);
      const userData = response.data();
      if (!userData) {
        throw new Error('No data found in the document');
      }
      return userData;
    } catch (error) {
      throw rejectWithValue('Unable to load data from this collection');
    }
  }
);

export const changeUserInfo = createAsyncThunk<
  UserInfo,
  UserInfo,
  { state: RootState }
>('cabinet/changeUserInfo', async (payload, { getState }) => {
  const { user } = getState().auth;
  const { address, displayName, gender } = payload;

  const docRef = doc(db, 'USERS', user?.uid as string);

  try {
    await setDoc(docRef, { address, gender });

    await updateProfile(auth.currentUser as User, {
      displayName: displayName,
    });

    return payload;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const cabinetSlice = createSlice({
  initialState,
  name: 'cabinet',
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchOrderList.pending, (state) => {
        state.loadingStatus = OperationStatus.Loading;
      })
      .addCase(fetchOrderList.fulfilled, (state, action) => {
        state.orderList = action.payload;
        state.loadingStatus = OperationStatus.Idle;
      })
      .addCase(fetchOrderList.rejected, (state) => {
        state.loadingStatus = OperationStatus.Error;
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.loadingStatus = OperationStatus.Loading;
      })
      .addCase(fetchUserInfo.fulfilled, (state, { payload }) => {
        state.loadingStatus = OperationStatus.Idle;
        state.userInfo = payload;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.loadingStatus = OperationStatus.Error;
      })
      .addCase(changeUserInfo.fulfilled, (state, { payload }) => {
        state.userInfo = payload;
      }),
});

const { reducer } = cabinetSlice;
export default reducer;
