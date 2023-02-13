import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Intro from "../screen/Intro";
import SignInNavigator from "./SignInNavigator";

const Stack = createStackNavigator();

export default function IntroNavigator() {
    return (
        <Stack.Navigator screenOptions={{ presentation: "modal" }}>
            <Stack.Screen
                name="Intro"
                component={Intro}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignInNavigator"
                component={SignInNavigator}
                options={{
                    title: "",
                    headerShown: false,
                }}
            />
            {/*
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
