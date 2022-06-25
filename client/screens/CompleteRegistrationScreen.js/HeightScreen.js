import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";
import ButtonSubmit from "../../components/ButtonSubmit";
import Picker from "../../components/Picker";
import Spacing from "../../components/Spacing";
import { useTheme } from "../../providers/theme.provider";

const HeightScreen = ({ goNext, height, setHeight }) => {
    const theme = useTheme();

    const changeheight = React.useCallback((height) => setHeight(height), []);

    const defaultValue = React.useRef(height).current;

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
                Qual è la tua altezza?
            </Paper.Text>

            <Spacing horizontal size="3xl" />
            <RN.View style={styles.contentContainer}>
                <RN.View style={styles.pickerContainer}>
                    <Picker
                        defaultValue={defaultValue}
                        min={100}
                        max={210}
                        unit="cm"
                        onChange={changeheight}
                    />
                </RN.View>
            </RN.View>

            <RN.View style={styles.submitButtonWrapper}>
                <ButtonSubmit label="Continua" onPress={goNext} />
            </RN.View>
        </RN.View>
    );
};

const styles = RN.StyleSheet.create({
    container: { flex: 1 },
    pickerContainer: { height: "100%" },
    contentContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    submitButtonWrapper: {
        justifyContent: "center",
        alignItems: "center",
        height: 150,
    },
    title: {
        textAlign: "center",
        fontFamily: "Rubik-Bold",
    },
});

export default HeightScreen;
