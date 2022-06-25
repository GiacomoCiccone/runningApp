import * as Moti from "moti";
import * as React from "react";
import * as RN from "react-native";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
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

const CodeInput = ({ error, full, ...props }) => {
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
        <RN.View>
            <CodeField
                cellCount={4}
                rootStyle={{
                    marginVertical: theme.spacing.xl,
                    marginHorizontal: theme.spacing.xl,
                }}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Paper.Text
                        key={index}
                        style={[
                            styles.input,
                            {
                                fontSize: theme.fontSize.sm,
                                backgroundColor:
                                    theme.colors.backgroundElevation,
                                borderRadius: theme.roundness,
                                ...theme.shadowBox[full ? "xl" : "default"],
                                borderWidth: theme.border.default,
                                borderColor: full
                                    ? theme.colors.primary + "1A"
                                    : error
                                    ? theme.colors.error + "1A"
                                    : !isFocused
                                    ? theme.colors.grey + "1A"
                                    : theme.colors.primary + "1A",
                                shadowColor: full
                                    ? theme.colors.primary
                                    : error
                                    ? theme.colors.error
                                    : !isFocused
                                    ? theme.colors.grey
                                    : theme.colors.primary,
                            },
                        ]}
                    >
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Paper.Text>
                )}
                {...props}
            />
            <Moti.AnimatePresence>
                {!!error && (
                    <Moti.MotiText
                        state={animationState}
                        exit={{ opacity: 0 }}
                        exitTransition={{ duration: 100, type: "timing" }}
                        style={[
                            styles.errorText,
                            {
                                color: theme.colors.error,
                                left: theme.spacing.md,
                                fontSize: theme.fontSize.xs,
                            },
                        ]}
                    >
                        {error.message}
                    </Moti.MotiText>
                )}
            </Moti.AnimatePresence>
        </RN.View>
    );
};

const styles = RN.StyleSheet.create({
    input: {
        height: 70,
        width: 50,
        fontFamily: "Rubik-Medium",
        textAlign: "center",
        textAlignVertical: "center",
    },
    errorText: {
        position: "absolute",
        bottom: 0,
        fontFamily: "Rubik-Regular",
    },
});

export default React.memo(CodeInput);
