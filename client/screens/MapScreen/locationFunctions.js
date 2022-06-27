import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { BACKGROUND_LOCATION_TASK } from "../../utils/constants";



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
        // foregroundService: {
        //     notificationTitle: "Running App",
        //     notificationBody: "Tracciamento attività fisica in corso",
        // },
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


