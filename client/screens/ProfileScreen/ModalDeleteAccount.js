import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";
import Modal from "../../components/Modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../providers/theme.provider";
import Spacing from "../../components/Spacing";
import { useDispatch, useSelector } from "react-redux";
import { deleteAction } from "../../actions/userActions";

const ModalDeleteAccount = ({ visible, onDismiss, ...props }) => {
    const theme = useTheme();

    const userId = useSelector((state) => state.user.userInfo._id);
    const token = useSelector((state) => state.user.authToken);
    const dispatch = useDispatch();

    const deleteAccount = React.useCallback(() => {
        dispatch(deleteAction(userId, token));
        onDismiss();
    }, [userId, token]);

    return (
        <Modal visible={visible} onDismiss={onDismiss} {...props}>
            <RN.View style={{ alignItems: "center", width: 300 }}>
                <Icon size={150} color={theme.colors.error} name="delete" />

                <Paper.Text
                    style={{
                        fontSize: theme.fontSize["2xl"],
                        color: theme.colors.error,
                        fontFamily: "Rubik-Bold",
                        textAlign: "center",
                    }}
                >
                    Elimina account
                </Paper.Text>

                <Spacing size={"lg"} horizontal />

                <Paper.Text
                    style={{
                        color: theme.colors.grey,
                        fontSize: theme.fontSize.sm,
                    }}
                >
                    Quest'azione è irreversibile. Se elimini l'account perderai
                    tutte le informazioni contenute in esso. Procedere comunque?
                </Paper.Text>

                <Spacing size={"4xl"} horizontal />

                    <Paper.Button
                        uppercase={false}
                        color={theme.colors.error}
                        labelStyle={{ color: "white" }}
                        contentStyle={{ width: 250, height: 50 }}
                        mode="contained"
                        onPress={deleteAccount}
                    >
                        Elimina
                    </Paper.Button>

                    <Spacing size={"sm"} horizontal />

                    <Paper.Button
                        uppercase={false}
                        labelStyle={{ color: theme.colors.primary }}
                        contentStyle={{ width: 250, height: 50 }}
                        mode="text"
                        onPress={onDismiss}
                    >
                        Annulla
                    </Paper.Button>


                <Spacing size={"xl"} horizontal />
            </RN.View>
        </Modal>
    );
};

export default ModalDeleteAccount;
