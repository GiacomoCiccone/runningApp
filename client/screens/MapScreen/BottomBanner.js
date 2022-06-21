import * as React from "react";
import * as RN from "react-native";
import * as Moti from "moti";
import * as Paper from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";

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
import TouchableRipple from "../../components/TouchableRipple";

const ANIMATION_DURATION = 400;

const MotiView = ({ motiKey, children, ...props }) => (
    <Moti.MotiView
        key={motiKey}
        from={{ translateY: 100 }}
        animate={{ translateY: 0 }}
        transition={{ type: "timing" }}
        exit={{ translateY: 100 }}
        exitTransition={{ type: "timing" }}
        {...props}
    >
        {children}
    </Moti.MotiView>
);

const BottomBanner = ({
    fullSize,
    changeMapType,
    setCenterToLocation,
    centerToLocation,
    setFullSize,
}) => {
    const theme = useTheme();

    //redux
    const startDate = useSelector((state) => state.trackingSession.startDate);
    const trackingActive = useSelector(
        (state) => state.trackingSession.trackingActive
    );
    const dispatch = useDispatch();

    
    const [unlocked, setUnlocked] = React.useState(false); //swipe button
    const [menuOpen, setMenuOpen] = React.useState(false);

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

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setUnlocked(false);
        }, ANIMATION_DURATION)
        
        return () => clearTimeout(timeout)
    }, [fullSize]);

    return (
        <>
            <Moti.MotiView
                animate={{
                    translateY: fullSize ? 0 : 100,
                }}
                transition={{
                    type: "timing",
                    duration: ANIMATION_DURATION,
                    delay: fullSize ? ANIMATION_DURATION : 0,
                }}
                style={[styles.container, { marginBottom: theme.spacing.xl }]}
            >
                <Moti.AnimatePresence exitBeforeEnter>
                    {startDate && (
                        <Moti.AnimatePresence exitBeforeEnter>
                            {!unlocked && (
                                <MotiView motiKey="unlock-slider">
                                    <SlideToUnlock setUnlocked={setUnlocked} />
                                </MotiView>
                            )}
                            {unlocked && (
                                <MotiView
                                    motiKey="controls-button"
                                    style={[
                                        styles.controlsButtonContainer,
                                        {
                                            paddingHorizontal: theme.spacing.lg,
                                        },
                                    ]}
                                >
                                    <Moti.AnimatePresence exitBeforeEnter>
                                        {trackingActive && (
                                                <BottomBannerButton
                                                    style={[
                                                        styles.controlButton,
                                                        {
                                                            borderRadius:
                                                                theme.rounded
                                                                    .full,
                                                                    borderTopRightRadius: 0, borderBottomRightRadius: 0,
                                                                    transform: [{translateX: 10}]
                                                        },
                                                    ]}
                                                    onPress={onPausePress}
                                                    backgroundColor={
                                                        theme.colors["warning"]
                                                    }
                                                    labelColor="white"
                                                    icon="pause-circle"
                                                >
                                                    Pausa
                                                </BottomBannerButton>
                                        )}

                                        {!trackingActive && (
                                                <BottomBannerButton
                                                    style={[
                                                        styles.controlButton,
                                                        {
                                                            borderRadius:
                                                                theme.rounded
                                                                    .full,
                                                                    borderTopRightRadius: 0, borderBottomRightRadius: 0,
                                                                    transform: [{translateX: 10}]
                                                        },
                                                    ]}
                                                    onPress={onResumePress}
                                                    backgroundColor={
                                                        theme.colors["success"]
                                                    }
                                                    labelColor="white"
                                                    icon="play-circle"
                                                >
                                                    Riprendi
                                                </BottomBannerButton>
                                        )}
                                    </Moti.AnimatePresence>

                                    <BottomBannerButton
                                        style={{
                                            aspectRatio: 1,
                                            height: 50,
                                            justifyContent: "center",
                                            borderRadius: theme.rounded.full,
                                            zIndex: 100,
                                            transform: [{scale: 1.1}]
                                        }}
                                        onPress={() => setUnlocked(false)}
                                        backgroundColor={
                                            theme.colors.backgroundElevation
                                        }
                                        labelColor={theme.colors.text}
                                    >
                                        <Icon name="lock" size={20} />
                                    </BottomBannerButton>

                                    <BottomBannerButton
                                        onPress={onStopPress}
                                        style={[
                                            styles.controlButton,
                                            {
                                                borderRadius:
                                                    theme.rounded.full,
                                                    borderTopLeftRadius: 0, borderBottomLeftRadius: 0,
                                                    transform: [{translateX: -10}]
                                            },
                                        ]}
                                        backgroundColor={theme.colors["error"]}
                                        labelColor="white"
                                        icon="stop-circle"
                                    >
                                        Stop
                                    </BottomBannerButton>
                                </MotiView>
                            )}
                        </Moti.AnimatePresence>
                    )}
                    {!startDate && (
                        <MotiView motiKey="start-button">
                            <BottomBannerButton
                                onPress={onStartPress}
                                style={[
                                    styles.controlButton,
                                    {
                                        width: 200,
                                        borderRadius: theme.rounded.full,
                                    },
                                ]}
                                backgroundColor={theme.colors["primary"]}
                                labelColor="white"
                                icon="play-circle"
                            >
                                Inizia
                            </BottomBannerButton>
                        </MotiView>
                    )}
                </Moti.AnimatePresence>
            </Moti.MotiView>

            <Moti.MotiView
                animate={{
                    translateY: !fullSize ? 0 : 100,
                }}
                transition={{
                    type: "timing",
                    duration: ANIMATION_DURATION,
                    delay: !fullSize ? ANIMATION_DURATION : 0,
                }}
                style={[
                    styles.container,
                    {
                        flexDirection: "row",
                        height: 50,
                        backgroundColor: theme.colors.backgroundElevation,
                    },
                ]}
            >
                <RN.View style={{ flex: 1, height: 50 }}>
                    <Paper.Menu
                        style={{ zIndex: 200 }}
                        visible={menuOpen}
                        onDismiss={() => setMenuOpen(false)}
                        anchor={
                            <TouchableRipple
                                rippleColor={theme.colors.grey}
                                left
                                onPress={() => setMenuOpen(true)}
                            >
                                <RN.View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <Octicons
                                        name="stack"
                                        size={18}
                                        color={theme.colors.text}
                                    />
                                    <Icon
                                        name="menu-down"
                                        size={15}
                                        color={theme.colors.text}
                                    />
                                </RN.View>
                            </TouchableRipple>
                        }
                    >
                        <Paper.Menu.Item
                            onPress={() =>
                                changeMapType("standard") || setMenuOpen(false)
                            }
                            title="Standard"
                        />
                        <Paper.Menu.Item
                            onPress={() =>
                                changeMapType("hybrid") || setMenuOpen(false)
                            }
                            title="Ibrida"
                        />
                        <Paper.Menu.Item
                            onPress={() =>
                                changeMapType("satellite") || setMenuOpen(false)
                            }
                            title="Satellite"
                        />
                        <Paper.Menu.Item
                            onPress={() =>
                                changeMapType("terrain") || setMenuOpen(false)
                            }
                            title="Terreno"
                        />
                    </Paper.Menu>
                </RN.View>

                <RN.View style={{ flex: 1, height: 50 }}>
                    <TouchableRipple
                        rippleColor={theme.colors.grey}
                        onPress={() => setFullSize(true)}
                    >
                        <RN.View>
                            <Icon
                                name="close"
                                size={20}
                                color={theme.colors.text}
                            />
                        </RN.View>
                    </TouchableRipple>
                </RN.View>

                <RN.View style={{ flex: 1, height: 50 }}>
                    <TouchableRipple
                        rippleColor={theme.colors.grey}
                        right
                        onPress={() => setCenterToLocation(true)}
                    >
                        <RN.View>
                            <Icon
                                name="crosshairs-gps"
                                size={20}
                                color={
                                    centerToLocation
                                        ? theme.colors.primary
                                        : theme.colors.text
                                }
                            />
                        </RN.View>
                    </TouchableRipple>
                </RN.View>
            </Moti.MotiView>
        </>
    );
};

const styles = RN.StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        zIndex: 100,
    },
    controlsButtonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    controlButton: {
        width: 140,
        height: 50,
        justifyContent: "center",
    },
});

export default BottomBanner;
