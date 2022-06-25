import * as RN from "react-native";
import * as Paper from "react-native-paper";

//redux
import { useSelector } from "react-redux";

import { useTheme } from "../../providers/theme.provider";

import Spacing from "../../components/Spacing";
import { msToHMS } from "../../utils";
import { configTopBannerInfos } from "./TopBannerModal";

const TopBannerTextNormal = ({ id, onPress }) => {
    const theme = useTheme();

    let value = useSelector((state) => state.trackingSession[id]);

    if (id === "time") value = msToHMS(value).substring(0, 5);
    else value = value.toFixed(2);

    return (
        <RN.TouchableWithoutFeedback onPress={onPress} style={styles.container}>
            <RN.View style={styles.container}>
                <RN.View style={styles.textWrapper}>
                    <Paper.Text
                        style={{
                            fontSize: theme.fontSize.xl,
                            fontFamily: "Rubik-Bold",
                        }}
                    >
                        {value}
                    </Paper.Text>

                    {configTopBannerInfos[id].unit && (
                        <Paper.Text style={{ fontSize: theme.fontSize["2xs"] }}>
                            {" " + configTopBannerInfos[id].unit}
                        </Paper.Text>
                    )}
                </RN.View>

                <Spacing horizontal size="xs" />
                <Paper.Text style={{ fontSize: theme.fontSize.xs }}>
                    {configTopBannerInfos[id].label}
                </Paper.Text>
            </RN.View>
        </RN.TouchableWithoutFeedback>
    );
};

const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default TopBannerTextNormal;
