import { RESET_TRACKING_SESSION } from ".";
import axios from '../axios/'

export const sendTrackingInfo = (trackingInfo) => async (dispatch) => {
    //reset session
    dispatch({
        type: RESET_TRACKING_SESSION
    });
    try {   //try to post on the backend
        await axios.post("/api/trackingSessions", trackingInfo);
    } catch (error) {
        console.log(error);
    }
};