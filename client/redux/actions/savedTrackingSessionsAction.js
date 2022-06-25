import { REMOVE_TRACKING_SESSION } from ".";
import axios from "../../axios/";

//try to send all the saved tracking session
export const resendTrackingInfo = (savedSessions) => async (dispatch) => {
    savedSessions.forEach(async (savedSession) => {
        try {
            //try to post again on the backend
            await axios.post("/api/trackingSessions", savedSession);
            dispatch({ type: REMOVE_TRACKING_SESSION, payload: savedSession });
        } catch (error) {
            console.log(error.message);
        }
    });
};
