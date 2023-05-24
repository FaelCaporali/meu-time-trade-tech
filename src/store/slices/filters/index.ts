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
      state.country = action.payload;
    },
    clearCountry: (state) => {
      state.country = undefined;
    },
    setSeason: (state, action: PayloadAction<number>) => {
      state.season = action.payload;
    },
    clearSeason: (state) => {
      state.season = undefined;
    },
    setLeague: (state, action: PayloadAction<string>) => {
      state.league = action.payload;
    },
    clearLeague: (state) => {
      state.league = undefined;
    },
    setTeam: (state, action: PayloadAction<string>) => {
      state.team = action.payload;
    },
    clearTeam: (state) => {
      state.team = undefined;
    },
    clearFilters: (state) => {
      state.country = undefined;
      state.season = undefined;
      state.league = undefined;
      state.team = undefined;
    }
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
  clearTeam,
  clearFilters
} = filtersSlice.actions;

export const selectFilters = (state: RootState) => state.filters;

export default filtersSlice.reducer;
