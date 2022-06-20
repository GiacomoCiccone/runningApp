import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";

//redux
import { useSelector } from "react-redux";

import { useTheme } from "../../providers/theme.provider";

import Spacing from "../../components/Spacing";
import { msToHMS } from "../../utils";

const TopBannerTextNormal = ({label, id, unit}) => {
    const theme = useTheme();

    let value = useSelector((state) => state.trackingSession[id]);

    if(id === "time") value = msToHMS(value)
    else value = value.toFixed(2)


    return (
        <RN.View style={styles.container}>

        <RN.View style={styles.inputTextWrapper}>
        <Paper.Text
            style={{
                fontSize: theme.fontSize["xl"],
                fontFamily: "Rubik-Bold",
            }}
        >
            {value}
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
