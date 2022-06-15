import * as React from 'react';
import * as RN from 'react-native';
import { useTheme } from '../providers/theme.provider';

const Spacing = ({horizontal, size}) => {
    const theme = useTheme()

    return (
        <RN.View style={{width: horizontal ? "100%" : theme.spacing[`${size}`], height: !horizontal ? "100%" : theme.spacing[`${size}`]}} />
    );
}

export default Spacing;
