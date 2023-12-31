import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User, UserScheme } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

const initialState: UserScheme = {
  inited: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      console.log('auth reducer called');

      state.authData = action.payload;
    },

    userLogout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
      if (user) {
        state.authData = JSON.parse(user);
      }
      state.inited = true;
    },
  },
});

export const { setAuthData, initAuthData, userLogout } = userSlice.actions;
export const { reducer: userReducer } = userSlice;

export interface CounterScheme {
  value: number;
}
