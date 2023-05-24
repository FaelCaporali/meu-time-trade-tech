import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../index';

interface ISeasonsState {
    years: number[];
}

const initialState: ISeasonsState = {
  years: [],
}

export const seasonsSlice = createSlice({
  name: 'seasons',
  initialState,
  reducers: {
    setSeasons: (state, action: PayloadAction<number[]>) => {
      state.years = action.payload;
    },
    clearSeasons: (state) => {
      state.years = [];
    }
  }
})

export const { setSeasons, clearSeasons } = seasonsSlice.actions;

export const selectSeasons = (state: RootState) => state.seasons.years;

export default seasonsSlice.reducer;