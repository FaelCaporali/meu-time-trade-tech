import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../index';

interface IUserState {
    key: string;
    status: {
      account: {
        firstname: string;
        lastname: string;
        email: string;
      };
      subscription: {
        plan: string;
        end: string;
        active: boolean;
      };
      requests: {
        current: number;
        limit_day: number;
      };
    };
}

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