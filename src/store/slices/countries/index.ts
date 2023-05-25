import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../index';

interface ICountry {
    name: string;
    code: string|null;
    flag: string|null;
}

interface ICountriesState {
    list: ICountry[];
}

const initialState: ICountriesState = {
  list: [],
}

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<ICountry[]>) => {
      state.list = action.payload;
    },
    clearCountries: (state) => {
      state.list = [];
    }
  }
})

export const { setCountries, clearCountries } = countriesSlice.actions;

export const selectCountries = (state: RootState) => state.countries.list;

export default countriesSlice.reducer;
