import * as React from "react";
import * as RN from "react-native";
import MapView, * as ReactMap from "react-native-maps";

//redux
import { useSelector } from "react-redux";

import { useTheme } from "../../providers/theme.provider";

import UserMarker from "./UserMarker";

import mapStyleDark from "../../common/MapStyle/mapStyleDark.json";
import mapStyleLight from "../../common/MapStyle/mapStyleLight.json";
import CircleMarker from "../../components/CircleMarker";

const Map = ({
    setFullSize,
    mapType,
    centerToLocation,
    setCenterToLocation,
}) => {
    const theme = useTheme();

    const currentLocation = useSelector(
        (state) => state.trackingSession.currentLocation
    );
    const heading = useSelector((state) => state.trackingSession.heading); //rotate the user location marker based on heading value
    const history = useSelector((state) => state.trackingSession.history);
    const numOfPauses = useSelector(
        (state) => state.trackingSession.numOfPauses
    );

    const [mapReady, setMapReady] = React.useState(false);

    const setFullSizeFalse = React.useCallback(() => {
        setFullSize(false);
    }, []);

    const onMapReady = React.useCallback(() => {
        setMapReady(true);
    }, []);

    React.useEffect(() => {
        if (!currentLocation) setMapReady(false);
    }, [currentLocation]);

    return (
        <RN.View style={styles.mapContainer}>
            {currentLocation ? (
                <MapView
                    initialRegion={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                        latitudeDelta: 0.002,
                        longitudeDelta: 0.002,
                    }}
                    region={
                        centerToLocation
                            ? {
                                  latitude: currentLocation.latitude,
                                  longitude: currentLocation.longitude,
                                  latitudeDelta: 0.002,
                                  longitudeDelta: 0.002,
                              }
                            : null
                    }
                    style={styles.map}
                    showsCompass={false}
                    showsMyLocationButton={false}
                    loadingEnabled
                    loadingIndicatorColor={theme.colors.primary}
                    loadingBackgroundColor={theme.colors.background}
                    onMapReady={onMapReady}
                    onPress={setFullSizeFalse}
                    onTouchStart={() => setCenterToLocation(false)}
                    customMapStyle={theme.dark ? mapStyleDark : mapStyleLight}
                    provider={ReactMap.PROVIDER_GOOGLE}
                    mapType={mapType}
                    rotateEnabled={false}
                >
                    {currentLocation && (
                        <ReactMap.Marker
                            anchor={{
                                x: 0.5,
                                y: 0.5,
                            }}
                            tappable={false}
                            rotation={heading}
                            coordinate={{
                                latitude: currentLocation.latitude,
                                longitude: currentLocation.longitude,
                            }}
                        >
                            <UserMarker />
                        </ReactMap.Marker>
                    )}
                    {history.map((subHistory, i) => {
                        if (!subHistory) return;
                        return (
                            <ReactMap.Polyline
                                key={"polyline-" + i}
                                lineCap="round"
                                fillColor={theme.colors.primary}
                                strokeColor={theme.colors.primary}
                                strokeWidth={theme.border["2xl"]}
                                coordinates={subHistory.map((location) => {
                                    return {
                                        longitude: location.longitude,
                                        latitude: location.latitude,
                                    };
                                })}
                            />
                        );
                    })}

                    {history.map((subHistory, i) => {
                        if (!subHistory) return;

                        const coordinateStart = {
                            latitude: subHistory[0].latitude,
                            longitude: subHistory[0].longitude,
                        };

                        const coordinateEnd = {
                            latitude:
                                subHistory[subHistory.length - 1].latitude,
                            longitude:
                                subHistory[subHistory.length - 1].longitude,
                        };
                        return (
                            <RN.View key={"marker-" + i}>
                                <ReactMap.Marker
                                    anchor={{ x: 0.5, y: 0.5 }}
                                    coordinate={coordinateStart}
                                    tappable={false}
                                    tracksViewChanges={!mapReady}
                                >
                                    <CircleMarker />
                                </ReactMap.Marker>

                                {numOfPauses > i && (
                                    <ReactMap.Marker
                                        tracksViewChanges={!mapReady}
                                        anchor={{ x: 0.5, y: 0.5 }}
                                        coordinate={coordinateEnd}
                                        tappable={false}
                                    >
                                        <CircleMarker />
                                    </ReactMap.Marker>
                                )}
                            </RN.View>
                        );
                    })}
                </MapView>
            ) : (
                <RN.View
                    style={[
                        styles.map,
                        { backgroundColor: theme.colors.background },
                    ]}
                />
            )}
        </RN.View>
    );
};

const styles = RN.StyleSheet.create({
    mapContainer: {
        width: "100%",
        height: "110%",
        position: "absolute",
        bottom: "-10%",
    },
    map: {
        flex: 1,
    },
});

export default Map;
