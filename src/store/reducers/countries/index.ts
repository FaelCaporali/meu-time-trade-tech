import IStoreAction from "../../../types/store/actions";

const initialState = {
    countries: [],
}

const countries = (state = initialState, action: IStoreAction) => {
    switch (action.type) {
        case 'ADD-COUNTRY':
            return {
                ...state,
                teams: [...state.countries, action.payload],
            }
        case 'REMOVE-COUNTRY':
            return {
                ...state,
                teams: state.countries.filter(country => country !== action.payload),
            }
        case 'CLEAR-COUNTRIES':
            return {
                ...state,
                countries: [],
            }
        case 'POPULATE-COUNTRIES':
            return {
                ...state,
                countries: action.payload,
            }
        default:
            return state;
    }
}

export default countries;
