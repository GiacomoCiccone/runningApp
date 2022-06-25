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

const EditFullName = ({ navigation }) => {
    const theme = useTheme();

    const dispatch = useDispatch();
    const user = useSelector(state => state.user)



    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            editFullName: "",
        },
    });



    const onSubmit = async (data) => {
        const body = {
            fullName: data.editFullName,
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
                    Modifica il tuo nome completo
                </Paper.Headline>

                <Spacing horizontal size="4xl" />

                    <RN.View style={styles.inputContainer}>
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
                            name="editFullName"
                            error={errors.editFullName}
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

export default EditFullName;
