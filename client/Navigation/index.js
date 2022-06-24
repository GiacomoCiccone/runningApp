import * as React from "react";
import * as RN from "react-native";

//redux
import { useSelector, useDispatch } from "react-redux";

import AppNavigation from "./AppNavigation";
import AuthNavigation from "./AuthNavigation";

import { RESET_ERROR_USER, RESET_STATISTICS_ERROR, RESET_UPDATED } from "../actions";

const Navigation = () => {
    const authToken = useSelector((state) => state.user.authToken);

    const dispatch = useDispatch()

    React.useEffect(() => { //reset error and updated user on first load
        dispatch({ type: RESET_ERROR_USER });
        dispatch({type: RESET_UPDATED})
        dispatch({ type: RESET_STATISTICS_ERROR });
    }, []);


    return authToken ? <AppNavigation /> : <AuthNavigation />;
};

export default Navigation;
