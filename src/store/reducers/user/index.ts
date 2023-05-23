import IStoreAction from "../../../types/store/actions";

const initialState = {
    apiKey: process.env.DEV ? process.env.VITE_API_SPORTS_KEY : '',
}

const user = (state = initialState, action: IStoreAction) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                key: action.payload,
            }
        case 'LOGOUT':
            return {
                ...state,
                key: '',
            }
        default:
            return state;
    }
}

export default user;