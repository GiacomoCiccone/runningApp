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

import { updateAction } from "../../actions/userActions";
import AppHeader from "../../components/AppHeader";

const EditEmail = ({ navigation }) => {
    const theme = useTheme();

    const dispatch = useDispatch();


    const user = useSelector(state => state.user)

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            editEmail: "",
        },
    });



    const onSubmit = async (data) => {
        const body = {
            email: data.editEmail,
        };
        dispatch(updateAction(body, user.userInfo._id, user.authToken))
        navigation.goBack()
    };

    return (
        <RN.SafeAreaView style={styles.safeContainer}>
            

            <AppHeader />


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
                    Modifica la tua mail
                </Paper.Headline>

                <Spacing horizontal size="4xl" />

                    <RN.View style={styles.inputContainer}>
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
                            name="editEmail"
                            error={errors.editEmail}
                        />

                        <Spacing horizontal size="3xl" />

                        <ButtonSubmit
                            label="Salva"
                            style={{ alignSelf: "center" }}
                            onPress={handleSubmit(onSubmit)}
                            error={Object.keys(errors).length !== 0}
                        />
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

export default EditEmail;
