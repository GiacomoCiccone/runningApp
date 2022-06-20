import * as React from "react";
import * as RN from "react-native";
import * as Moti from "moti";
import * as Paper from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//redux
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../providers/theme.provider";

import { requestPermissions, startBackgroundUpdate } from "./locationFunctions";
import {
    LOCATION_ERROR,
    SET_TRACKING_ACTIVE,
    SET_TRACKING_INACTIVE,
    START_SESSION,
} from "../../actions";
import SlideToUnlock from "./SlideToUnlock";
import BottomBannerButton from "./BottomBannerButton";

const BottomBanner = () => {
    const theme = useTheme();

    //redux
    const startDate = useSelector((state) => state.trackingSession.startDate);
    const dispatch = useDispatch();

    //swipe button
    const [unlocked, setUnlocked] = React.useState(false);

    //when the user press start must set active tracking true
    const onStartPress = React.useCallback(async () => {
        try {
            //controlla prima i permessi e fa partire se non è ancora partito il background task
            await requestPermissions();
            await startBackgroundUpdate();
            dispatch({ type: START_SESSION });
        } catch (error) {
            dispatch({ type: LOCATION_ERROR, payload: error.message });
        }
    }, []);

    //when the user press start must set active tracking true
    const onPausePress = React.useCallback(() => {
        dispatch({ type: SET_TRACKING_INACTIVE });
    }, []);

    //when the user press start must set active tracking true
    const onResumePress = React.useCallback(() => {
        dispatch({ type: SET_TRACKING_ACTIVE });
    }, []);

    //when the user press start must set active tracking true
    const onStopPress = React.useCallback(() => {}, []);

    return (
        <RN.View style={[styles.container, { marginBottom: theme.spacing.md }]}>
            <Moti.AnimatePresence exitBeforeEnter>
                {startDate && (
                    <Moti.AnimatePresence exitBeforeEnter>
                        {!unlocked && (
                            <SlideToUnlock setUnlocked={setUnlocked} />
                        )}
                        {unlocked && (
                            <Moti.MotiView
                                from={{ translateY: 100 }}
                                animate={{ translateY: 0 }}
                                transition={{ type: "timing" }}
                                exit={{ translateY: 0 }}
                                exitTransition={{ type: "timing" }}
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "100%",
                                    paddingHorizontal: theme.spacing.lg,
                                }}
                            >
                                 <BottomBannerButton
                                    style={{
                                        width: 120,
                                        height: 50,
                                        justifyContent: "center",
                                    }}
                                    onPress={onPausePress}
                                    backgroundColor={theme.colors["warning"]}
                                    labelColor="white"
                                    icon="pause-circle"
                                >
                                    Pausa
                                </BottomBannerButton>

                                <BottomBannerButton
                                    style={{
                                        aspectRatio: 1,
                                        height: 50,
                                        justifyContent: "center",
                                        borderRadius: theme.rounded.full
                                    }}
                                    onPress={() => setUnlocked(false)}
                                    backgroundColor={theme.colors.background}
                                    labelColor={theme.colors.text}
                                >
                                    <Icon name="lock" size={20} />
                                </BottomBannerButton>

                                <BottomBannerButton
                                    style={{
                                        width: 120,
                                        height: 50,
                                        justifyContent: "center",
                                    }}
                                    backgroundColor={theme.colors["error"]}
                                    labelColor="white"
                                    icon="stop-circle"
                                >
                                    Stop
                                </BottomBannerButton>
                            </Moti.MotiView>
                        )}
                    </Moti.AnimatePresence>
                )}
                {!startDate && (
                    <Moti.MotiView
                        exit={{ translateY: 100, scale: 3 }}
                        exitTransition={{ type: "timing" }}
                    >
                         <BottomBannerButton
                         onPress={onStartPress}
                                    style={{
                                        width: 200,
                                        height: 50,
                                        justifyContent: "center",
                                    }}
                                    backgroundColor={theme.colors["primary"]}
                                    labelColor="white"
                                    icon="play-circle"
                                >
                                    Inizia
                                </BottomBannerButton>
                    </Moti.MotiView>
                )}
            </Moti.AnimatePresence>
        </RN.View>
    );
};

const styles = RN.StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 20,
        zIndex: 100,
    },
});

export default BottomBanner;
