import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';

interface initialStateAuth {
  user: User | null;
  isReady: boolean;
}
const initialState: initialStateAuth = {
  user: null,
  isReady: false,
};

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { dispatch }): Promise<void> => {
    await onAuthStateChanged(auth, (user) => {
      let authUser: User | null = null;
      if (user) {
        authUser = {
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
        } as User;
      }

      dispatch(authIsReady(authUser));
    });
  }
);
type UserAuth = PayloadAction<User | null>;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authIsReady: (state, action: UserAuth) => {
      state.isReady = true;
      state.user = action.payload;
    },
    signIn: (state, action: UserAuth) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
  },
});

const { actions, reducer } = authSlice;
export default reducer;

export const { authIsReady, signIn, signOut } = actions;
