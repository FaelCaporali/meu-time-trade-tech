import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../index';
import { ILeagues, ILeague } from "../../../types/store/slices/ILeagues";

const initialState: ILeagues = {
  list: [],
}

export const leaguesSlice = createSlice({
  name: 'leagues',
  initialState,
  reducers: {
    setLeagues: (state, action: PayloadAction<ILeague[]>) => {
      state.list = action.payload;
    },
    clearLeagues: (state) => {
      state.list = [];
    }
  }
})

export const { setLeagues, clearLeagues } = leaguesSlice.actions;

export const selectLeagues = (state: RootState) => state.leagues.list;

export default leaguesSlice.reducer;