import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage/";

import { store } from '../../redux/store'
import { UPDATE_TRACKING_INFO } from "../../redux/actions";
import { calcCalories, calcDistance } from "../../utils";

const BACKGROUND_LOCATION_TASK = "BACKGROUND_LOCATION_TASK";
export const TRACKING_SESSION_KEY = "TRACKING_SESSION_KEY"

// Request permissions
export const requestPermissions = async () => {
    const { granted: foregroundGranted } =
        await Location.requestForegroundPermissionsAsync();
    //foreground permission not granted
    if (!foregroundGranted) {
        throw Error("Permessi posizione non concessi");
    }
    const { granted: backgroundGranted } =
        await Location.requestBackgroundPermissionsAsync();

    //background permission not granted
    if (!backgroundGranted) {
        throw Error("Permessi posizione background non concessi");
    }
};

// Start location tracking in background
export const startBackgroundUpdate = async () => {
    // Don't track position if permission is not granted
    const { granted } = await Location.getBackgroundPermissionsAsync();
    if (!granted) {
        throw Error("Permessi posizione background non concessi");
    }

    // Make sure the task is defined otherwise do not start tracking
    const isTaskDefined = TaskManager.isTaskDefined(BACKGROUND_LOCATION_TASK);

    if (!isTaskDefined) {
        throw Error("Si è verificato un errore. Prova a reinstallare l'app.");
    }

    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        BACKGROUND_LOCATION_TASK
    );
    if (hasStarted) {
        console.log("Already started");
        return;
    }

    await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
        activityType: Location.ActivityType.Fitness,
        accuracy: Location.Accuracy.BestForNavigation,
        showsBackgroundLocationIndicator: true,
        deferredUpdatesInterval: 1000,
        foregroundService: {
            notificationTitle: "Running App",
            notificationBody: "Tracciamento attività fisica in corso",
        },
    });

    console.log("Tracking started")
};

    

// Stop location tracking in background
export const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        BACKGROUND_LOCATION_TASK
    );
    if (hasStarted) {
        await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
        console.log("Background task stopped")
    }
};


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

        const globalState = store.getState();

        const trackingState = globalState.trackingSession;
        const trackingStateSaved = await AsyncStorage.getItem(TRACKING_SESSION_KEY);
        const user = globalState.user;

        //the app is the foreground
        if (!trackingStateSaved) {
            if(!trackingState.trackingActive) {   //if the tracking is not active, update only this informations
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