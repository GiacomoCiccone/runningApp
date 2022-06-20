import * as React from "react";
import * as RN from "react-native";
import MapView, * as ReactMap from "react-native-maps";

//redux
import { useSelector } from "react-redux";

import { useTheme } from "../../providers/theme.provider";

import UserMarker from "./UserMarker";

import mapStyleLight from "../../common/MapStyle/mapStyleLight.json";
import mapStyleDark from "../../common/MapStyle/mapStyleDark.json";


const Map = ({setFullSize}) => {

    const theme = useTheme()

    const currentLocation = useSelector((state) => state.trackingSession.currentLocation);
    const heading = useSelector(state => state.trackingSession.heading)


    const [mapReady, setMapReady] = React.useState(false);

    const setFullSizeFalse = React.useCallback(() => {
        setFullSize(false)
    }, [])

    const onMapReady = React.useCallback(() => {
        setMapReady(true);
    }, []);

    return (
        <MapView
            showsCompass={false}
            showsMyLocationButton={false}
            loadingEnabled
            loadingIndicatorColor={theme.colors.primary}
            loadingBackgroundColor={theme.colors.background}
            onMapReady={onMapReady}
            onPress={setFullSizeFalse}
            customMapStyle={theme.dark ? mapStyleDark : mapStyleLight}
            style={styles.map}
            provider="google"
        >
            {currentLocation && (
                <ReactMap.Marker
                    anchor={{
                        x: 0.5,
                        y: 0.5,
                    }}
                    rotation={heading}
                    coordinate={currentLocation}
                >
                    <UserMarker />
                </ReactMap.Marker>
            )}
        </MapView>
    );
};

const styles = RN.StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
});

export default Map;
