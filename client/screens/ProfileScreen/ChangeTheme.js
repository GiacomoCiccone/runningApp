import * as React from "react";

import * as RN from "react-native";
import * as Paper from "react-native-paper";
import * as Moti from "moti";

//redux
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";

import { useTheme } from "../../providers/theme.provider";

import Logo from "../../components/Logo";
import Spacing from "../../components/Spacing";
import ButtonSubmit from "../../components/ButtonSubmit";
import ControlledTextInput from "../../components/ControlledTextInput";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";

import { updateAction } from "../../redux/actions/userActions";
import AppHeader from "../../components/AppHeader";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CHANGE_THEME } from "../../redux/actions";
import { Easing } from "react-native-reanimated";

const ChangeTheme = ({ navigation }) => {
    const theme = useTheme();

    const dispatch = useDispatch();

    const preferencesTheme = useSelector((state) => state.preferences.theme);

    const onChangeValue = React.useCallback((value) => {
        dispatch({ type: CHANGE_THEME, payload: { theme: value } });
    }, []);

    return (
        <RN.SafeAreaView style={styles.safeContainer}>
            <AppHeader />

            <RN.View style={styles.logoContainer}>
                <RN.View style={styles.logoWrapper}>
                    <Moti.AnimatePresence exitBeforeEnter>
                        {theme.dark && (
                            <Moti.MotiView
                                key="dark"
                                from={{scale: 2, rotate: "180deg" }}
                                animate={{scale: 1, rotate: "0deg"}}
                                transition={{ type: "timing" }}
                                exit={{scale: 2, rotate: "180deg" }}
                                exitTransition={{ type: "timing" }}
                            >
                                <Icon
                                    name="moon-waning-crescent"
                                    size={85}
                                    color={theme.colors.primary}
                                />
                            </Moti.MotiView>
                        )}

                        {!theme.dark && (
                            <Moti.MotiView
                                key="light"
                                from={{ opacity: 0, translateY: -200, rotateZ: '180deg' }}
                                animate={{
                                    opacity: 1,
                                    translateY: 0,
                                    rotateZ: '0deg'
                                }}
                                transition={{ type: "timing" }}
                                exit={{ opacity: 0, translateY: -200, rotateZ: '180deg' }}
                                exitTransition={{ type: "timing" }}
                            >
                                <Icon
                                    name="white-balance-sunny"
                                    size={85}
                                    color={theme.colors.primary}
                                />
                            </Moti.MotiView>
                        )}
                    </Moti.AnimatePresence>
                </RN.View>
            </RN.View>

            <RN.View
                style={[
                    styles.contentContainer,
                    { marginHorizontal: theme.spacing.lg },
                ]}
            >
                <Paper.Headline
                    style={[
                        styles.titleContainer,
                        {
                            fontSize: theme.fontSize["2xl"],
                            color: theme.colors.primary,
                        },
                    ]}
                >
                    Cambia il tema
                </Paper.Headline>

                <Spacing horizontal size="4xl" />

                <RN.View style={styles.inputContainer}>
                    <Paper.RadioButton.Group
                        onValueChange={onChangeValue}
                        value={preferencesTheme}
                    >
                        <RN.View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Paper.Text style={{fontSize: theme.fontSize.base}}>Sistema</Paper.Text>
                            <Paper.RadioButton value="default" />
                        </RN.View>

                        <Spacing horizontal size='md' />

                        <RN.View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Paper.Text style={{fontSize: theme.fontSize.base}}>Chiaro</Paper.Text>
                            <Paper.RadioButton value="light" />
                        </RN.View>

                        <Spacing horizontal size='md' />

                        <RN.View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Paper.Text style={{fontSize: theme.fontSize.base}}>Scuro</Paper.Text>
                            <Paper.RadioButton value="dark" />
                        </RN.View>
                    </Paper.RadioButton.Group>
                </RN.View>
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
    contentContainer: {
        flex: 0.8,
        alignItems: "center",
    },
    titleContainer: {
        textAlign: "center",
        fontFamily: "Rubik-Bold",
    },
    subTitleContainer: {
        textAlign: "center",
    },
    inputWrapper: {
        width: "100%",
    },
    inputContainer: {
        width: "100%",
        minHeight: 450,
    },
});

export default ChangeTheme;
