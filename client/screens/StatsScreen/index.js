import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Stats from "./Stats";
import History from "./History";
import HistoryEntry from "./HistoryEntry";

const Stack = createStackNavigator();

const StatsScreen = () => {
    return (
        <Stack.Navigator
            initialRouteName="Stats"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="MainStats" component={Stats} />

            <Stack.Screen name="History" component={History} />

            <Stack.Screen name="HistoryEntry" component={HistoryEntry} />


        </Stack.Navigator>
    );
};

export default StatsScreen;
