import * as React from "react";
import * as RN from "react-native";
import { useTheme } from "../../providers/theme.provider";

const MARKER_WIDTH = 25;

const CircleMarker = ({ color }) => {

    const theme = useTheme()

    return (
        <>
        <RN.View style={[styles.markerWrapper, { backgroundColor: color || theme.colors.primary }]}>
           
        </RN.View>
         <RN.View style={[styles.marker, { backgroundColor: color || theme.colors.primary, borderWidth: theme.border.default }]} />
         </>
    );
};

const styles = RN.StyleSheet.create({
    marker: {
        width: MARKER_WIDTH / 2,
        aspectRatio: 1,
        borderRadius: 9999,
        position: "absolute",
        alignSelf: "center",
        top: MARKER_WIDTH / 2 - MARKER_WIDTH / 4,
        borderColor: 'white'
    },
    markerWrapper: {
        width: MARKER_WIDTH,
        aspectRatio: 1,
        borderRadius: 9999,
        opacity: 0.3,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default CircleMarker;
