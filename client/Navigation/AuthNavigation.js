import * as React from "react";


import { createStackNavigator } from "@react-navigation/stack";

import UserAuthScreen from "../screens/UserAuthScreen";
import ForgotPasswordScreen from "../screens/ForgotPassword";
import ResetPasswordScreen from "../screens/ResetPasswordScreen.js";

const Stack = createStackNavigator();

const AuthNavigation = () => {

    return (
        <Stack.Navigator
            initialRouteName="UserAuth"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="UserAuth"
                component={UserAuthScreen}
            />

            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
            />

            <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
            />
        </Stack.Navigator>
    );
};

export default AuthNavigation;