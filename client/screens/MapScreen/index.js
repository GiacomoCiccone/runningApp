import * as Location from "expo-location";
import * as React from "react";
import * as RN from "react-native";

//redux
import { useDispatch, useSelector } from "react-redux/";
import AsyncStorage from "@react-native-async-storage/async-storage/";

import axios from "axios";
import SnackBar from "../../components/SnackBar";
import {
    LOCATION_ERROR, REHYDRATE_SESSION_FROM_STORAGE, RESET_LOCATION_ERROR, RESET_TRACKING_SESSION, UPDATE_TRACKING_INFO
} from "../../redux/actions";
import { sendTrackingInfo } from "../../redux/actions/trackingSessionActions";
import { store } from "../../redux/store";
import { WHEATER_API_KEY } from "../../utils/.env";
import BottomBanner from "./BottomBanner";
import {
    requestPermissions,
    startBackgroundUpdate,
    stopBackgroundUpdate,
    TRACKING_SESSION_KEY
} from "./locationFunctions";
import Map from "./Map";
import ModalSummary from "./ModalSummary";
import PermissionModal from "./PermissionModal";
import TopBanner from "./TopBanner";

const MapScreen = () => {
    //redux
    const dispatch = useDispatch();
    const trackingActive = useSelector(
        (state) => state.trackingSession.trackingActive
    );
    const userId = useSelector((state) => state.user.userInfo._id);
    const endDate = useSelector((state) => state.trackingSession.endDate);
    const locationError = useSelector((state) => state.trackingSession.error);

    const appState = React.useRef(RN.AppState.currentState); //track app state change
    const [isGPSEnabled, setGPSisEnabled] = React.useState(false); //track information about gps

    const [fullSizeBanner, setFullSizeBanner] = React.useState(true);   //is the top banner full size?
    const [mapType, setMapType] = React.useState("standard");   //map style (satellite, standard, etc)
    const [centerToLocation, setCenterToLocation] = React.useState(true);   //should track the user position on the map?
    const [showPermissionModal, setShowPermissionModal] = React.useState(false);

    //asking the user for the permissions with a message
    const closePermissionModal = React.useCallback(async (askPermissions) => {
        if (askPermissions) {
            //user didnt press skip...
            try {
                await requestPermissions();
                await startBackgroundUpdate();
            } catch (error) {
                dispatch({ type: LOCATION_ERROR, payload: error.message });
            }
        }
        setShowPermissionModal(false);
    }, []);
    const resetError = React.useCallback(() => {
        dispatch({ type: RESET_LOCATION_ERROR });
    }, []);

    const closeSummaryModal = React.useCallback(() => {
            const {
                currentLocation,
                heading,
                error,
                numOfPauses,
                trackingActive,
                pace,
                speed,
                altitude,
                weather,
                ...info
            } = store.getState().trackingSession; //send only useful information
            const body = {
                ...info,
                history: info.history.map((subHistory) =>
                    subHistory.map((loc) => {
                        return {
                            latitude: loc.latitude,
                            longitude: loc.longitude,
                        };
                    })
                ),
                user: userId,
            };

            dispatch(sendTrackingInfo(body));   //send to backend
    }, [userId])

    //function to retrive the saved information, if they exist
    const retriveSavedInformation = async () => {
        const trackingSessionInStorage = await AsyncStorage.getItem(
            TRACKING_SESSION_KEY
        );
        if (trackingSessionInStorage) {
            //if there was a session saved, retrive the tracking info
            const { backgroundAt, ...trackingInfoSaved } = JSON.parse(
                trackingSessionInStorage
            );
            const now = new Date();
            if (trackingInfoSaved.trackingActive)
                trackingInfoSaved.time =
                    trackingInfoSaved.time +
                    (now.getTime() - new Date(backgroundAt).getTime()); //add the time passed only if tracking was active
            dispatch({
                type: REHYDRATE_SESSION_FROM_STORAGE,
                payload: trackingInfoSaved,
            });

            await AsyncStorage.removeItem(TRACKING_SESSION_KEY);    //delete the entry in the storage
        } else {
            //else start the background update
            await requestPermissions();
            await startBackgroundUpdate();
        }
    };

    //handle passing from foreground to background when the tracking is active
    const handleAppStateChange = async (nextAppState) => {
        if (
            appState.current.match(/inactive|background/) && //we were in background and now active
            nextAppState === "active"
        ) {
            await retriveSavedInformation();
        } else if (
            appState.current === "active" &&
            nextAppState.match(/inactive|background/) //we were in in foreground and now we are going in background
        ) {
            const trackingSession = store.getState().trackingSession; //retrive the tracking info
            if (trackingSession.startDate) {
                //there is a tracking session
                trackingSession.backgroundAt = new Date(); //save the current date for later
                const stateToSave = JSON.stringify(trackingSession);
                await AsyncStorage.setItem(TRACKING_SESSION_KEY, stateToSave); //save info in the storage
            } else {
                await stopBackgroundUpdate(); //otherwise we can stop the background task...
            }
        }
        appState.current = nextAppState;
    };

    //on first render show a modal before asking for the permissions, if not already granted
    React.useEffect(() => {
        (async () => {
            try {
                await requestPermissions();
                await startBackgroundUpdate();
            } catch (error) {
                dispatch({
                    type: RESET_TRACKING_SESSION,
                });
                await stopBackgroundUpdate();
                setShowPermissionModal(true);
            }
        })();
    }, []);

    //handle the same way as the return from the background in the first render
    React.useEffect(() => {
        (async () => {
            await retriveSavedInformation();
        })();
    }, []);

    //watch constantly if gps enabled + first time
    React.useEffect(() => {
        const interval = setInterval(async () => {
            const isGPSEnabled = await Location.hasServicesEnabledAsync();
            if (!isGPSEnabled && trackingActive) {
                //if the traking was on and no GPS set tracking off and show error
                dispatch({
                    type: LOCATION_ERROR,
                    payload: "Segnale GPS disabilitato",
                });
            }
            setGPSisEnabled(isGPSEnabled);
        }, 1000);

        (async () => {
            const isGPSEnabled = await Location.hasServicesEnabledAsync();
            setGPSisEnabled(isGPSEnabled);
        })();

        return () => clearInterval(interval);
    }, [trackingActive]);

    //watch the heading
    React.useEffect(() => {
        (async () => {
            Location.watchHeadingAsync((data) => {
                const currentHeading = store.getState().trackingSession.heading;
                dispatch({
                    type: UPDATE_TRACKING_INFO,
                    payload: {
                        heading: (data.magHeading + currentHeading) / 2,
                    }, //smoother heading average with last value
                });
            });
        })();
    }, []);

    //update time every second by 1000 milliseconds
    React.useEffect(() => {
        let interval;
        if (trackingActive) {
            interval = setInterval(() => {
                const currentTime = store.getState().trackingSession.time;
                dispatch({
                    type: UPDATE_TRACKING_INFO,
                    payload: { time: currentTime + 1000 },
                }); //add 1000 milliseconds to the time
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [trackingActive]);

    //add the listener for background switch
    React.useEffect(() => {
        const subscription = RN.AppState.addEventListener(
            "change",
            handleAppStateChange
        );
        return () => subscription.remove();
    }, []);

    //get the weather every 30 seconds (max 60 per minute free api)
    React.useEffect(() => {
        const getWeather = async () => {
            try {
                const currentLocation =
                    store.getState().trackingSession.currentLocation;
                if (currentLocation) {
                    const { data } = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&appid=${WHEATER_API_KEY}&units=metric`
                    );
                    const { temp } = data.main;
                    const { icon } = data.weather[0];
                    const payload = {
                        weather: {
                            temp,
                            icon,
                        },
                    };
                    dispatch({ type: UPDATE_TRACKING_INFO, payload });
                }
            } catch (error) {
                console.log(error);
            }
        };

        const interval = setInterval(getWeather, 30000);
        const timeout = setTimeout(getWeather, 5000); //after 5 seconds should have the location so ask for the weather to show fast

        return () => clearInterval(interval) || clearTimeout(timeout);
    }, []);

    return (
        <RN.SafeAreaView style={styles.safeContainer}>
            <SnackBar
                visible={locationError}
                onDismiss={resetError}
                action={{
                    label: "ok",
                    onPress: resetError,
                }}
                type="error"
            >
                {locationError}
            </SnackBar>

            <TopBanner
                isGPSEnabled={isGPSEnabled}
                fullSize={fullSizeBanner}
                setFullSize={setFullSizeBanner}
            />

            <Map
                setFullSize={setFullSizeBanner}
                setCenterToLocation={setCenterToLocation}
                centerToLocation={centerToLocation}
                mapType={mapType}
            />

            <BottomBanner
                fullSize={fullSizeBanner}
                changeMapType={setMapType}
                setCenterToLocation={setCenterToLocation}
                centerToLocation={centerToLocation}
                setFullSize={setFullSizeBanner}
            />

            <PermissionModal
                visible={showPermissionModal}
                onDismiss={closePermissionModal}
                transparent
            />

            <ModalSummary
                visible={endDate}
                onDismiss={closeSummaryModal}
            />
        </RN.SafeAreaView>
    );
};

const styles = RN.StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
});

export default MapScreen;
