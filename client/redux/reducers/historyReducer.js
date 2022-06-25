import {
    RESET_HISTORY_ERROR,
    HISTORY_FAIL,
    HISTORY_REQUEST,
    HISTORY_SUCCESS,
    RESET_HISTORY,
    HISTORY_FINISHED,
} from "../actions";

const initalState = {
    isLoading: false,
    history: [],
    error: null,
    finished: false,
};

export default function historyReducer(state = initalState, action) {
    switch (action.type) {
        case HISTORY_SUCCESS:
            return {
                ...state,
                history: [...state.history, ...action.payload.history],
                error: null,
                isLoading: false,
            };
        case HISTORY_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case HISTORY_FAIL:
            return {
                ...state,
                isLoading: false,
                history: [],
                error: action.payload,
            };
        case RESET_HISTORY_ERROR:
            return {
                ...state,
                error: null,
                isLoading: false,
            };
        case RESET_HISTORY:
            return {
                isLoading: false,
                history: [],
                error: null,
                finished: false,
            };
        case HISTORY_FINISHED:
            return {
                ...state,
                finished: true,
                isLoading: false,
                
            }
        default:
            return state;
    }
}
