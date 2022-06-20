import * as React from "react";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as RN from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { initialState, reducer } from "./reducer";
import {
    LOCATION_ERROR,
    RESET_LOCATION_ERROR,
    UPDATE_TRACKING_INFO,
} from "./actions";
import {
    BACKGROUND_LOCATION_TASK,
    setDispatch,
    setState,
} from "./backgroundTask";

export const SESSION_KEY_IN_STORAGE = "SESSION_KEY_IN_STORAGE";
export const SAVED_TIME_KEY_IN_STORAGE = "SAVED_TIME_KEY_IN_STORAGE"

const useLocation = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    setDispatch(dispatch); //pass to the background task the dispatcher
    //update background task state
    React.useEffect(() => {
        setState(state);
    }, [state]);

    const appState = React.useRef(RN.AppState.currentState);

   

   

   

    //save in the local storage the current date to retrive later
    const recordStartTime = async () => {
        try {
            const now = new Date();
            await AsyncStorage.setItem("SAVED_TIME_KEY_IN_STORAGE", now.toISOString());
        } catch (err) {
            console.log(err);
        }
    };


    //calculate the elapsed time from the one saved in the local storage
    const getElapsedTime = async () => {
        try {
            const startTime = await AsyncStorage.getItem("SAVED_TIME_KEY_IN_STORAGE");
            const now = new Date();
            return now.getTime() - new Date(Date.parse(startTime)).getTime();
        } catch (err) {
            console.log(err);
        }
    };

    // //handle passing from foreground to background when the tracking is active
    // const handleAppStateChange = async (nextAppState) => {
    //     if (
    //         appState.current.match(/inactive|background/) && //we were in background and now active
    //         nextAppState === "active"
    //     ) {
    //         const sessionInStorage = await AsyncStorage.getItem(
    //             SESSION_KEY_IN_STORAGE
    //         );
    //         if (sessionInStorage) {
    //             //if there was a session saved, retrive the tracking info
    //             const { trackingInfo: trackingInfoSaved } =
    //                 JSON.parse(sessionInStorage);
    //             const elapsedTime = await getElapsedTime(); //calculate elapsed time from the last appstate change
    //             trackingInfoSaved.time += elapsedTime;
    //             dispatch({
    //                 type: UPDATE_TRACKING_INFO,
    //                 payload: trackingInfoSaved,
    //             });

    //             await AsyncStorage.removeItem(SESSION_KEY_IN_STORAGE);
    //         }
    //     } else if (
    //         appState.current === "active" &&
    //         nextAppState.match(/inactive|background/) //we were in in foreground and now we are going in background
    //     ) {
    //         const stateToSave = JSON.stringify(state);
    //         await recordStartTime();
    //         await AsyncStorage.setItem(SESSION_KEY_IN_STORAGE, stateToSave);
    //         setDispatch(null)
    //         setState(null)
    //     }
    //     appState.current = nextAppState;
    // };

    





    // //add the listener
    // React.useEffect(() => {
    //     let subscription;
        
    //     if (state.trackingActive)
    //         subscription = RN.AppState.addEventListener("change", handleAppStateChange);
    //     return () =>
    //         subscription?.remove()
    // }, [state.trackingActive]);

    return [
        state,
        dispatch,
        requestPermissions,
        startBackgroundUpdate,
        stopBackgroundUpdate,
        isGPSEnabled,
    ];
};

export default useLocation;
