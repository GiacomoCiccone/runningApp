import { RESET_STATISTICS_ERROR, STATISTICS_FAIL, STATISTICS_REQUEST, STATISTICS_SUCCESS } from "../actions";

const initalState = {
    isLoading: false,
    trackingStatistics: [],
    userRecords: null,
    error: null,
};

export default function statisticsReducer(state = initalState, action) {
    switch (action.type) {
        case STATISTICS_SUCCESS:
            return {
                ...state,
                ...action.payload,
                error: null,
                isLoading: false,
            };
        case STATISTICS_REQUEST:
            return {
                ...state,
                isLoading: true,
                trackingStatistics: [],
                userRecords: null,
                error: null,
            };
        case STATISTICS_FAIL:
            return {
                ...state,
                isLoading: false,
                trackingStatistics: [],
                userRecords: null,
                error: action.payload,
            };
        case RESET_STATISTICS_ERROR:
            return {
                ...state,
                error: null,
                isLoading: false,
            }
        default:
            return state;
    }
}
