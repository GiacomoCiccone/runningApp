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
import ModalPassword from "../ResetPasswordScreen.js/ModalPassword";
import ButtonSubmit from "../../components/ButtonSubmit";
import ControlledTextInput from "../../components/ControlledTextInput";
import ControlledCodeInput from "../../components/ControlledCodeInput";
import SnackBar from "../../components/SnackBar";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";

import { resetPasswordAction } from "../../actions/userActions";
import { RESET_ERROR_USER } from "../../actions";
import AppHeader from "../../components/AppHeader";

const ResetPasswordScreen = ({ navigation }) => {
    const theme = useTheme();

    const dispatch = useDispatch();
    const userIsLoading = useSelector((state) => state.user.isLoading);
    const userError = useSelector((state) => state.user.error)

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            resetPassword: "",
            resetConfirmPassword: "",
            resetToken: "",
        },
    });

    const resetPassword = watch("resetPassword");
    const resetToken = watch("resetToken");

    const [showModal, setShowModal] = React.useState(false);
    const [resetPasswordVisibility, setResetPasswordVisibility] =
        React.useState(true);
    const [resetConfirmPasswordVisibility, setResetConfirmPasswordVisibility] =
        React.useState(true);

    const switchresetPassordVisibility = React.useCallback(() => {
        setResetPasswordVisibility(
            (resetPasswordVisibility) => !resetPasswordVisibility
        );
    }, []);
    const switchresetConfirmPassordVisibility = React.useCallback(() => {
        setResetConfirmPasswordVisibility(
            (resetConfirmPasswordVisibility) => !resetConfirmPasswordVisibility
        );
    }, []);

    const resetError = React.useCallback(() => {
        dispatch({ type: RESET_ERROR_USER });
        navigation.goBack()
    }, []);

    const onSuccess = React.useCallback(() => {
        setShowModal(true);
    }, []);

    const closeModal = React.useCallback(() => {
        setShowModal(false);
        navigation.goBack()
    }, []);

    const onSubmit = async (data) => {
        const password = data.resetPassword;
        const token = data.resetToken;
        dispatch(resetPasswordAction(password, token, onSuccess));
    };

    return (
        <RN.SafeAreaView style={styles.safeContainer}>
            {userIsLoading && (
                <Paper.ProgressBar indeterminate style={styles.progressBar} />
            )}

            <AppHeader />

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

            <RN.View style={styles.logoContainer}>
                <RN.View style={styles.logoWrapper}>
                    <Logo />
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
                    Ripristina la tua password
                </Paper.Headline>
                <Paper.Subheading
                    style={[
                        styles.subTitleContainer,
                        {
                            fontSize: theme.fontSize.base,
                            color: theme.colors.grey,
                            marginTop: theme.spacing.xs,
                            marginHorizontal: theme.spacing["2xl"],
                        },
                    ]}
                >
                    Inserisci il codice dalla mail e scegli una nuova password.
                </Paper.Subheading>

                <Spacing horizontal size="4xl" />

                <KeyboardAvoidingWrapper>
                    <RN.View style={styles.inputContainer}>
                        <RN.View style={styles.inputWrapper}>
                            <ControlledCodeInput
                                name="resetToken"
                                control={control}
                                rules={{
                                    required: "Codice richiesto",
                                    minLength: {
                                        value: 4,
                                        message: "Codice richiesto",
                                    },
                                }}
                                error={errors.resetToken}
                                full={resetToken.length === 4}
                            />
                        </RN.View>

                        <Moti.MotiView
                            animate={{ scale: resetToken.length === 4 ? 1 : 0 }}
                            transition={{ type: "timing" }}
                            style={styles.inputWrapper}
                        >
                            <ControlledTextInput
                                control={control}
                                rules={{
                                    required: "Password richiesta",
                                    minLength: {
                                        value: 8,
                                        message: "Password troppo breve",
                                    },
                                }}
                                label="Nuova password"
                                name="resetPassword"
                                right={
                                    <Paper.TextInput.Icon
                                        name={
                                            !resetPasswordVisibility
                                                ? "eye"
                                                : "eye-off"
                                        }
                                        forceTextInputFocus={false}
                                        onPress={switchresetPassordVisibility}
                                    />
                                }
                                secureTextEntry={resetPasswordVisibility}
                                error={errors.resetPassword}
                            />
                        </Moti.MotiView>

                        <Moti.MotiView
                            animate={{ scale: resetToken.length === 4 ? 1 : 0 }}
                            transition={{ type: "timing" }}
                            style={styles.inputWrapper}
                        >
                            <ControlledTextInput
                                control={control}
                                rules={{
                                    required: "Conferma password richiesta",
                                    validate: (val) =>
                                        val === resetPassword ||
                                        "Le password non corrispondono",
                                }}
                                label="Conferma password"
                                name="resetConfirmPassword"
                                right={
                                    <Paper.TextInput.Icon
                                        name={
                                            !resetConfirmPasswordVisibility
                                                ? "eye"
                                                : "eye-off"
                                        }
                                        forceTextInputFocus={false}
                                        onPress={
                                            switchresetConfirmPassordVisibility
                                        }
                                    />
                                }
                                secureTextEntry={resetConfirmPasswordVisibility}
                                error={errors.resetConfirmPassword}
                            />
                        </Moti.MotiView>

                        <Spacing horizontal size="3xl" />

                        {resetToken.length === 4 && (
                            <ButtonSubmit
                                loading={userIsLoading || userError}
                                label="Salva"
                                style={{ alignSelf: "center" }}
                                onPress={handleSubmit(onSubmit)}
                                error={Object.keys(errors).length !== 0}
                            />
                        )}
                    </RN.View>
                </KeyboardAvoidingWrapper>
            </RN.View>

            <ModalPassword
                visible={showModal}
                onDismiss={closeModal}
            />
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
    progressBar: {
        position: 'absolute'
    },
});

export default ResetPasswordScreen;
