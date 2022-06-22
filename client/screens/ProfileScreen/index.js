import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Profile from "./Profile";
import EditFullName from "./EditFullName";
import EditEmail from "./EditEmail";
import EditPassword from "./EditPassword";
import EditGender from "./EditGender";
import EditWeight from "./EditWeight";
import EditHeight from "./EditHeight";
import ChangeTheme from "./ChangeTheme";

const Stack = createStackNavigator();

const ProfileScreen = () => {
    return (
        <Stack.Navigator
            initialRouteName="UserAuth"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="MainProfile" component={Profile} />

            <Stack.Screen name="EditFullName" component={EditFullName} />

            <Stack.Screen name="EditEmail" component={EditEmail} />

            <Stack.Screen name="EditPassword" component={EditPassword} />

            <Stack.Screen name="EditGender" component={EditGender} />

            <Stack.Screen name="EditWeight" component={EditWeight} />

            <Stack.Screen name="EditHeight" component={EditHeight} />

            <Stack.Screen name="ChangeTheme" component={ChangeTheme} />
        </Stack.Navigator>
    );
};

export default ProfileScreen;
