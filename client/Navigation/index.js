import * as React from "react";
import * as RN from "react-native";

//redux
import { useSelector, useDispatch } from "react-redux";

import AppNavigation from "./AppNavigation";
import AuthNavigation from "./AuthNavigation";

import { RESET_ERROR_USER } from "../actions";

const Navigation = () => {
    const authToken = useSelector((state) => state.user.authToken);

    const dispatch = useDispatch()

    React.useEffect(() => { //reset error user on first load
        dispatch({ type: RESET_ERROR_USER });
    }, []);


    return !authToken ? <AppNavigation /> : <AuthNavigation />;
};

export default Navigation;
