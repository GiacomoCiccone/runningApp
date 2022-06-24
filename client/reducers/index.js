//qui vanno messi i reducers
import { combineReducers } from "redux";
import historyReducer from "./historyReducer";
import preferencesReducer from "./preferencesReducer";
import statisticsReducer from "./statisticsReducer";
import trackingSessionReducer from "./trackingSessionReducer";
import userReducer from "./userReducer";

export default combineReducers({
    user: userReducer,
    trackingSession: trackingSessionReducer,
    preferences: preferencesReducer,
    statistics: statisticsReducer,
    history: historyReducer,
});