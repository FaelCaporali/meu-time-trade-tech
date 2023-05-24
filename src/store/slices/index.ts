import { combineReducers } from '@reduxjs/toolkit'
import user from './user';
import countries from './countries';
import leagues from './leagues';
import seasons from './seasons';
import teams from './teams';
import filters from './filters';

const rootReducer = combineReducers({
  user,
  countries,
  seasons,
  leagues,
  teams,
  filters,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
