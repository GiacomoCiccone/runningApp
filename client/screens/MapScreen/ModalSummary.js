import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";

import { shallowEqual, useSelector } from "react-redux";

import Modal from "../../components/Modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../providers/theme.provider";
import Spacing from "../../components/Spacing";
import { configTopBannerInfos } from "./TopBannerModal";
import { msToHMS } from "../../utils";

const ModalSummary = ({ visible, onDismiss, ...props }) => {
    const theme = useTheme();

    const trackingInfo = useSelector((state) => {
        const { currentLocation, heading, weather, speed, elevation, pace, ...info } =  //extract data useful
            state.trackingSession;
        return { ...info };
    }, shallowEqual);

    return (
        <Modal visible={visible} onDismiss={onDismiss} {...props}>
            <RN.View
                style={{ alignItems: "center", width: 300, maxHeight: 500 }}
            >
                <Icon size={150} color={theme.colors.primary} name="trophy" />

                <Paper.Text
                    style={{
                        fontSize: theme.fontSize["2xl"],
                        color: theme.colors.primary,
                        fontFamily: "Rubik-Bold",
                        textAlign: "center",
                    }}
                >
                    Riepilogo corsa
                </Paper.Text>

                <Spacing size={"lg"} horizontal />

                <RN.ScrollView style={{ width: "100%" }}>
                    {Object.keys(configTopBannerInfos).filter((id) => !!trackingInfo[id]).map((id) => (
                        <RN.View
                            key={id}
                            style={{
                                flex: 1,
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexDirection: "row",
                                paddingVertical: theme.spacing.md,
                            }}
                        >
                            <RN.View
                                style={{
                                    paddingVertical: theme.spacing.md,
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Icon
                                    name={configTopBannerInfos[id].icon}
                                    size={25}
                                    color={
                                        theme.colors["primary-shades"]["300"]
                                    }
                                />

                                <Spacing size={"xl"} />

                                <Paper.Text
                                    style={{ color: theme.colors.grey, fontSize: theme.fontSize.sm }}
                                >
                                    {configTopBannerInfos[id].label}
                                </Paper.Text>
                            </RN.View>

                            <RN.View>
                                <Paper.Text style={{fontSize: theme.fontSize.sm}}>
                                    {id === "time"
                                        ? msToHMS(trackingInfo[id])
                                        : trackingInfo[id].toFixed(2) + " " + 
                                          configTopBannerInfos[id].unit}
                                </Paper.Text>
                            </RN.View>
                        </RN.View>
                    ))}
                </RN.ScrollView>

                <Spacing size={"lg"} horizontal />

                <Paper.Button
                    uppercase={false}
                    labelStyle={{ color: "white" }}
                    contentStyle={{ width: 250, height: 50 }}
                    mode="contained"
                    onPress={onDismiss}
                >
                    Ok
                </Paper.Button>
            </RN.View>
        </Modal>
    );
};

export default ModalSummary;
