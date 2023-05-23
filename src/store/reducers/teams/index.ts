import IStoreAction from "../../../types/store/actions";

const initialState = {
    teams: [],
}

const teams = (state = initialState, action: IStoreAction) => {
    switch (action.type) {
        case 'ADD-TEAM':
            return {
                ...state,
                teams: [...state.teams, action.payload],
            }
        case 'REMOVE-TEAM':
            return {
                ...state,
                teams: state.teams.filter(team => team !== action.payload),
            }
        case 'CLEAR-TEAMS':
            return {
                ...state,
                teams: [],
            }
        case 'POPULATE-TEAMS':
            return {
                ...state,
                teams: action.payload,
            }
        default:
            return state;
    }
}

export default teams;
