import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";

import { useTheme } from "../../providers/theme.provider";

import MapView, * as ReactMap from "react-native-maps";
import mapStyleDark from "../../common/MapStyle/mapStyleDark.json";
import mapStyleLight from "../../common/MapStyle/mapStyleLight.json";
import AppHeader from "../../components/AppHeader";
import CircleMarker from "../../components/CircleMarker";
import Spacing from "../../components/Spacing";
import { msToHMS } from "../../utils";

const HistoryEntry = ({ navigation, route }) => {
    const theme = useTheme();
    const { trackingSession } = route.params;
    if (!trackingSession) navigation.goBack();

    const [mapReady, setMapReady] = React.useState(false);
    const mapRef = React.useRef();

    const onMapReady = React.useCallback(() => {
        setMapReady(true);
        let coordinates = [];
        trackingSession.history.forEach((subHistory) => {
            coordinates = [...coordinates, ...subHistory];
        });
        mapRef.current.fitToCoordinates(coordinates, {
            edgePadding: { top: 10, right: 10, bottom: 10, left: 10 },
            animated: true,
        });
    }, []);


    return (
        <RN.SafeAreaView style={styles.safeContainer}>
            <AppHeader
                title={`Corsa del ${new Date(
                    trackingSession.startDate
                ).toLocaleDateString("it-IT")}`}
            />

            <RN.View style={styles.contentContainer}>
                <RN.View
                    style={{
                        height: 200,
                        backgroundColor: theme.colors.background,
                        flexDirection: "row",
                    }}
                >
                    <RN.View
                        style={{
                            marginLeft: theme.spacing.lg,
                            flex: 1,
                            height: "100%",
                            justifyContent: "center",
                        }}
                    >
                        <RN.View>
                            <Paper.Text
                                style={{
                                    fontFamily: "Rubik-Medium",
                                    fontSize: theme.fontSize.xl,
                                }}
                            >
                                {msToHMS(trackingSession.time)}
                            </Paper.Text>

                            <Spacing horizontal size="xs" />

                            <Paper.Text
                                style={{
                                    fontSize: theme.fontSize.xs,
                                    color: theme.colors.grey,
                                }}
                            >
                                Durata
                            </Paper.Text>
                        </RN.View>

                        <Spacing horizontal size="xl" />

                        <RN.View>
                            <Paper.Text
                                style={{
                                    fontFamily: "Rubik-Medium",
                                    fontSize: theme.fontSize.xl,
                                }}
                            >
                                {trackingSession.maxSpeed.toFixed(2)}

                                <Paper.Text
                                    style={{ fontSize: theme.fontSize["2xs"] }}
                                >
                                    {" "}
                                    km/h
                                </Paper.Text>
                            </Paper.Text>

                            <Spacing horizontal size="xs" />

                            <Paper.Text
                                style={{
                                    fontSize: theme.fontSize.xs,
                                    color: theme.colors.grey,
                                }}
                            >
                                Velocità massima
                            </Paper.Text>
                        </RN.View>

                        <Spacing horizontal size="xl" />

                        <RN.View>
                            <Paper.Text
                                style={{
                                    fontFamily: "Rubik-Medium",
                                    fontSize: theme.fontSize.xl,
                                }}
                            >
                                {trackingSession.calories.toFixed(0)}

                                <Paper.Text
                                    style={{ fontSize: theme.fontSize["2xs"] }}
                                >
                                    {" "}
                                    kcal
                                </Paper.Text>
                            </Paper.Text>

                            <Spacing horizontal size="xs" />

                            <Paper.Text
                                style={{
                                    fontSize: theme.fontSize.xs,
                                    color: theme.colors.grey,
                                }}
                            >
                                Calorie
                            </Paper.Text>
                        </RN.View>
                    </RN.View>

                    <RN.View
                        style={{
                            marginRight: theme.spacing.lg,
                            flex: 1,
                            height: "100%",
                            justifyContent: "center",
                        }}
                    >
                        <RN.View>
                            <Paper.Text
                                style={{
                                    fontFamily: "Rubik-Medium",
                                    fontSize: theme.fontSize.xl,
                                }}
                            >
                                {trackingSession.averagePace.toFixed(2)}

                                <Paper.Text
                                    style={{ fontSize: theme.fontSize["2xs"] }}
                                >
                                    {" "}
                                    m/km
                                </Paper.Text>
                            </Paper.Text>

                            <Spacing horizontal size="xs" />

                            <Paper.Text
                                style={{
                                    fontSize: theme.fontSize.xs,
                                    color: theme.colors.grey,
                                }}
                            >
                                Passo medio
                            </Paper.Text>
                        </RN.View>

                        <Spacing horizontal size="xl" />

                        <RN.View>
                            <Paper.Text
                                style={{
                                    fontFamily: "Rubik-Medium",
                                    fontSize: theme.fontSize.xl,
                                }}
                            >
                                {trackingSession.averageSpeed.toFixed(2)}

                                <Paper.Text
                                    style={{ fontSize: theme.fontSize["2xs"] }}
                                >
                                    {" "}
                                    km/h
                                </Paper.Text>
                            </Paper.Text>

                            <Spacing horizontal size="xs" />

                            <Paper.Text
                                style={{
                                    fontSize: theme.fontSize.xs,
                                    color: theme.colors.grey,
                                }}
                            >
                                Velocità media
                            </Paper.Text>
                        </RN.View>

                        <Spacing horizontal size="xl" />

                        <RN.View>
                            <Paper.Text
                                style={{
                                    fontFamily: "Rubik-Medium",
                                    fontSize: theme.fontSize.xl,
                                }}
                            >
                                {trackingSession.distance.toFixed(2)}

                                <Paper.Text
                                    style={{ fontSize: theme.fontSize["2xs"] }}
                                >
                                    {" "}
                                    km
                                </Paper.Text>
                            </Paper.Text>

                            <Spacing horizontal size="xs" />

                            <Paper.Text
                                style={{
                                    fontSize: theme.fontSize.xs,
                                    color: theme.colors.grey,
                                }}
                            >
                                Distanza
                            </Paper.Text>
                        </RN.View>
                    </RN.View>
                </RN.View>

                <MapView
                    ref={mapRef}
                    style={styles.map}
                    showsCompass={false}
                    showsMyLocationButton={false}
                    loadingEnabled
                    onMapReady={onMapReady}
                    loadingIndicatorColor={theme.colors.primary}
                    loadingBackgroundColor={theme.colors.background}
                    customMapStyle={theme.dark ? mapStyleDark : mapStyleLight}
                    provider={ReactMap.PROVIDER_GOOGLE}
                    rotateEnabled={false}
                >
                    {trackingSession.history.map((subHistory, i) => {
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

                    {trackingSession.history.map((subHistory, i) => {
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
                                    tracksViewChanges={!mapReady}
                                >
                                    <CircleMarker
                                        color={
                                            i === 0
                                                ? theme.colors.success
                                                : null
                                        }
                                    />
                                </ReactMap.Marker>

                                <ReactMap.Marker
                                    tracksViewChanges={!mapReady}
                                    anchor={{ x: 0.5, y: 0.5 }}
                                    coordinate={coordinateEnd}
                                >
                                    <CircleMarker
                                        color={
                                            i ===
                                            trackingSession.history.length - 1
                                                ? theme.colors.error
                                                : null
                                        }
                                    />
                                </ReactMap.Marker>
                            </RN.View>
                        );
                    })}
                </MapView>
            </RN.View>
        </RN.SafeAreaView>
    );
};

const styles = RN.StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
    contentContainer: {
        marginTop: 70,
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default HistoryEntry;
