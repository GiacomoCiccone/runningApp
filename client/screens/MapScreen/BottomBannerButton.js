import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";
import { useTheme } from "../../providers/theme.provider";

const BottomBannerButton = ({
    backgroundColor,
    labelColor,
    onPress,
    style,
    children,
    ...props
}) => {
    const theme = useTheme();

    return (
        <Paper.Button
            onPress={onPress}
            uppercase={false}
            mode="contained"
            style={[
                {
                    backgroundColor,
                    borderRadius: theme.rounded.full,
                    ...theme.shadowBox.lg,
                },
                style,
            ]}
            contentStyle={{
                height: '100%',
                width: '100%'
            }}
            labelStyle={{
                color: labelColor,
            }}
            {...props}
        >
            {children}
        </Paper.Button>
    );
};

export default BottomBannerButton;
