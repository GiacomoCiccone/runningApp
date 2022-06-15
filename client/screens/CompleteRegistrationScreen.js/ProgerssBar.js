import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper'
import { useTheme } from 'react-native-paper';

const ProgerssBar = ({currentPage}) => {
    const theme = useTheme()
    return (
        <>
        <Paper.ProgressBar
        style={[styles.progressBar, { ...theme.shadowBox.lg }]}
        progress={(currentPage + 1) / 3}
    />

    <RN.View
        style={[styles.progressBarSeparator, {
            
            backgroundColor: theme.colors.background,
            left: "33.3%",
        }]}
    />

    <RN.View
        style={[styles.progressBarSeparator, {
            backgroundColor: theme.colors.background,
            left: "66.6%",
        }]}
    />
    </>
    );
}

const styles = RN.StyleSheet.create({
    progressBarSeparator: {
        height: 4,
        width: 3,
        position: "absolute",
    },
    progressBar: {
        position: "absolute",
    },
})

export default ProgerssBar;
