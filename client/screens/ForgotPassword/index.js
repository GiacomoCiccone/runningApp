import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";

//redux
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { useTheme } from "../../providers/theme.provider";

import Logo from "../../components/Logo";
import Spacing from "../../components/Spacing";
import ModalEmail from "./ModalEmail";
import ButtonSubmit from "../../components/ButtonSubmit";
import ControlledTextInput from "../../components/ControlledTextInput";
import SnackBar from "../../components/SnackBar";
import { forgotPasswordAction } from "../../actions/userActions";
import { RESET_ERROR_USER } from "../../actions";

const ForgotPasswordScreen = ({navigation}) => {
    const theme = useTheme();

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            forgotPasswordEmail: "",
        },
    });

    const [showModal, setShowModal] = React.useState(false);

    const resetError = React.useCallback(() => {
        dispatch({ type: RESET_ERROR_USER });
    }, []);

    const onSuccess = React.useCallback(() => {
        setShowModal(true)
    }, [])

    const closeModal = React.useCallback(() => {
        setShowModal(false)
        navigation.replace('ResetPassword')
    }, [])


    const onSubmit = async (data) => {
        const email = data.forgotPasswordEmail
        dispatch(forgotPasswordAction(email, onSuccess))
    };

    return (
        <RN.SafeAreaView style={styles.safeContainer}>
            {user.isLoading && (
                <Paper.ProgressBar indeterminate style={styles.progressBar} />
            )}
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
                    Password Dimenticata?
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
                    Inserisci la tua email e ti invieremo il codice per recuperare la tua password.
                </Paper.Subheading>

                <Spacing horizontal size="4xl" />
                <RN.View style={styles.inputWrapper}>
                    <ControlledTextInput
                        name="forgotPasswordEmail"
                        label="La tua mail"
                        control={control}
                        error={errors.forgotPasswordEmail}
                        rules={{ required: "Email richiesta" }}
                    />
                </RN.View>

                <Spacing horizontal size="5xl" />

                <ButtonSubmit
                    label="Invia"
                    loading={user.isLoading}
                    onPress={handleSubmit(onSubmit)}
                    error={Object.keys(errors).length !== 0}
                />
            </RN.View>

            <ModalEmail
                visible={showModal}
                transparent={true}
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
});

export default ForgotPasswordScreen;
