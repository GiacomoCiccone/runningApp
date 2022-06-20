import { LOCATION_ERROR, RESET_LOCATION_ERROR, RESET_STATE, SET_TRACKING_ACTIVE, SET_TRACKING_INACTIVE, UPDATE_TRACKING_INFO, SWITCH_TO_BACKGROUND, REHYDRATE_SESSION_FROM_STORAGE, START_SESSION } from "../actions";

const initialState = {
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
    startDate: null,
    trackingActive: false,
    error: null,
    inBackground: false,
    numOfPauses: 0
};

export default function trackingSessionReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_TRACKING_INFO:
            return {
                ...state,
                ...action.payload,
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
                error: null,
            };
        case SET_TRACKING_ACTIVE:
            return {
                ...state,
                trackingActive: true,
            };
        case SET_TRACKING_INACTIVE:
            return {
                ...state,
                trackingActive: false,
                numOfPauses: state.numOfPauses + 1
            };
        case SWITCH_TO_BACKGROUND: 
            return {
                ...state,
                inBackground: true
            }
        case START_SESSION:
            return {
                ...state,
                trackingActive: true,
                startDate: new Date()
            }
        case REHYDRATE_SESSION_FROM_STORAGE: {
            return {
                ...state,
                ...action.payload,
                inBackground: false
            }
        }
        default:
            return state;
    }
};