import { combineReducers } from '@reduxjs/toolkit'
import user from './user';
import countries from './countries';
import leagues from './leagues';
import seasons from './seasons';
import teams from './teams';
import filters from './filters';
import responses from './requests';

const rootReducer = combineReducers({
  user,
  countries,
  seasons,
  leagues,
  teams,
  filters,
  responses,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
