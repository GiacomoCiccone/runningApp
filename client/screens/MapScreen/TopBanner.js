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
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import TopBannerModal from "./TopBannerModal";

const HEIGHT_CONTAINER_1 = 200;
const HEIGHT_CONTAINER_1_BIG_TEXT = 100;
const HEIGHT_CONTAINER_1_TOP = 40;

const HEIGHT_CONTAINER_2 = 70;
const ANIMATION_DURATION = 400;

const modalInitialState = {
    open: false,
    modalTitle: "",
    modalAction: null,
    selected: null,
};

const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

const modalReducer = (state, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return action.payload;
        case CLOSE_MODAL: {
            return modalInitialState;
        }
        default:
            return state;
    }
};

const TopBanner = ({ fullSize, setFullSize, isGPSEnabled }) => {
    const theme = useTheme();
    const wheater = useSelector((state) => state.trackingSession.wheater);

    const [selectedBig, setSelectedBig] = React.useState("time");
    const [selectedLeftFullSize, setSelectedLeftFullSize] =
        React.useState("calories");
    const [selectedCenterFullSize, setSelectedCenterFullSize] =
        React.useState("speed");
    const [selectedRightFullSize, setSelectedRightFullSize] =
        React.useState("distance");
    const [selectedLeft, setSelectedLeft] = React.useState("calories");
    const [selectedCenter, setSelectedCenter] = React.useState("time");
    const [selectedRight, setSelectedRight] = React.useState("distance");
    const [modalState, modalDispath] = React.useReducer(
        modalReducer,
        modalInitialState
    );

    const setFullSizeTrue = React.useCallback(() => {
        setFullSize(true);
    }, []);

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
                                onPress={() =>
                                    modalDispath({
                                        type: OPEN_MODAL,
                                        payload: {
                                            open: true,
                                            modalTitle: "Secondo a sinistra",
                                            selected: selectedLeft,
                                            modalAction: (newVal) => {
                                                setSelectedLeft(newVal);
                                                modalDispath({
                                                    type: CLOSE_MODAL,
                                                });
                                            },
                                        },
                                    })
                                }
                                id={selectedLeft}
                            />

                            <TopBannerTextNormal
                                onPress={() =>
                                    modalDispath({
                                        type: OPEN_MODAL,
                                        payload: {
                                            open: true,
                                            modalTitle: "Secondo centrale",
                                            selected: selectedCenter,
                                            modalAction: (newVal) => {
                                                setSelectedCenter(newVal);
                                                modalDispath({
                                                    type: CLOSE_MODAL,
                                                });
                                            },
                                        },
                                    })
                                }
                                id={selectedCenter}
                            />

                            <TopBannerTextNormal
                                onPress={() =>
                                    modalDispath({
                                        type: OPEN_MODAL,
                                        payload: {
                                            open: true,
                                            modalTitle: "Secondo a destra",
                                            selected: selectedRight,
                                            modalAction: (newVal) => {
                                                setSelectedRight(newVal);
                                                modalDispath({
                                                    type: CLOSE_MODAL,
                                                });
                                            },
                                        },
                                    })
                                }
                                id={selectedRight}
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
                            style={{ flex: 1, marginLeft: theme.spacing.xl }}
                        >
                            {wheater && (
                                <RN.View
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <RN.Image
                                        source={{
                                            uri: `http://openweathermap.org/img/wn/${wheater.icon}@2x.png`,
                                        }}
                                        style={{
                                            width: 30,
                                            height: 30,
                                            resizeMode: "contain",
                                        }}
                                    />
                                    <Paper.Text
                                        style={{
                                            fontSize: theme.fontSize.xs,
                                            fontFamily: "Rubik-Medium",
                                        }}
                                    >
                                        {wheater.temp}°
                                    </Paper.Text>
                                </RN.View>
                            )}
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
                        <TopBannerTextBig
                            onPress={() =>
                                modalDispath({
                                    type: OPEN_MODAL,
                                    payload: {
                                        open: true,
                                        modalTitle: "Principale",
                                        selected: selectedBig,
                                        modalAction: (newVal) => {
                                            setSelectedBig(newVal);
                                            modalDispath({ type: CLOSE_MODAL });
                                        },
                                    },
                                })
                            }
                            id={selectedBig}
                        />
                    </RN.View>

                    <RN.View style={styles.textContainer}>
                        <TopBannerTextNormal
                            onPress={() =>
                                modalDispath({
                                    type: OPEN_MODAL,
                                    payload: {
                                        open: true,
                                        modalTitle: "Primo a sinistra",
                                        selected: selectedLeftFullSize,
                                        modalAction: (newVal) => {
                                            setSelectedLeftFullSize(newVal);
                                            modalDispath({ type: CLOSE_MODAL });
                                        },
                                    },
                                })
                            }
                            id={selectedLeftFullSize}
                        />
                        <TopBannerTextNormal
                            onPress={() =>
                                modalDispath({
                                    type: OPEN_MODAL,
                                    payload: {
                                        open: true,
                                        modalTitle: "Primo centrale",
                                        selected: selectedCenterFullSize,
                                        modalAction: (newVal) => {
                                            setSelectedCenterFullSize(newVal);
                                            modalDispath({ type: CLOSE_MODAL });
                                        },
                                    },
                                })
                            }
                            id={selectedCenterFullSize}
                        />
                        <TopBannerTextNormal
                            onPress={() =>
                                modalDispath({
                                    type: OPEN_MODAL,
                                    payload: {
                                        open: true,
                                        modalTitle: "Primo a destra",
                                        selected: selectedRightFullSize,
                                        modalAction: (newVal) => {
                                            setSelectedRightFullSize(newVal);
                                            modalDispath({ type: CLOSE_MODAL });
                                        },
                                    },
                                })
                            }
                            id={selectedRightFullSize}
                        />
                    </RN.View>
                </RN.View>

                <TopBannerModal
                    state={modalState}
                    onDismiss={() => modalDispath({ type: CLOSE_MODAL })}
                />
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
