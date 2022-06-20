import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";
import Modal from "../../components/Modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../providers/theme.provider";
import Spacing from "../../components/Spacing";

const PermissionModal = ({visible, onDismiss, ...props }) => {
    const theme = useTheme();

    return (
        <Modal visible={visible} onDismiss={() => onDismiss(true)} {...props}>
            <RN.View style={{ alignItems: "center", width: 300 }}>
                <Icon size={150} color={theme.colors.primary} name="map-marker-radius" />

                <Spacing size={"lg"} horizontal />

                <Paper.Text
                    style={{
                        fontSize: theme.fontSize["2xl"],
                        color: theme.colors.primary,
                        fontFamily: "Rubik-Bold",
                        textAlign: 'center'
                    }}
                >
                    Geolocalizzazione
                </Paper.Text>

                <Spacing size={"lg"} horizontal />

                <Paper.Text style={{ color: theme.colors.grey }}>
                    Quest'app per funzionare ha bisogno dei permessi per la geolocalizzazione anche mentre non la si sta utilizzando.
                </Paper.Text>

                <Spacing size={"4xl"} horizontal />

                <Paper.Button
                    uppercase={false}
                    labelStyle={{ color: "white" }}
                    contentStyle={{ width: 250, height: 50 }}
                    mode="contained"
                    onPress={() => onDismiss(true)}
                >
                    Procedi
                </Paper.Button>

                <Spacing size={"sm"} horizontal />

                <Paper.Button
                    uppercase={false}
                    contentStyle={{ width: 250, height: 50 }}
                    mode='text'
                    onPress={() => onDismiss(false)}
                >
                    Salta
                </Paper.Button>
            </RN.View>
        </Modal>
    );
};

export default PermissionModal;
