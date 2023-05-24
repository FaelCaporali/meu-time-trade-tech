import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../index';

interface IUserState {
    key: string;
}

const initialState: IUserState = {
  key: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.key = action.payload;
    },
    logout: (state) => {
      state.key = "";
    }
  }
})

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.key;

export default userSlice.reducer;