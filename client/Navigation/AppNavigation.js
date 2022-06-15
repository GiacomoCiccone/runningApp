import * as React from "react";

//redux
import { useSelector } from "react-redux";


import { createStackNavigator } from "@react-navigation/stack";

import CompleteRegistrationScreen from "../screens/CompleteRegistrationScreen.js";
import HomeScreen from "../screens/HomeScreen/index.js";

const Stack = createStackNavigator();

const AppNavigation = () => {

    const {userInfo} = useSelector(state => state.user)

    return (
        <Stack.Navigator
            initialRouteName={userInfo.gender ? "Home" : "CompleteRegistration"}
            screenOptions={{
                headerShown: false,
            }}
        >

            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />

            {!userInfo.gender && <Stack.Screen
                name="CompleteRegistration"
                component={CompleteRegistrationScreen}
            />}
        </Stack.Navigator>
    );
};

export default AppNavigation;