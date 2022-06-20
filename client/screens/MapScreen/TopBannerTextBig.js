import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";

//redux
import { useSelector } from "react-redux";

import { useTheme } from "../../providers/theme.provider";

import Spacing from "../../components/Spacing";

import { msToHMS } from "../../utils";

const TopBannerTextBig = ({ label, id }) => {
    const theme = useTheme();

    let value = useSelector((state) => state.trackingSession[id]);

    if(id === "time") value = msToHMS(value)
    else value = value.toFixed(2)

    return (
        <RN.View style={styles.bigTextContainer}>
            <Paper.Text
                style={{
                    fontSize: theme.fontSize["5xl"],
                    fontFamily: "Rubik-Bold",
                    color: theme.colors.text,
                }}
            >
                {value}
            </Paper.Text>

            <Spacing horizontal size="xs" />

            <Paper.Text style={{ fontSize: theme.fontSize["xs"] }}>
                {label}
            </Paper.Text>
        </RN.View>
    );
};

const styles = RN.StyleSheet.create({
    bigTextContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default TopBannerTextBig;
