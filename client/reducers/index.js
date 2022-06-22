//qui vanno messi i reducers
import { combineReducers } from "redux";
import preferencesReducer from "./preferencesReducer";
import trackingSessionReducer from "./trackingSessionReducer";
import userReducer from "./userReducer";

export default combineReducers({
    user: userReducer,
    trackingSession: trackingSessionReducer,
    preferences: preferencesReducer
});