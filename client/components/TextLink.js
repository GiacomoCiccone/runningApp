import { useNavigation } from "@react-navigation/native";
import * as RN from "react-native";
import * as Paper from "react-native-paper";
import { useTheme } from "../providers/theme.provider";

const TextLink = ({ screen, params, text, ...props }) => {
    const theme = useTheme();
    const navigation = useNavigation();

    const navigate = () => {
        navigation.navigate(screen, { ...params });
    };

    return (
        <Paper.Text
            onPress={navigate}
            style={[
                styles.text,
                {
                    color: theme.colors.primary,
                    fontSize: theme.fontSize.xs,
                },
            ]}
            {...props}
        >
            {text}
        </Paper.Text>
    );
};

const styles = RN.StyleSheet.create({
    text: { fontFamily: "Rubik-Medium" },
});

export default TextLink;
