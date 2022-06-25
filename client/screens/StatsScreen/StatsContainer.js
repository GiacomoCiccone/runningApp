import * as RN from 'react-native';
import { useTheme } from '../../providers/theme.provider';

const StatsContainer = ({children, style}) => {

    const theme = useTheme();

    return (
        <RN.View style={[{padding: theme.spacing.lg, marginVertical: theme.spacing.xl, marginHorizontal: theme.spacing.lg, backgroundColor: theme.colors.backgroundElevation, borderRadius: theme.roundness, ...theme.shadowBox.lg}, style]}>
            {children}
        </RN.View>
    );
}


export default StatsContainer;
