import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../index';

interface ITeamInfo {
  team: {
    id: number;
    name: string;
    code: string;
    country: string;
    founded: number;
    national: boolean;
    logo: string;
  };
  venue: {
    id: number;
    name: string;
    address: string;
    city: string;
    capacity: number;
    surface: string;
    image: string;
  };
}
interface ITeamsStatsState {
  list: ITeamInfo[];  
  stats: ITeamStats[];
}
interface IResults {
    home: number;
    away: number;
    total: number;
}

interface IAverageResults {
    home: string;
    away: string;
    total: string;
}

interface IGoalMinute {
    total: number | null;
    percentage: string | null;
}

interface IMinutesStats {
  "0-15": IGoalMinute;
  "16-30": IGoalMinute;
  "31-45": IGoalMinute;
  "46-60": IGoalMinute;
  "61-75": IGoalMinute;
  "76-90": IGoalMinute;
  "91-105": IGoalMinute;
  "106-120": IGoalMinute;
}

interface IGoalStats {
    for: IResults;
    average: IAverageResults;
    minutes: IMinutesStats;
}

interface IPlayer {
    id: number;
    name: string;
    age: number;
    nationality: string;
}

export interface ITeamStats {
    teamId: number;
    name: string;
    season: number;
    league: number;
    players: IPlayer[];
    lineUp: {
        formation: string;
        played: number;
    }[];
    fixtures: {
        played: IResults;
        wins: IResults;
        draws: IResults;
        loses: IResults;
    };
    goals: IGoalStats;
}

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