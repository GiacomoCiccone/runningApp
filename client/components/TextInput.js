import * as Moti from "moti";
import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";
import { useTheme } from "../providers/theme.provider";

const animationDuration = 400;
const frames = 5;
const frameDuration = animationDuration / frames;

const shakeSequence = [
    { value: 7, type: "timing", duration: frameDuration },
    { value: -7, type: "timing", duration: frameDuration },
    { value: 3.5, type: "timing", duration: frameDuration },
    { value: -3.5, type: "timing", duration: frameDuration },
    { value: 0, type: "timing", duration: frameDuration },
];

const TextInput = ({ error, ...props }) => {
    const theme = useTheme();
    const lastError = React.useRef(null);
    const animationState = Moti.useAnimationState({
        error: {
            translateX: shakeSequence,
            scale: 1,
            opacity: 1,
        },
        noError: {
            opacity: 1,
            scale: 1,
            translateX: 0,
        },
    });

    //this is necessary for the shake animation to start only once per error
    React.useEffect(() => {
        if (error && lastError.current !== error.message) {
            lastError.current = error.message;
            animationState.transitionTo("error");
        } else animationState.transitionTo("noError");

        if (!error) lastError.current = null;
    });

    return (
        <RN.View style={{ height: 90 }}>
            <Paper.TextInput
                error={!!error}
                {...props}
                style={{ backgroundColor: theme.colors.background, fontSize: theme.fontSize.sm }}
            />
            <Moti.AnimatePresence>
                {!!error && (
                    <Moti.MotiText
                        state={animationState}
                        exit={{ opacity: 0 }}
                        exitTransition={{ duration: 100, type: "timing" }}
                        style={{
                            color: theme.colors.error,
                            position: "absolute",
                            bottom: 0,
                            left: theme.spacing.md,
                            fontFamily: "Rubik-Regular",
                            fontSize: theme.fontSize.xs,
                        }}
                    >
                        {error.message}
                    </Moti.MotiText>
                )}
            </Moti.AnimatePresence>
        </RN.View>
    );
};

export default React.memo(TextInput);
