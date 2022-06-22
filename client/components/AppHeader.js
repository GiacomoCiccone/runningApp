
import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper'

import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../providers/theme.provider';

const AppHeader = () => {
    const theme = useTheme()
    const navigation = useNavigation()

    return (
        <Paper.Appbar style={[styles.header, {width: theme.dimensions.width}]}>
            <Paper.Appbar.BackAction color={theme.colors.text} onPress={() => navigation.goBack()}/>
        </Paper.Appbar>
    );
}

const styles = RN.StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'transparent'
    }
})

export default AppHeader;
