import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Intro from "../screen/Intro";
// import Intro from "../screens/Intro";
// import SignInNavigator from "./SignInNavigator";
// import SignUpNavigator from "./SignUpNavigator";

const Stack = createStackNavigator();

export default function IntroNavigator() {
    return (
        <Stack.Navigator screenOptions={{ presentation: "modal" }}>
            <Stack.Screen
                name="Intro"
                component={Intro}
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name="SignInNavigator"
                component={SignInNavigator}
                options={{
                    title: "",
                    headerShown: false,
                    // headerShown: false,
                }}
            />
            <Stack.Screen
                name="SignUpNavigator"
                component={SignUpNavigator}
                options={{
                    headerShown: false,
                }}
            /> */}
        </Stack.Navigator>
    );
}
