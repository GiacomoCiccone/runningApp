import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";
import Modal from "../../components/Modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../providers/theme.provider";
import Spacing from "../../components/Spacing";

const ModalPassword = ({visible, onDismiss, ...props }) => {
    const theme = useTheme();


    return (
        <Modal visible={visible} onDismiss={onDismiss} {...props}>
            <RN.View style={{ alignItems: "center", width: 300 }}>
                <Icon size={150} color={theme.colors.primary} name="check-circle" />

                <Paper.Text
                    style={{
                        fontSize: theme.fontSize["2xl"],
                        color: theme.colors.primary,
                        fontFamily: "Rubik-Bold",
                    }}
                >
                    Password ripristinata
                </Paper.Text>

                <Spacing size={"lg"} horizontal />

                <Paper.Text style={{ color: theme.colors.grey }}>
                    Abbiamo ripristinato la tua password. Utilizzala per accedere al tuo account
                </Paper.Text>

                <Spacing size={"4xl"} horizontal />

                <Paper.Button
                    uppercase={false}
                    labelStyle={{ color: "white" }}
                    contentStyle={{ width: 250, height: 50 }}
                    mode="contained"
                    onPress={onDismiss}
                >
                    Ok
                </Paper.Button>

                <Spacing size={"xl"} horizontal />
            </RN.View>
        </Modal>
    );
};

export default ModalPassword;