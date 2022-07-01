import {
    LOCATION_ERROR,
    RESET_LOCATION_ERROR,
    RESET_TRACKING_SESSION,
    SET_TRACKING_ACTIVE,
    SET_TRACKING_INACTIVE,
    UPDATE_TRACKING_INFO,
    REHYDRATE_SESSION_FROM_STORAGE,
    START_SESSION,
} from "../actions";

const initialState = {
    currentLocation: null,
    averageSpeed: 0,
    speed: 0,
    maxSpeed: 0,
    altitude: 0,    //altitude above sea level
    calories: 0,    //calories burned
    distance: 0,
    pace: 0,
    averagePace: 0,
    weather: null,
    heading: 0,
    time: 0,        //timer for the session in milliseconds
    history: [],
    startDate: null,
    endDate: null,
    trackingActive: false,
    error: null,
    numOfPauses: 0,     //this field is necessary to display broken polylines
};

export default function trackingSessionReducer(state = initialState, action) {
    switch (action.type) {
        case RESET_TRACKING_SESSION:
            return {
                currentLocation: null,
                averageSpeed: 0,
                speed: 0,
                maxSpeed: 0,
                altitude: 0,
                calories: 0,
                distance: 0,
                pace: 0,
                averagePace: 0,
                weather: null,
                heading: 0,
                time: 0,
                history: [],
                startDate: null,
                endDate: null,
                trackingActive: false,
                error: null,
                numOfPauses: 0,
            }
        case UPDATE_TRACKING_INFO:
            return {
                ...state,
                ...action.payload,
            };
        case LOCATION_ERROR:
            return {
                ...state,
                error: action.payload,
                speed: 0,
                altitude: 0,
                pace: 0,
                trackingActive: false,
                numOfPauses: state.numOfPauses + 1,
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
                speed: 0,
                altitude: 0,
                pace: 0,
                trackingActive: false,
                numOfPauses: state.numOfPauses + 1,
            };
        case START_SESSION:
            return {
                ...state,
                trackingActive: true,
                startDate: new Date(),
            };
        case REHYDRATE_SESSION_FROM_STORAGE: {
            return {
                ...state,
                ...action.payload,
                startDate: new Date(Date.parse(action.payload.startDate)),
                endDate: action.payload.endDate ? new Date(Date.parse(action.payload.endDate)) : null
            };
        }
        default:
            return state;
    }
}
