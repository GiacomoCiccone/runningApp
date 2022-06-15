import * as Paper from "react-native-paper";
import * as RN from "react-native";
import { useTheme } from "../providers/theme.provider";

const ButtonSubmit = ({ label, onPress, error, style, contentStyle, loading }) => {
    const theme = useTheme();

    return (
        <Paper.Button
            mode="contained"
            style={[styles.button, style]}
            contentStyle={[styles.contentButton, contentStyle]}
            labelStyle={styles.label}
            color={error ? theme.colors.error : theme.colors.primary} 
            uppercase={false}
            onPress={onPress}
            loading={loading}
            disabled={loading}
        >
            {label}
        </Paper.Button>
    );
};

const styles = RN.StyleSheet.create({
    contentButton: { width: 250, height: 50},
    button: {width: 250, height: 50},
    label: { color: "white", }
});

export default ButtonSubmit;
