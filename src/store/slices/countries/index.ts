import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../index';
import { ICountry, ICountriesState } from "../../../types/store/slices/ICountries";

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
