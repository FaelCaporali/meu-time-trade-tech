import { combineReducers } from '@reduxjs/toolkit'
import countries from './countries';
import teams from './teams';
import user from './user';

const rootReducer = combineReducers({
    countries,
    teams,
    user,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
