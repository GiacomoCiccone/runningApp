import * as React from "react";
import { LightTheme, DarkTheme } from "../common/theme";
import { useColorScheme } from 'react-native';
import * as Font from 'expo-font';

//create the context
export const ThemeContext = React.createContext();

//create the provider for this context
export const ThemeProvider = ({ children }) => {
    // Current Color Scheme
    const colorScheme = useColorScheme();

    // Current theme
    const [theme, setTheme] = React.useState(LightTheme);

    const [fontsLoaded, setFontsLoaded] = React.useState(false);

    const loadFonts = async () => {
        await Font.loadAsync({
          'Rubik-Bold': require('../assets/fonts/Rubik-Bold.ttf'),
          'Rubik-Light': require('../assets/fonts/Rubik-Light.ttf'),
          'Rubik-Medium': require('../assets/fonts/Rubik-Medium.ttf'),
          'Rubik-Regular': require('../assets/fonts/Rubik-Regular.ttf')
        });
        setFontsLoaded(true);
      }

    React.useEffect(() => {
        loadFonts()
    }, [])

    // Changing theme
    React.useEffect(() => {
        setTheme(colorScheme === 'light' ? LightTheme : DarkTheme)
    }, [colorScheme]);
    
    return (
        <ThemeContext.Provider value={theme}>
            {fontsLoaded && children}
        </ThemeContext.Provider>
    );
};

// consume the context
// Must be used inside a ThemeProvider
export const useTheme = () => {
    const context = React.useContext(ThemeContext);

    if (!context) {
        throw Error("You must use useTheme inside a Theme Provider");
    }

    return context;
};