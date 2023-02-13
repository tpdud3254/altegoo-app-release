import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import SignIn from "../screen/auth/SignIn";
// import SetPassword from "../screens/SetPassword";
// import SignIn from "../screens/SignIn";

const Stack = createStackNavigator();

export default function SignInNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                presentation: "modal",
            }}
        >
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                    title: "",
                    headerShadowVisible: false,
                }}
            />
            {/* <Stack.Screen
                name="SetPassword"
                component={SetPassword}
                options={{
                    title: "",
                    headerShadowVisible: false,
                }}
            /> */}
        </Stack.Navigator>
    );
}
