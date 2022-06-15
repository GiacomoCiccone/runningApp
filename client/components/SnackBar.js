import * as React from "react";
import * as Paper from "react-native-paper";
import { useTheme } from "../providers/theme.provider";

const SnackBar = ({ children, type, ...props }) => {
    const theme = useTheme();
    return (
        <Paper.Snackbar
            {...props}
            theme={{ colors: { accent: "white" } }}
            wrapperStyle={{ zIndex: 999 }}
            style={{
                color: theme.colors.text,
                backgroundColor: theme.colors[type],
            }}
        >
            <Paper.Text style={{ color: "white" }}>{children}</Paper.Text>
        </Paper.Snackbar>
    );
};

export default SnackBar;
