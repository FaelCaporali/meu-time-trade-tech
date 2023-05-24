import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../index';

interface ILeague {
  league: {
    id: number;
    name: string;
    type: string;
    logo: string;
  };
  country: {
    name: string;
    code: string;
    flag: string;
  };
  seasons: ISeason[];
}
interface ISeason {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: {
    fixtures: {
      events: boolean;
      lineups: boolean;
      statistics_fixtures: boolean;
      statistics_players: boolean;
    };
    standings: boolean;
    players: boolean;
    top_scorers: boolean;
    top_assists: boolean;
    top_cards: boolean;
    injuries: boolean;
    predictions: boolean;
    odds: boolean;
  };
}

interface ILeagues {
  list: ILeague[];
}

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