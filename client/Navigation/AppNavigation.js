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
import ProfileScreen from "../screens/ProfileScreen/index";
import TabBar from "../components/TabBar.js";


const Tab = createBottomTabNavigator();

const AppNavigation = () => {
    const gender = useSelector(state => state.user.userInfo.gender)
    const startDate = useSelector(state => state.trackingSession.startDate)
    const theme = useTheme()


    const tabBarRender = React.useCallback(({ state, descriptors, navigation }) => <TabBar state={state} descriptors={descriptors} navigation={navigation} theme={theme} />, [theme]) 

    if (!gender) return <CompleteRegistrationScreen />;

    else return (
        <Tab.Navigator
            tabBar={tabBarRender}
            initialRouteName="Map"
            screenOptions={{
                headerShown: false,
                lazy: true, //render only when pressed,
            }}
            backBehavior='history'
        >
            {!startDate && <Tab.Screen name="Stats" component={StatsScreen} options={{tabBarLabel: 'Progressi'}} />}

            <Tab.Screen name="Map" component={MapScreen} options={{tabBarLabel: 'Attività'}} />

            {!startDate && <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarLabel: 'Profilo'}} />}
        </Tab.Navigator>
    );
};



export default AppNavigation;
