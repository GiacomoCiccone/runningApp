import * as React from "react";
import * as RN from "react-native";
import * as Location from 'expo-location'

//redux
import { useDispatch, useSelector } from "react-redux/";


import TopBanner from "./TopBanner";
import PermissionModal from "./PermissionModal";
import SnackBar from "../../components/SnackBar";
import { store } from '../../store/'
import BottomBanner from "./BottomBanner";
import { LOCATION_ERROR, START_SESSION, UPDATE_TRACKING_INFO, RESET_LOCATION_ERROR, SET_TRACKING_INACTIVE, SET_TRACKING_ACTIVE, } from "../../actions";
import { requestPermissions, startBackgroundUpdate, stopBackgroundUpdate } from "./locationFunctions";
import Map from "./Map";

const MapScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const trackingActive = useSelector(state => state.trackingSession.trackingActive)
    const locationError = useSelector(state => state.trackingSession.error)

    const appState = React.useRef(RN.AppState.currentState); //track app state change
    const [isGPSEnabled, setGPSisEnabled] = React.useState(false); //track information about gps

    const [fullSizeBanner, setFullSizeBanner] = React.useState(true);
    const [mapType, setMapType] = React.useState('standard');
    const [centerToLocation, setCenterToLocation] = React.useState(true);

    const [showPermissionModal, setShowPermissionModal] = React.useState(false);
    
    //asking the user for the permissions with a message
    const closePermissionModal = React.useCallback(
        
        async (askPermissions) => {
            if (askPermissions) {
                try {
                    await requestPermissions()
                    await startBackgroundUpdate();
                } catch (error) {
                    dispatch({type: LOCATION_ERROR, payload: error.message})
                }
                
            }
            setShowPermissionModal(false);
        },
        []
    );
    const resetError = React.useCallback(() => {
        dispatch({ type: RESET_LOCATION_ERROR });
    }, []);


    //on first render show a modal before asking for the permissions, if not already granted
    React.useEffect(() => {
        (async () => {
            const { granted: foregroundGranted } =
                await Location.getBackgroundPermissionsAsync();
            const { granted: backgroundGranted } =
                await Location.getBackgroundPermissionsAsync();
    
            if (!foregroundGranted || !backgroundGranted) {
                await stopBackgroundUpdate();
                setShowPermissionModal(true);
                return false;
            } else {
                await startBackgroundUpdate();
                return true;
            }})()
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
                const currentHeading = store.getState().trackingSession.heading
                dispatch({
                    type: UPDATE_TRACKING_INFO,
                    payload: { heading: (data.magHeading + currentHeading) / 2 }, //smoother heading
                });
            });
        })();
    }, []);

    //update time every second by 1000 milliseconds
    React.useEffect(() => {
        let interval;
        if(trackingActive) {
            interval = setInterval(() => {
                const currentTime = store.getState().trackingSession.time
                dispatch({type: UPDATE_TRACKING_INFO, payload: {time: currentTime + 1000}}) //add 1000 milliseconds to the time
            }, 1000);
        }
        return () => clearInterval(interval)
    }, [trackingActive]);

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

            <Map setFullSize={setFullSizeBanner} setCenterToLocation={setCenterToLocation} centerToLocation={centerToLocation} mapType={mapType}/>


            <BottomBanner fullSize={fullSizeBanner} changeMapType={setMapType} setCenterToLocation={setCenterToLocation} centerToLocation={centerToLocation} setFullSize={setFullSizeBanner}/>

            <PermissionModal
                visible={showPermissionModal}
                onDismiss={closePermissionModal}
                transparent
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
