import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";

import { useForm } from "react-hook-form";
import { useTheme } from "../../providers/theme.provider";
import { useTabIndex, useTabNavigation } from "react-native-paper-tabs";

//redux
import { useDispatch, useSelector } from "react-redux";
import {registerAction} from '../../redux/actions/userActions'

import Spacing from "../../components/Spacing";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import ButtonSubmit from "../../components/ButtonSubmit";
import ControlledTextInput from "../../components/ControlledTextInput";

const RegisterScreen = () => {
    const theme = useTheme();

    const switchTab = useTabNavigation();
    const index = useTabIndex();

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            registerEmail: "",
            registerPassword: "",
            registerConfirmPassword: "",
            registerFullName: "",
        },
    });
    const registerPassword = watch("registerPassword");

    const [registerPasswordVisibility, setRegisterPasswordVisibility] =
        React.useState(true);
    const [
        registerConfirmPasswordVisibility,
        setRegisterConfirmPasswordVisibility,
    ] = React.useState(true);

    const switchRegisterPassordVisibility = React.useCallback(() => {
        setRegisterPasswordVisibility(
            (registerPasswordVisibility) => !registerPasswordVisibility
        );
    }, []);
    const switchRegisterConfirmPassordVisibility = React.useCallback(() => {
        setRegisterConfirmPasswordVisibility(
            (registerConfirmPasswordVisibility) =>
                !registerConfirmPasswordVisibility
        );
    }, []);

    const goToLogin = React.useCallback(() => {
        switchTab(0);
    }, []);

    React.useEffect(() => {
        reset();
    }, [index]);
    
    const onSubmit = (data) => {

        const userInfo = {
            fullName: data.registerFullName,
            email: data.registerEmail,
            password: data.registerPassword
        }
        dispatch(registerAction(userInfo));
    };

    return (
        <KeyboardAvoidingWrapper>
            <RN.View style={styles.container}>
                <RN.View
                    style={[
                        styles.inputWrapper,
                        { paddingTop: theme.spacing["7xl"] },
                    ]}
                >
                    <ControlledTextInput
                        control={control}
                        rules={{
                            required: "Nome completo richiesto",
                            pattern: {
                                value: /^[a-zA-Z ]+$/,
                                message: "Nome non valido",
                            },
                        }}
                        label="Nome completo"
                        name="registerFullName"
                        error={errors.registerFullName}
                    />
                </RN.View>


                <RN.View style={styles.inputWrapper}>
                    <ControlledTextInput
                        control={control}
                        rules={{
                            required: "Email richiesta",
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Email non valida",
                            },
                        }}
                        label="Email"
                        name="registerEmail"
                        error={errors.registerEmail}
                    />
                </RN.View>

                <RN.View style={styles.inputWrapper}>
                    <ControlledTextInput
                        control={control}
                        rules={{
                            required: "Password richiesta",
                            minLength: {
                                value: 8,
                                message: "Password troppo breve",
                            },
                        }}
                        label="Password"
                        name="registerPassword"
                        right={
                            <Paper.TextInput.Icon
                                name={
                                    !registerPasswordVisibility
                                        ? "eye"
                                        : "eye-off"
                                }
                                forceTextInputFocus={false}
                                onPress={switchRegisterPassordVisibility}
                            />
                        }
                        secureTextEntry={registerPasswordVisibility}
                        error={errors.registerPassword}
                    />
                </RN.View>

                <RN.View style={styles.inputWrapper}>
                    <ControlledTextInput
                        control={control}
                        rules={{
                            required: "Conferma password richiesta",
                            validate: (val) =>
                                val === registerPassword ||
                                "Le password non corrispondono",
                        }}
                        label="Conferma password"
                        name="registerConfirmPassword"
                        right={
                            <Paper.TextInput.Icon
                                name={
                                    !registerConfirmPasswordVisibility
                                        ? "eye"
                                        : "eye-off"
                                }
                                forceTextInputFocus={false}
                                onPress={switchRegisterConfirmPassordVisibility}
                            />
                        }
                        secureTextEntry={registerConfirmPasswordVisibility}
                        error={errors.registerConfirmPassword}
                    />
                </RN.View>

                <Spacing horizontal size="5xl" />

                <ButtonSubmit
                    loading={user.isLoading}
                    error={Object.keys(errors).length !== 0}
                    onPress={handleSubmit(onSubmit)}
                    label="Continua"
                />

                <Spacing horizontal size="2xl" />

                <Paper.Text style={{ color: theme.colors.grey }}>
                    Hai già un account?{"  "}
                    <Paper.Text
                        style={{
                            fontFamily: "Rubik-Medium",
                            color: theme.colors.primary,
                        }}
                        onPress={goToLogin}
                    >
                        Accedi
                    </Paper.Text>
                </Paper.Text>
            </RN.View>
        </KeyboardAvoidingWrapper>
    );
};

const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        minHeight: 700,
    },
    inputWrapper: {
        width: "100%",
    },
});

export default RegisterScreen;
