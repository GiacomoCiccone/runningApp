
import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper'

import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../providers/theme.provider';

const AppHeader = ({title}) => {
    const theme = useTheme()
    const navigation = useNavigation()

    return (
        <Paper.Appbar style={[styles.header, {width: theme.dimensions.width}]}>
            <Paper.Appbar.BackAction style={styles.headerBack} color={theme.colors.text} onPress={() => navigation.goBack()}/>
            
           {title && <RN.View
            >
                <Paper.Text
                    style={{
                        fontFamily: "Rubik-Medium",
                        fontSize: theme.fontSize.xl,
                    }}
                >
                    {title}
                </Paper.Text>
            </RN.View>}
        </Paper.Appbar>
    );
}

const styles = RN.StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerBack: {position: 'absolute', left: 0}
})

export default AppHeader;
