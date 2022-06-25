import * as React from "react";

//redux
import { useDispatch, useSelector } from "react-redux";

import AppNavigation from "./AppNavigation";
import AuthNavigation from "./AuthNavigation";

import {
    RESET_ERROR_USER,
    RESET_HISTORY_ERROR,
    RESET_STATISTICS_ERROR,
    RESET_UPDATED,
} from "../redux/actions";
import { resendTrackingInfo } from "../redux/actions/savedTrackingSessionsAction";

//this component renders the auth navigation if the user is not logged in, otherwise it gives access to the app navigation
const Navigation = () => {
    const authToken = useSelector((state) => state.user.authToken);
    const savedSessions = useSelector((state) => state.savedTrackingSessions.saved);

    const dispatch = useDispatch();

    React.useEffect(() => {
        //reset errors and updated user on first load
        dispatch({ type: RESET_ERROR_USER });
        dispatch({ type: RESET_UPDATED });
        dispatch({ type: RESET_STATISTICS_ERROR });
        dispatch({ type: RESET_HISTORY_ERROR });
    }, []);

    React.useEffect(() => { //on first render try to send again tracking info saved on storage at the backend
        if(savedSessions.length > 0) {
            dispatch(resendTrackingInfo(savedSessions));
        }
    }, []);

    return authToken ? <AppNavigation /> : <AuthNavigation />;
};

export default Navigation;
