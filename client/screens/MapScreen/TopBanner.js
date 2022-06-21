import * as React from "react";
import * as RN from "react-native";
import * as Moti from "moti";
import * as Paper from "react-native-paper";

//redux
import { useSelector } from "react-redux";

import { useTheme } from "../../providers/theme.provider";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import TopBannerTextNormal from "./TopBannerTextNormal";
import TopBannerTextBig from "./TopBannerTextBig";

const HEIGHT_CONTAINER_1 = 200;
const HEIGHT_CONTAINER_1_BIG_TEXT = 100;
const HEIGHT_CONTAINER_1_TOP = 40;

const HEIGHT_CONTAINER_2 = 70;
const ANIMATION_DURATION = 400;

const TopBanner = ({ fullSize, setFullSize, isGPSEnabled }) => {
    const theme = useTheme();

    const setFullSizeTrue = React.useCallback(() => {
        setFullSize(true);
    }, []);

    const wheater = useSelector(state => state.trackingSession.wheater);

    return (
        <>
            <Moti.MotiView
                animate={{
                    translateY: !fullSize ? 0 : -HEIGHT_CONTAINER_2,
                }}
                transition={{
                    type: "timing",
                    duration: ANIMATION_DURATION,
                    delay: !fullSize ? ANIMATION_DURATION : 0,
                }}
                style={styles.container}
            >
                <RN.TouchableWithoutFeedback onPress={setFullSizeTrue}>
                    <RN.View
                        style={{
                            height: HEIGHT_CONTAINER_2,
                            backgroundColor: theme.colors.backgroundElevation,
                            ...theme.shadowBox.lg,
                        }}
                    >
                        <RN.View style={styles.textContainer}>
                            <TopBannerTextNormal
                                label="Calorie"
                                id="calories"
                                unit="Kcal"
                            />

                            <TopBannerTextNormal label="Durata" id="time" />

                            <TopBannerTextNormal
                                label="Distanza"
                                id="distance"
                                unit="Km"
                            />
                        </RN.View>
                    </RN.View>
                </RN.TouchableWithoutFeedback>
            </Moti.MotiView>

            <Moti.MotiView
                animate={{
                    translateY: fullSize ? 0 : -HEIGHT_CONTAINER_1,
                }}
                transition={{
                    type: "timing",
                    duration: ANIMATION_DURATION,
                    delay: fullSize ? ANIMATION_DURATION : 0,
                }}
                style={styles.container}
            >
                <RN.View
                    style={{
                        height: HEIGHT_CONTAINER_1,
                        backgroundColor: theme.colors.backgroundElevation,
                        ...theme.shadowBox.lg,
                    }}
                >
                    <RN.View style={[styles.topContainer1]}>
                        <RN.View
                            style={{ flex: 1, marginLeft: theme.spacing.xl}}
                        >
                            {wheater &&
                            <RN.View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            
                            <RN.Image source={{uri: `http://openweathermap.org/img/wn/${wheater.icon}@2x.png`}} style={{width: 30, height: 30, resizeMode: 'contain'}}/>
                            <Paper.Text style={{fontSize: theme.fontSize.xs, fontFamily: 'Rubik-Medium'}}>
                                {wheater.temp}°
                            </Paper.Text>
                            </RN.View> }
                        </RN.View>

                        <RN.View style={{ flex: 1 }}></RN.View>

                        <RN.View
                            style={{
                                flex: 1,
                                alignItems: "flex-end",
                                marginRight: theme.spacing.xl,
                            }}
                        >
                            <Paper.Text
                                style={{
                                    color: isGPSEnabled
                                        ? theme.colors.success
                                        : theme.colors.error,
                                    fontFamily: "Rubik-Medium",
                                    fontSize: theme.fontSize.xs,
                                }}
                            >
                                GPS{" "}
                                <Icon
                                    size={18}
                                    name={
                                        isGPSEnabled ? "signal" : "signal-off"
                                    }
                                />
                            </Paper.Text>
                        </RN.View>
                    </RN.View>

                    <RN.View style={styles.bigTextContainer1}>
                        <TopBannerTextBig label="Durata" id="time" />
                    </RN.View>

                    <RN.View style={styles.textContainer}>
                        <TopBannerTextNormal
                            label="Calorie"
                            id="calories"
                            unit="Kcal"
                        />

                        <TopBannerTextNormal
                            label="Velocità"
                            id="speed"
                            unit="Km/h"
                        />

                        <TopBannerTextNormal
                            label="Distanza"
                            id="distance"
                            unit="Km"
                        />
                    </RN.View>
                </RN.View>
            </Moti.MotiView>
        </>
    );
};

const styles = RN.StyleSheet.create({
    container: { position: "absolute", zIndex: 100, width: "100%" },
    bigTextContainer1: {
        height: HEIGHT_CONTAINER_1_BIG_TEXT,
    },
    textContainer: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    topContainer1: {
        height: HEIGHT_CONTAINER_1_TOP,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
});

export default TopBanner;
