import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../index';
import { IUserState } from "../../../types/store/slices/IUser";

const initialState: IUserState = {
  key: "",
  status: {
    account: {
      firstname: "",
      lastname: "",
      email: "",
    },
    subscription: {
      plan: "",
      end: "",
      active: false,
    },
    requests: {
      current: 0,
      limit_day: 0,
    },
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUserState>) => {
      state.key = action.payload.key;
      state.status = action.payload.status;
    },
    logout: (state) => {
      state.key = "";
      state.status = initialState.status;
    }
  }
})

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.key;

export default userSlice.reducer;