import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";

//redux
import { useSelector } from "react-redux";

import { useTheme } from "../../providers/theme.provider";

import Spacing from "../../components/Spacing";

const TopBannerTextNormal = ({label, id, unit}) => {
    const theme = useTheme();

    const value = useSelector((state) => state.trackingSession[id]);


    return (
        <RN.View style={styles.container}>

        <RN.View style={styles.inputTextWrapper}>
        <Paper.Text
            style={{
                fontSize: theme.fontSize["xl"],
                fontFamily: "Rubik-Bold",
            }}
        >
            {value?.toFixed(2) || "0.00"}
            </Paper.Text>
            

        {unit && <Paper.Text style={{ fontSize: theme.fontSize['2xs'] }}>
            {" " + unit}
        </Paper.Text>}
        </RN.View>
       

        <Spacing horizontal size="xs" />
        <Paper.Text style={{ fontSize: theme.fontSize["xs"] }}>
            {label}
        </Paper.Text>

        
    </RN.View>
    );
};

const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputTextWrapper: {flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}
});

export default TopBannerTextNormal;
