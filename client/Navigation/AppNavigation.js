import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";
import * as Moti from 'moti'

//redux
import { useSelector } from "react-redux";

import { useTheme } from "../providers/theme.provider.js";


import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CompleteRegistrationScreen from "../screens/CompleteRegistrationScreen.js";
import MapScreen from "../screens/MapScreen/";
import StatsScreen from "../screens/StatsScreen/";
import ProfileScreen from "../screens/ProfileScreen/";
import TabBar from "../components/TabBar.js";

import { fakeUser } from "../utils/";



const Tab = createBottomTabNavigator();

const AppNavigation = () => {
    //const userInfo = useSelector(state => state.user.userInfo)
    const userInfo = React.useRef(fakeUser.userInfo).current;
    const startDate = useSelector(state => state.trackingSession.startDate)

    if (!userInfo.gender) return <CompleteRegistrationScreen />;

    const theme = useTheme()

    const tabBarRender = React.useCallback(({ state, descriptors, navigation }) => <TabBar state={state} descriptors={descriptors} navigation={navigation} theme={theme} />, []) 

    return (
        <Tab.Navigator
            tabBar={tabBarRender}
            initialRouteName="Map"
            screenOptions={{
                headerShown: false,
                lazy: true, //render only when pressed,
            }}
            backBehavior={!startDate ? 'history' : 'none'}
        >
            <Tab.Screen name="Stats" component={StatsScreen} options={{tabBarLabel: 'Progressi'}} />

            <Tab.Screen name="Map" component={MapScreen} options={{tabBarLabel: 'Attività'}} />

            <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarLabel: 'Profilo'}} />
        </Tab.Navigator>
    );
};



export default AppNavigation;
