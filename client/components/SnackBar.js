import * as React from "react";
import * as Paper from "react-native-paper";
import * as RN from 'react-native'
import { useTheme } from "../providers/theme.provider";

const SnackBar = ({ children, type, bottom, ...props }) => {
    const theme = useTheme();
    return (
        <Paper.Snackbar
            {...props}
            theme={{ colors: { accent: "white" } }}
            wrapperStyle={styles.wrapper}
            style={{
                color: theme.colors.text,
                backgroundColor: theme.colors[type],
                bottom: bottom || 0,
            }}
        >
            <Paper.Text style={[styles.text, {fontSize: theme.fontSize.xs }]}>
                {children}
            </Paper.Text>
        </Paper.Snackbar>
    );
};

const styles = RN.StyleSheet.create({
    wrapper: { zIndex: 9999 },
    text: {color: "white"}
})

export default SnackBar;
