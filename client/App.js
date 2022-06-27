// import AsyncStorage from '@react-native-async-storage/async-storage';
// AsyncStorage.clear()

import "react-native-gesture-handler";
import "react-native-reanimated";

//react
import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";

//expo
import * as ScreenOrientation from "expo-screen-orientation";
import * as TaskManager from 'expo-task-manager'
import {StatusBar} from 'expo-status-bar'

//navigation
import { NavigationContainer } from "@react-navigation/native";

//redux
import { Provider as ReduxProvider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage/";

import { ThemeContext, ThemeProvider } from "./providers/theme.provider";

import Navigation from "./Navigation";

//background task
import { calcCalories, calcDistance } from "./utils";
import { BACKGROUND_LOCATION_TASK, TRACKING_SESSION_KEY } from "./utils/constants";
import { UPDATE_TRACKING_INFO } from "./redux/actions";

export default function App() {
    React.useEffect(() => {
        (async () =>
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT
            ))();
    }, []);

    return (
        <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider>
                    <ThemeContext.Consumer>
                        {(theme) => (
                            <RN.View
                                style={[
                                    styles.containerUnderStatusBar,
                                    {
                                        backgroundColor:
                                            theme.colors.background,
                                    },
                                ]}
                            >
                                <Paper.Provider theme={theme}>
                                    <NavigationContainer theme={theme}>
                                        <Navigation />

                                        <StatusBar style={theme.dark ? "light" : "dark"} translucent backgroundColor="transparent" />
                                    </NavigationContainer>
                                </Paper.Provider>

                            </RN.View>
                        )}
                    </ThemeContext.Consumer>
                </ThemeProvider>
            </PersistGate>
        </ReduxProvider>
    );
}

// Define the background task for location tracking
TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }) => {
    if (error) {
        console.log(error);
        return;
    }
    if (data) {
        // Extract location coordinates from data
        const { locations } = data;
        const locationData = locations[0];
        const {altitude, latitude, longitude, speed: speedMeterSeconds, accuracy} = locationData.coords;
        const timestamp = locationData.timestamp;
        const location = {
            latitude,
            longitude,
            timestamp: new Date(timestamp),
            accuracy
        }

        const globalState = store.getState(); //get the redux state
        const trackingState = globalState.trackingSession; //extract the trackingsession
        const user = globalState.user; //extract the user
        const trackingStateSaved = await AsyncStorage.getItem(TRACKING_SESSION_KEY); //get the tracking state eventually saved

        //the app is the foreground
        if (!trackingStateSaved) {
            if(!trackingState.trackingActive) {   //if the tracking is not active, update only this information
                store.dispatch({type: UPDATE_TRACKING_INFO, payload: {currentLocation: location}})
            } else {
                const lastLocation = trackingState.history[trackingState.numOfPauses]?.length > 0 ? trackingState.history[trackingState.numOfPauses][trackingState.history[trackingState.numOfPauses].length - 1] : location
                const deltaDistance = calcDistance(location, lastLocation)
                const distance = (deltaDistance + trackingState.distance)
                const averageSpeed = trackingState.time > 0 ? distance / (trackingState.time / 3.6e+6) : 0
                const calories = calcCalories(user.userInfo.weight, distance);
                const speed = speedMeterSeconds * 3.6 //from m/s to km/s
                const pace = speed > 0 ? 60 / speed : 0  // m / km
                const averagePace = averageSpeed > 0 ? 60 / averageSpeed : 0
                const maxSpeed = speed > trackingState.maxSpeed ? speed : trackingState.maxSpeed
                const currentLocation = location;
                let history = trackingState.history;
                if(history[trackingState.numOfPauses]?.length > 0) {
                    history[trackingState.numOfPauses].push(location)
                } else {
                    history[trackingState.numOfPauses] = [location]
                }
                const payload = {
                    history,
                    altitude,
                    speed,
                    distance,
                    averageSpeed,
                    currentLocation,
                    calories,
                    altitude,
                    pace,
                    averagePace,
                    maxSpeed 
                }
                store.dispatch({type: UPDATE_TRACKING_INFO, payload})
            }

        } else { //the app is the background do the same but in storage
            const trackingState = JSON.parse(trackingStateSaved)
            if(trackingState.trackingActive) {
                const lastLocation = trackingState.history[trackingState.numOfPauses]?.length > 0 ? trackingState.history[trackingState.numOfPauses][trackingState.history[trackingState.numOfPauses].length - 1] : location
                const deltaDistance = calcDistance(location, lastLocation)
                const distance = (deltaDistance + trackingState.distance)
                const averageSpeed = trackingState.time > 0 ? distance / (trackingState.time / 3.6e+6) : 0
                const calories = calcCalories(user.userInfo.weight, distance);
                const speed = speedMeterSeconds * 3.6 //from m/s to km/s
                const pace = speed > 0 ? 60 / speed : 0  // m / km
                const averagePace = averageSpeed > 0 ? 60 / averageSpeed : 0
                const maxSpeed = speed > trackingState.maxSpeed ? speed : trackingState.maxSpeed
                const currentLocation = location;
                let history = trackingState.history;
                if(history[trackingState.numOfPauses]?.length > 0) {
                    history[trackingState.numOfPauses].push(location)
                } else {
                    history[trackingState.numOfPauses] = [location]
                }
                const payload = {
                    ...trackingState,
                    history,
                    altitude,
                    speed,
                    distance,
                    averageSpeed,
                    currentLocation,
                    calories,
                    altitude,
                    pace,
                    averagePace,
                    maxSpeed
                }
    
                await AsyncStorage.setItem(TRACKING_SESSION_KEY, JSON.stringify(payload));
            }
           
        }
    }
});

const styles = RN.StyleSheet.create({
    containerUnderStatusBar: {
        flex: 1,
        paddingTop: RN.StatusBar.currentHeight
    },
});
