import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface UserState {
  isAuthenticated: boolean;
  user: { email: string } | null;
  token: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ email: string; token: string }>) => {
      console.log('action :>> ', action);
      state.isAuthenticated = true;
      state.user = { email: action.payload.email };
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user.user;
export const selectToken = (state: RootState) => state.user.token;
