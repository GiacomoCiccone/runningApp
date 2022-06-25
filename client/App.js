// import AsyncStorage from '@react-native-async-storage/async-storage';
// AsyncStorage.clear()

import "react-native-gesture-handler";
import "react-native-reanimated";

//react
import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";

//expo
import * as ScreenOrientation from "expo-screen-orientation";

//navigation
import { NavigationContainer } from "@react-navigation/native";

//redux
import { Provider as ReduxProvider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import { ThemeContext, ThemeProvider } from "./providers/theme.provider";

import Navigation from "./Navigation";

export default function App() {
    React.useEffect(() => {
        (async () =>
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT
            ))();
    }, []);

    return (
        <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider>
                    <ThemeContext.Consumer>
                        {(theme) => (
                            <RN.View
                                style={[
                                    styles.containerUnderStatusBar,
                                    {
                                        backgroundColor:
                                            theme.colors.background,
                                    },
                                ]}
                            >
                                <Paper.Provider theme={theme}>
                                    <NavigationContainer theme={theme}>
                                        <Navigation />
                                    </NavigationContainer>
                                </Paper.Provider>

                                <RN.StatusBar animated />
                            </RN.View>
                        )}
                    </ThemeContext.Consumer>
                </ThemeProvider>
            </PersistGate>
        </ReduxProvider>
    );
}

const styles = RN.StyleSheet.create({
    containerUnderStatusBar: {
        flex: 1,
    },
});
