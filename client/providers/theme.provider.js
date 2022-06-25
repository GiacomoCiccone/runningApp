import * as Font from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import * as React from "react";
import { StatusBar, useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import { DarkTheme, LightTheme } from "../common/theme";

//create the context
export const ThemeContext = React.createContext();

//create the provider for this context
export const ThemeProvider = ({ children }) => {
    // Curent theme from preferences
    const themePreference = useSelector((state) => state.preferences.theme);

    // Current Color Scheme
    const colorScheme = useColorScheme();

    // Current theme
    const [theme, setTheme] = React.useState(LightTheme);

    const [fontsLoaded, setFontsLoaded] = React.useState(false);

    const loadFonts = async () => {
        await Font.loadAsync({
            "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
            "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
            "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
            "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
        });
        setFontsLoaded(true);
    };

    React.useEffect(() => {
        loadFonts();
    }, []);

    // Changing theme
    React.useEffect(() => {
        switch (themePreference) {
            case "light":
                setTheme(LightTheme);
                break;
            case "dark":
                setTheme(DarkTheme);
                break;
            default:
                setTheme(colorScheme === "light" ? LightTheme : DarkTheme);
                break;
        }
    }, [themePreference]);

    React.useEffect(() => {
        const navigationBarButtonColor = theme.dark ? "light" : "dark";
        const barStyle = theme.dark ? "light-content" : "dark-content";

        (async () => {
            await NavigationBar.setBackgroundColorAsync(
                theme.colors.background
            );
            await NavigationBar.setButtonStyleAsync(navigationBarButtonColor);

            StatusBar.setBarStyle(barStyle);
            StatusBar.setBackgroundColor(theme.colors.background);
        })();
    }, [theme]);

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
