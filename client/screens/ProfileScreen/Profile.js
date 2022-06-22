import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import { LOGOUT, RESET_ERROR_USER } from "../../actions";
import SnackBar from "../../components/SnackBar";
import Spacing from "../../components/Spacing";
import { useTheme } from "../../providers/theme.provider";
import DetailEntry from "./DetailEntry";
import ModalDeleteAccount from "./ModalDeleteAccount";

const Main = ({ navigation }) => {
    const theme = useTheme();

    const userIsLoading = useSelector((state) => state.user.isLoading);
    const userError = useSelector((state) => state.user.error);
    const user = useSelector(state => state.user.userInfo);
    const preferencesTheme = useSelector((state) => state.preferences.theme);
    const dispatch = useDispatch()
    

    const [showModal, setShowModal] = React.useState(false);

    const resetError = React.useCallback(() => {
        dispatch({ type: RESET_ERROR_USER });
    }, []);

    return (
        <RN.SafeAreaView style={styles.safeContainer}>
            {userIsLoading && (
                <Paper.ProgressBar indeterminate style={styles.progressBar} />
            )}

            <SnackBar
                visible={userError}
                onDismiss={resetError}
                action={{
                    label: "ok",
                    onPress: resetError,
                }}
                type="error"
            >
                {userError}
            </SnackBar>

            <RN.View
                style={{
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Paper.Text
                    style={{
                        fontFamily: "Rubik-Medium",
                        fontSize: theme.fontSize.xl,
                    }}
                >
                    Profilo
                </Paper.Text>
            </RN.View>

            <Spacing size="xl" horizontal />

            <RN.ScrollView style={{ flex: 1, marginHorizontal: theme.spacing.lg }}>
                <Paper.Text style={{ fontSize: theme.fontSize.xs }}>
                    Dettagli
                </Paper.Text>

                <Spacing size="xl" horizontal />

                <DetailEntry
                    destination="EditFullName"
                    label="Nome completo"
                    id={"fullName"}
                    value={user.fullName}
                />

                <DetailEntry
                    destination="EditEmail"
                    label="Email"
                    id={"email"}
                    value={user.email}
                />

                <DetailEntry
                    destination="EditPassword"
                    label="Password"
                    id={"password"}
                    value="✱✱✱✱✱✱✱✱"
                />

                <DetailEntry
                    destination="EditGender"
                    label="Genere"
                    id={"gender"}
                    value={user.gender === "male" ? "Maschio" : "Femmina"}
                />

                <DetailEntry
                    destination="EditWeight"
                    label="Peso"
                    id={"weight"}
                    value={`${user.weight} kg`}
                />

                <DetailEntry
                    destination="EditHeight"
                    label="Altezza"
                    id={"height"}
                    value={`${user.height} cm`}
                />

                <Spacing size="xl" horizontal />

                <Paper.Text style={{ fontSize: theme.fontSize.xs }}>
                    Preferenze
                </Paper.Text>

                <Spacing size="xl" horizontal />

                <DetailEntry
                    destination="ChangeTheme"
                    label="Tema"
                    value={
                        preferencesTheme === "default"
                            ? "Sistema"
                            : preferencesTheme === "light"
                            ? "Chiaro"
                            : "Scuro"
                    }
                />

                <Spacing size="xl" horizontal />

                <Paper.Text style={{ fontSize: theme.fontSize.xs }}>
                    Accessi
                </Paper.Text>

                <Spacing size="xl" horizontal />
                
                <RN.TouchableOpacity activeOpacity={0.8} onPress={() => dispatch({ type: LOGOUT })}>

                    <Paper.Text  style={{
                            color: theme.colors.primary,
                            fontSize: theme.fontSize.base,
                            marginLeft: 0,
                            fontFamily: 'Rubik-Regular'
                        }}>
                    Esci
                    </Paper.Text>
                </RN.TouchableOpacity>

                <Spacing size="xl" horizontal />

                <RN.TouchableOpacity activeOpacity={0.8} onPress={() => setShowModal(true)}>

                    <Paper.Text  style={{
                            color: theme.colors.primary,
                            fontSize: theme.fontSize.base,
                            marginLeft: 0,
                            fontFamily: 'Rubik-Regular'
                        }}>
                    Elimina account
                    </Paper.Text>
                </RN.TouchableOpacity>

            </RN.ScrollView>

            <ModalDeleteAccount visible={showModal} onDismiss={() => setShowModal(false)} />
        </RN.SafeAreaView>
    );
};

const styles = RN.StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
});

export default Main;
