import * as React from "react";
import * as Paper from "react-native-paper";
import { useTheme } from "../providers/theme.provider";

const SnackBar = ({ children, type, bottom, ...props }) => {
    const theme = useTheme();
    return (
        <Paper.Snackbar
            {...props}
            theme={{ colors: { accent: "white" } }}
            wrapperStyle={{ zIndex: 9999}}
            style={{
                color: theme.colors.text,
                backgroundColor: theme.colors[type],
                bottom: bottom || 0
            }}
        >
            <Paper.Text style={{ color: "white", fontSize: theme.fontSize.xs }}>{children}</Paper.Text>
        </Paper.Snackbar>
    );
};

export default SnackBar;
