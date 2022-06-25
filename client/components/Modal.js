import * as RN from "react-native";
import * as Paper from 'react-native-paper';
import { useTheme } from "../providers/theme.provider";


/*
Modal component for the app
children = content of the modal
setVisible = setter for visibile REQUIRED
visible = visibility of the modal REQUIRED
*/
const Modal = ({
    children,
    visible,
    onDismiss,
    style
}) => {
    
    const theme = useTheme()

    return (
        <Paper.Portal>
        <Paper.Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={[styles.modal, {padding: theme.spacing['2xl'], paddingVertical: theme.spacing['4xl'], borderRadius: theme.roundness, backgroundColor: theme.colors.backgroundElevation}, style]}>
          {children}
        </Paper.Modal>
      </Paper.Portal>
    );
};

const styles = RN.StyleSheet.create({
 modal: {alignSelf: 'center'}
    
});

export default Modal;