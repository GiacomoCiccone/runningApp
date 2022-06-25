import { createStackNavigator } from "@react-navigation/stack";

import ForgotPasswordScreen from "../screens/ForgotPassword";
import ResetPasswordScreen from "../screens/ResetPasswordScreen.js";
import UserAuthScreen from "../screens/UserAuthScreen";

const Stack = createStackNavigator();

//App auth navigator
const AuthNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="UserAuth"
            screenOptions={{
                headerShown: false,
                unmountOnBlur: true
            }}
        >
            <Stack.Screen name="UserAuth" component={UserAuthScreen} />

            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
            />

            <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
            />
        </Stack.Navigator>
    );
};

export default AuthNavigation;
