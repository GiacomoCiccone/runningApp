import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";
import { useTheme } from "../../providers/theme.provider";
import Spacing from "../../components/Spacing";
import { FemaleGender, MaleGender } from "../../assets/images";
import ButtonSubmit from "../../components/ButtonSubmit";
import SelectButton from "../../components/SelectButton";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../../components/AppHeader";
import Logo from "../../components/Logo";
import Picker from "../../components/Picker";
import { updateAction } from "../../redux/actions/userActions";

const EditWeight = ({ navigation }) => {
    const theme = useTheme();

    const [weight, setWeight] = React.useState(70);

    const changeWeight = React.useCallback(weight => setWeight(weight), [])

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const onSubmit = async () => {
        const body = {
            weight,
        };
        dispatch(updateAction(body, user.userInfo._id, user.authToken));
        navigation.goBack();
    };

    return (
        <RN.SafeAreaView style={styles.safeContainer}>
            <AppHeader />

            {/* Logo */}
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
                <Paper.Text
                    style={{
                        fontSize: theme.fontSize["2xl"],
                        color: theme.colors.primary,
                        textAlign: "center",
                        fontFamily: "Rubik-Bold",
                    }}
                >
                    Modifica il tuo peso
                </Paper.Text>

                <Spacing horizontal size="8xl" />

                <RN.View style={styles.pickerContainer}>

<Picker defaultValue={70} min={40} max={130} horizontal unit="kg" onChange={changeWeight}/>

</RN.View>

                <Spacing horizontal size="8xl" />
                <RN.View style={styles.submitButtonWrapper}>
                    <ButtonSubmit label="Salva" onPress={onSubmit} />
                </RN.View>
            </RN.View>
        </RN.SafeAreaView>
    );
};

const styles = RN.StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
    progressBar: {
        position: "absolute",
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
    pickerContainer: {height: 200, justifyContent: 'center' },
    submitButtonWrapper: { justifyContent: "center", alignItems: "center" },
});

export default EditWeight;