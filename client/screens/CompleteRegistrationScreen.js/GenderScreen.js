import * as RN from "react-native";
import * as Paper from "react-native-paper";
import { FemaleGender, MaleGender } from "../../assets/images";
import ButtonSubmit from "../../components/ButtonSubmit";
import SelectButton from "../../components/SelectButton";
import Spacing from "../../components/Spacing";
import { useTheme } from "../../providers/theme.provider";

const GenderScreen = ({ goNext, gender, setGender }) => {
    const theme = useTheme();

    const selectGender = (gender) => setGender(gender);

    return (
        <RN.View style={styles.container}>
            <Paper.Text
                style={[
                    styles.title,
                    {
                        fontSize: theme.fontSize["2xl"],
                        color: theme.colors.primary,
                    },
                ]}
            >
                Qual è il tuo genere?
            </Paper.Text>

            <Spacing horizontal size="8xl" />

            <RN.View style={styles.buttonsContainer}>
                <SelectButton
                    rippleColor="rgba(147, 214, 244, 0.2)"
                    selected={gender === "male"}
                    setSelected={() => selectGender("male")}
                    image={MaleGender}
                />

                <SelectButton
                    rippleColor="rgba(249, 150, 177, 0.2)"
                    selected={gender === "female"}
                    setSelected={() => selectGender("female")}
                    image={FemaleGender}
                />
            </RN.View>

            <Spacing horizontal size="8xl" />
            <RN.View style={styles.submitButtonWrapper}>
                <ButtonSubmit label="Continua" onPress={goNext} />
            </RN.View>
        </RN.View>
    );
};

const styles = RN.StyleSheet.create({
    container: { flex: 1 },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        height: 200,
    },
    submitButtonWrapper: { justifyContent: "center", alignItems: "center" },
    title: {
        textAlign: "center",
        fontFamily: "Rubik-Bold",
    },
});

export default GenderScreen;
