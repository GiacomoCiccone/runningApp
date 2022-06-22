import * as React from 'react';
import * as Paper from 'react-native-paper'
import { useTheme } from '../providers/theme.provider';
import { useNavigation } from '@react-navigation/native';

const TextLink = ({screen, params, text, ...props}) => {
    const theme = useTheme()
    const navigation = useNavigation();

    const navigate = () => {
        navigation.navigate(screen, {...params})
    }

    return (
            <Paper.Text onPress={navigate} style={{color: theme.colors.primary, fontFamily: "Rubik-Medium", fontSize: theme.fontSize.xs}}>{text}</Paper.Text>
    );
}

export default TextLink;
