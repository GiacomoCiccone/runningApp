import * as RN from "react-native";
import * as Paper from "react-native-paper";

import { useTheme } from "../providers/theme.provider";

// Custom button with ripple effect
const TouchableRipple = ({ rippleColor, left, right, children, ...props }) => {
    const theme = useTheme()

    return (
        <RN.View style={styles.touchableWrapper}>
            <Paper.TouchableRipple
                rippleColor={(rippleColor || theme.colors.primary) + "3A"}
                borderless
                style={[
                    styles.touchable,
                    {
                        borderRadius: theme.rounded.full,
                        borderTopLeftRadius: left ? 0 : null,
                        borderBottomStartRadius: left ? 0 : null,
                        borderTopRightRadius: right ? 0 : null,
                        borderBottomRightRadius: right ? 0 : null,
                    },
                ]}
                {...props}
            >
                {children}
            </Paper.TouchableRipple>
        </RN.View>
    );
};

const styles = RN.StyleSheet.create({
    touchableWrapper: {
        height: "100%",
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    touchable: {
        width: "100%",
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default TouchableRipple;
