import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";
import Modal from "../../components/Modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../providers/theme.provider";
import Spacing from "../../components/Spacing";


export const configTopBannerInfos = {
    time: {
        label: "Durata",
        icon: 'clock'
    },
    calories: {
        label: "Calorie",
        unit: "kcal",
        icon: 'fire'
    },
    speed: {
        label: "Velocità",
        unit: "km/h",
        icon: 'speedometer'
    },
    averageSpeed: {
        label: "Velocità media",
        unit: "km/h",
        icon: 'speedometer-medium'
    },
    maxSpeed: {
        label: "Velocità massima",
        unit: "km/h",
        icon: 'speedometer'
    },
    altitude: {
        label: "Altitudine",
        unit: "m",
        icon: 'elevation-rise'
    },
    distance: {
        label: "Distanza",
        unit: "km",
        icon: 'highway'
    },
    pace: {
        label: "Ritmo",
        unit: "m/km",
        icon: 'run-fast'
    },
    averagePace: {
        label: "Ritmo medio",
        unit: "m/km",
        icon: 'run'
    },
};

const TopBannerModal = ({ state, onDismiss, ...props }) => {
    const theme = useTheme();

    return (
        <Modal
            visible={state.open}
            onDismiss={onDismiss}
            style={{
                paddingHorizontal: theme.spacing.xl,
                maxHeight: 400
            }}
            {...props}
        >
            <RN.View style={{ width: 300 }}>
                <RN.View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Paper.Text
                    style={{
                        fontSize: theme.fontSize["lg"],
                        fontFamily: "Rubik-Medium",
                    }}
                >
                    {state.modalTitle}
                </Paper.Text>

                <RN.TouchableWithoutFeedback onPress={onDismiss}>
                <Icon name="close" size={20} color={theme.colors.text} />
                </RN.TouchableWithoutFeedback>
                </RN.View>
               

                <Spacing horizontal size="lg" />

                <RN.ScrollView>
                    {Object.keys(configTopBannerInfos).map((id) => (
                        <RN.TouchableWithoutFeedback key={id} onPress={() => state.modalAction && state.modalAction(id)} style={{ flex: 1, }}>
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
                                    color={id === state.selected ? theme.colors['primary-shades']['300'] : theme.colors.grey}
                                />

                                <Spacing size={'xl'} />

                                <Paper.Text style={{color: id === state.selected ? theme.colors.primary : theme.colors.text, fontSize: theme.fontSize.sm}}>
                                    {configTopBannerInfos[id].label}
                                </Paper.Text>
                           
                        </RN.View>
                        </RN.TouchableWithoutFeedback>
                    ))}
                </RN.ScrollView>
            </RN.View>
        </Modal>
    );
};

export default TopBannerModal;
