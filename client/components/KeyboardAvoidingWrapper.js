import * as React from 'react';
import * as RN from 'react-native';

//This component is the wrapper for forms that need keyboard interaction
const KeyboardAvoidingWrapper = ({children}) => {

    const dismissKeyboard = React.useCallback(() => {
        RN.Keyboard.dismiss()
    }, [])

    return (
        <RN.KeyboardAvoidingView  behavior={RN.Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={RN.Platform.OS === "ios" ? 64 : 0} style={styles.container}>
            <RN.ScrollView showsVerticalScrollIndicator={false} overScrollMode="never" contentContainerStyle={styles.scrollviewContent}>
                <RN.TouchableWithoutFeedback onPress={dismissKeyboard}>
                {children}
                </RN.TouchableWithoutFeedback>

            </RN.ScrollView>
        </RN.KeyboardAvoidingView>
    );
}

const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    scrollviewContent: {
        flexGrow: 1
    }
})

export default KeyboardAvoidingWrapper;
