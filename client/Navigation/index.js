import * as React from "react";

//redux
import { useSelector } from "react-redux";

import AppNavigation from "./AppNavigation";
import AuthNavigation from "./AuthNavigation";


const Navigation = () => {

    const { authToken } = useSelector(state => state.user)

    return (
        authToken ? <AppNavigation /> : <AuthNavigation />
    );
};

export default Navigation;
