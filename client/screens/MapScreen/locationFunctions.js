import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";


import { store } from '../../store/'
import { UPDATE_TRACKING_INFO } from "../../actions";
import { calcCalories, calcDistance, fakeUser } from "../../utils";

const BACKGROUND_LOCATION_TASK = "BACKGROUND_LOCATION_TASK";

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
        timeInterval: 1000,
        foregroundService: {
            notificationTitle: "Running App",
            notificationBody: "Tracciamento attività fisica in corso",
        },
    });
};

// Stop location tracking in background
export const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        BACKGROUND_LOCATION_TASK
    );
    if (hasStarted) {
        await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
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
        const {altitude, latitude, longitude, speed: speedMeterSeconds, elevation, accuracy} = locationData.coords;
        const location = {
            latitude,
            longitude
        }
        const globalState = store.getState();

        const trackingState = globalState.trackingSession;
        //const user = globalState.user;
        const user = fakeUser

        //the app is the foreground
        if (!trackingState.inBackground) {
            if(!trackingState.trackingActive) {   //if the tracking is not active, update only this informations
                store.dispatch({type: UPDATE_TRACKING_INFO, payload: {currentLocation: location}})
            } else {
                const lastPos = trackingState.history.length > 0 ? trackingState.history[trackingState.history.length - 1] : location
                const deltaDistance = calcDistance(location, lastPos)
                const distance = (deltaDistance + trackingState.distance)
                const averageSpeed = trackingState.time > 0 ? distance / trackingState.time : 0
                const calories = calcCalories(user.userInfo.weight, distance);
                const speed = speedMeterSeconds / 3.6 //from m/s to km/s
                const payload = {
                    location,
                    history: [...trackingState.history, location],
                    elevation,
                    speed,
                    distance,
                    averageSpeed,
                    currentLocation: location,
                    calories,
                    altitude
                }
                store.dispatch({type: UPDATE_TRACKING_INFO, payload})
            }

        } else { //the app is the background

        }
    }
});