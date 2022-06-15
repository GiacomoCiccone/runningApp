import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";

//redux
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../actions/userActions";

import { useForm } from "react-hook-form";
import { useTheme } from "../../providers/theme.provider";

import { useTabIndex, useTabNavigation } from "react-native-paper-tabs";

import TextLink from "../../components/TextLink";
import Spacing from "../../components/Spacing";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import ButtonSubmit from "../../components/ButtonSubmit";
import ControlledTextInput from "../../components/ControlledTextInput";


const LoginScreen = () => {
    const theme = useTheme();

    const switchTab = useTabNavigation();
    const index = useTabIndex();

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const {
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            loginEmail: "",
            loginPassword: "",
        },
    });

    const [loginPasswordVisibility, setLoginPasswordVisibility] =
        React.useState(true);

    const switchLoginPassordVisibility = React.useCallback(() => {
        setLoginPasswordVisibility(
            (loginPasswordVisibility) => !loginPasswordVisibility
        );
    }, []);

    const goToRegister = React.useCallback(() => {
        switchTab(1);
    }, []);

    React.useEffect(() => {
        reset();
    }, [index]);

    const onSubmit = (data) => {
        const email = data.loginEmail
        const password = data.loginPassword
        dispatch(loginAction(email, password));
    };

    return (
        <KeyboardAvoidingWrapper>
            <RN.View
                style={[styles.container, { paddingTop: theme.spacing["7xl"] }]}
            >
        
                <RN.View style={styles.inputWrapper}>
                    <ControlledTextInput
                        control={control}
                        rules={{
                            required: "Email richiesta",
                        }}
                        label="Email"
                        name="loginEmail"
                        error={errors.loginEmail}
                    />
                </RN.View>

                <RN.View style={styles.inputWrapper}>
                    <ControlledTextInput
                        control={control}
                        rules={{
                            required: "Password richiesta",
                        }}
                        label="Password"
                        right={
                            <Paper.TextInput.Icon
                                name={
                                    !loginPasswordVisibility ? "eye" : "eye-off"
                                }
                                forceTextInputFocus={false}
                                onPress={switchLoginPassordVisibility}
                            />
                        }
                        name="loginPassword"
                        secureTextEntry={loginPasswordVisibility}
                        error={errors.loginPassword}
                    />
                </RN.View>

                <Spacing horizontal size="sm" />

                <RN.View style={styles.linkWrapper}>
                    <TextLink
                        screen="ForgotPassword"
                        text={"Password dimenticata?"}
                    />
                </RN.View>

                <Spacing horizontal size="7xl" />

                <ButtonSubmit
                    loading={user.isLoading}
                    error={Object.keys(errors).length !== 0}
                    onPress={handleSubmit(onSubmit)}
                    label="Accedi"
                />

                <Spacing horizontal size="2xl" />

                <Paper.Text style={{ color: theme.colors.placeholder }}>
                    Non hai un account?{"  "}
                    <Paper.Text
                        style={{
                            fontFamily: "Rubik-Medium",
                            color: theme.colors.primary,
                        }}
                        onPress={goToRegister}
                    >
                        Creane uno
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
        minHeight: 480,
    },
    inputWrapper: {
        width: "100%",
    },
    linkWrapper: {
        alignSelf: "flex-end",
    },
});

export default LoginScreen;
