import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../index';
import { ITeamsStatsState, ITeamStats, ITeamInfo } from "../../../types/store/slices/ITeams";

const initialState: ITeamsStatsState = {
  stats: [],
  list: [],
}

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    addStats: (state, action: PayloadAction<ITeamStats>) => {
      state.stats = [...state.stats, action.payload];
    },
    clearStats: (state) => {
      state.stats = [];
    },
    setList: (state, action: PayloadAction<ITeamInfo[]>) => {
      state.list = action.payload;
    },
    clearList: (state) => {
      state.list = [];
    }
  }
})

export const { addStats, clearStats, setList, clearList } = teamsSlice.actions;

export const selectTeamStats = (state: RootState) => state.teams.stats;

export default teamsSlice.reducer;