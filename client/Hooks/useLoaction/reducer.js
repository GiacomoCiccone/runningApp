import { LOCATION_ERROR, RESET_LOCATION_ERROR, RESET_STATE, SET_TRACKING_ACTIVE, SET_TRACKING_INACTIVE, UPDATE_TRACKING_INFO } from "./actions";

export const initialState = {
    trackingInfo: {
        currentLocation: null,
        averageSpeed: 0,
        speed: 0,
        altitude: 0,
        calories: 0,
        distance: 0,
        wheater: null,
        heading: 0,
        time: 0,
        history: [],
        startDate: null
    },
    trackingActive: false,
    error: false,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_TRACKING_INFO:
            return {
                ...state,
                trackingInfo: {
                    ...state.trackingInfo,
                    ...action.payload,
                },
            };
        case RESET_STATE:
            return initialState;
        case LOCATION_ERROR:
            return {
                ...state,
                error: action.payload,
                trackingActive: false,
            };
        case RESET_LOCATION_ERROR:
            return {
                ...state,
                error: false,
            };
        case SET_TRACKING_ACTIVE:
            return {
                ...state,
                trackingActive: true,
                trackingInfo: {
                    ...state.trackingInfo,
                    startDate: state.trackingActive.startDate ? state.trackingActive.startDate : new Date()
                }
            };
        case SET_TRACKING_INACTIVE:
            return {
                ...state,
                trackingActive: false,
            };
        default:
            return state;
    }
};