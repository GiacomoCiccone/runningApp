import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";
import * as Moti from "moti";
import { useTheme } from "../providers/theme.provider";

const SelectButton = ({ rippleColor, selected, setSelected, image }) => {
    const theme = useTheme();

    return (
        <Moti.View
            animate={{scale: selected ? 1.1 : 1.0}}
        >
            <Paper.TouchableRipple
                rippleColor={rippleColor}
                style={[
                    styles.button,
                    {
                        backgroundColor: theme.colors.backgroundElevation,
                        borderRadius: theme.roundness,
                    },
                    selected
                        ? { ...theme.shadowBox.xl }
                        : { ...theme.shadowBox.sm },
                ]}
                onPress={setSelected}
            >
                <Moti.MotiImage
                    animate={{ opacity: selected ? 1 : 0.5 }}
                    style={styles.image}
                    source={image}
                />
            </Paper.TouchableRipple>
        </Moti.View>
    );
};

const styles = RN.StyleSheet.create({
    button: { width: 120, height: 150, padding: 10, paddingVertical: 30 },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
});

export default SelectButton;
