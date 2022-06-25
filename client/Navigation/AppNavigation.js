import * as React from "react";

//redux
import { useSelector } from "react-redux";

import { useTheme } from "../providers/theme.provider.js";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabBar from "../components/TabBar.js";
import CompleteRegistrationScreen from "../screens/CompleteRegistrationScreen.js";
import MapScreen from "../screens/MapScreen/";
import ProfileScreen from "../screens/ProfileScreen/index";
import StatsScreen from "../screens/StatsScreen/";

const Tab = createBottomTabNavigator();

//App tab navigator
const AppNavigation = () => {
    const gender = useSelector((state) => state.user.userInfo.gender);
    const startDate = useSelector((state) => state.trackingSession.startDate);
    const theme = useTheme();

    const tabBarRender = React.useCallback(
        ({ state, descriptors, navigation }) => (
            <TabBar
                state={state}
                descriptors={descriptors}
                navigation={navigation}
                theme={theme}
            />
        ),
        [theme]
    );

    if (!gender) return <CompleteRegistrationScreen />;
    else
        return (
            <Tab.Navigator
                tabBar={tabBarRender}
                initialRouteName="Map"
                screenOptions={{
                    headerShown: false,
                    lazy: true, //render only when pressed,
                    unmountOnBlur: true,
                }}
                backBehavior="history"
            >
                {!startDate && (
                    <Tab.Screen
                        name="Stats"
                        component={StatsScreen}
                        options={{ tabBarLabel: "Progressi" }}
                    />
                )}

                <Tab.Screen
                    name="Map"
                    component={MapScreen}
                    options={{ tabBarLabel: "Attività" }}
                />

                {!startDate && (
                    <Tab.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{ tabBarLabel: "Profilo" }}
                    />
                )}
            </Tab.Navigator>
        );
};

export default AppNavigation;
