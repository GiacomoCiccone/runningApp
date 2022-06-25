import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";
import ButtonSubmit from "../../components/ButtonSubmit";
import Picker from '../../components/Picker';
import Spacing from "../../components/Spacing";
import { useTheme } from "../../providers/theme.provider";

const WeightScreen = ({ goNext, weight, setWeight }) => {
    const theme = useTheme();

    const changeWeight =React.useCallback(weight => setWeight(weight), [])

    const defaultValue = React.useRef(weight).current

    return (
        <RN.View style={styles.container}>
            <Paper.Text
                style={{
                    fontSize: theme.fontSize["2xl"],
                    color: theme.colors.primary,
                    textAlign: "center",
                    fontFamily: "Rubik-Bold",
                }}
            >
                Qual è il tuo peso?
            </Paper.Text>

            <Spacing horizontal size="8xl" />

            <RN.View style={styles.pickerContainer}>

                <Picker defaultValue={defaultValue} min={40} max={130} horizontal unit="kg" onChange={changeWeight}/>

            </RN.View>

            <Spacing horizontal size="8xl" />

            <RN.View style={styles.submitButtonWrapper}>
                <ButtonSubmit label="Continua" onPress={goNext}/>
            </RN.View>
        </RN.View>
    );
};

const styles = RN.StyleSheet.create({
    container: { flex: 1 },
    pickerContainer: {height: 200, justifyContent: 'center' },
    submitButtonWrapper: { justifyContent: "center", alignItems: "center" },
});

export default WeightScreen;