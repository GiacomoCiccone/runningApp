import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";

import { useSelector, useDispatch } from "react-redux";

import { useTheme } from "../../providers/theme.provider";

import Logo from "../../components/Logo";
import Tabs from "../../components/Tabs";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import SnackBar from "../../components/SnackBar";
import { RESET_ERROR_USER } from "../../actions";

const UserAuthScreen = () => {
    const theme = useTheme();

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const resetError = React.useCallback(() => {
        dispatch({ type: RESET_ERROR_USER });
    }, []);

    return (
        <RN.SafeAreaView style={styles.safeContainer}>

            {user.isLoading && <Paper.ProgressBar indeterminate style={styles.progressBar} />}
            <SnackBar
                visible={user.error}
                onDismiss={resetError}
                action={{
                    label: "ok",
                    onPress: resetError,
                }}
                type="error"
            >
                {user.error}
            </SnackBar>

            <RN.View style={styles.logoContainer}>
                <RN.View style={styles.logoWrapper}>
                    <Logo />
                </RN.View>
            </RN.View>

            <RN.View
                style={[
                    styles.tabsContainer,
                    { marginHorizontal: theme.spacing.lg },
                ]}
            >
                <Tabs
                    labels={["Accedi", "Registrati"]}
                    icons={["", ""]}
                    screens={[<LoginScreen />, <RegisterScreen />]}
                />
            </RN.View>
        </RN.SafeAreaView>
    );
};

const styles = RN.StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
    logoContainer: {
        flex: 0.25,
        justifyContent: "center",
        alignItems: "center",
    },
    logoWrapper: {
        width: 85,
        height: 85,
    },
    tabsContainer: {
        flex: 0.8,
    },
    progressBar: {
        position: 'absolute'
    }
});

export default UserAuthScreen;
