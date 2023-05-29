import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../index';
import { IBuggedResponse, ISuccessfullyResponse } from '../../../types/store/slices/IResponses';

const initialState: (ISuccessfullyResponse|IBuggedResponse)[] = [];

export const responsesSlice = createSlice({
  name: 'responses',
  initialState,
  reducers: {
    addResponse: (state, action: PayloadAction<ISuccessfullyResponse|IBuggedResponse>) => {
      state.push(action.payload);
    },
  }
})

export const { addResponse } = responsesSlice.actions;

export const selectResponses = (state: RootState) => state.responses;

export default responsesSlice.reducer;