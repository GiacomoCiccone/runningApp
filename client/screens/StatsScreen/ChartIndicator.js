import * as React from "react";
import * as RN from 'react-native'
import { useTheme } from "../../providers/theme.provider";

const ChartIndicator = React.memo(({ scrollX, inputRange, outputRange }) => {
    const theme = useTheme();

    return (
        <RN.View
        style={{
            height: 12,
            aspectRatio: 1,
            borderWidth: theme.border.default,
            borderColor: theme.colors.primary,
            borderRadius: theme.rounded.full,
            overflow: "hidden",
            padding: 1,
        }}
    >
        <RN.Animated.View
            style={{
                height: "100%",
                backgroundColor: theme.colors.primary,
                borderRadius: theme.rounded.full,
                transform: [
                    {
                        translateX: scrollX.interpolate({
                            inputRange: inputRange,
                            outputRange: outputRange,
                        }),
                    },
                ],
            }}
        />

        </RN.View>
                
    );
});

export default ChartIndicator;