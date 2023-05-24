import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../index';

interface IFilters {
    country: string | undefined;
    season: number | undefined;
    league: string | undefined;
    team: string | undefined;
}

const initialState: IFilters = {
  country: undefined,
  season: undefined,
  league: undefined,
  team: undefined,
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCountry: (state, action: PayloadAction<string>) => {
      state.filters.country = action.payload;
    },
    clearCountry: (state) => {
      state.filters.country = undefined;
    },
    setSeason: (state, action: PayloadAction<number>) => {
      state.filters.season = action.payload;
    },
    clearSeason: (state) => {
      state.filters.season = undefined;
    },
    setLeague: (state, action: PayloadAction<string>) => {
      state.filters.league = action.payload;
    },
    clearLeague: (state) => {
      state.filters.league = undefined;
    },
    setTeam: (state, action: PayloadAction<string>) => {
      state.filters.team = action.payload;
    },
    clearTeam: (state) => {
      state.filters.team = undefined;
    },
  }
})

export const {
  setCountry,
  clearCountry,
  setSeason,
  clearSeason,
  setLeague,
  clearLeague,
  setTeam,
  clearTeam
} = filtersSlice.actions;

export const selectFilters = (state: RootState) => state.filters;

export default filtersSlice.reducer;
