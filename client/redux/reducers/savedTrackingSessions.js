import { ADD_TRACKING_SESSION, REMOVE_TRACKING_SESSION } from "../actions";

const initialState = {
    saved: []   //array of sessions to be sent
};

export default function savedTrackingSessionReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TRACKING_SESSION:
            return {
                saved: [...state.saved, action.payload]
            }
        case REMOVE_TRACKING_SESSION:
            return {
                saved: state.saved.filter(trackingSession => trackingSession.startDate !== action.payload.startDate)
            };
       
        default:
            return state;
    }
}
