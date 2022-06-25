import { ADD_TRACKING_SESSION, LOCATION_ERROR, RESET_TRACKING_SESSION } from ".";
import axios from '../../axios/'

export const sendTrackingInfo = (trackingInfo) => async (dispatch) => {
    //reset session
    dispatch({
        type: RESET_TRACKING_SESSION
    });
    try {   //try to post on the backend
        await axios.post("/api/trackingSessions", trackingInfo);
    } catch (error) {
        dispatch({type: ADD_TRACKING_SESSION, payload: trackingInfo})  //save the session in the storage and try again later
        dispatch({type: LOCATION_ERROR, payload: "Errore durante l'invio dei dati al server"})
    }
};