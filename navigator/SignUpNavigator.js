import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import DetailTerms from "../screen/auth/SignUp/DetailTerms";
import SignUp from "../screen/auth/SignUp/SignUp";
import SignUpStep1 from "../screen/auth/SignUp/SignUpStep1";
import SignUpStep2 from "../screen/auth/SignUp/SignUpStep2";
import SignUpStep3 from "../screen/auth/SignUp/SignUpStep3";
import SignUpStep4 from "../screen/auth/SignUp/SignUpStep4";
import SignUpStep5 from "../screen/auth/SignUp/SignUpStep5";

const Stack = createStackNavigator();

export default function SignUpNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                title: "",
                headerBackTitleVisible: false,
                headerShadowVisible: false,
                headerTintColor: "black",
                presentation: "modal",
            }}
        >
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ title: "알테구 회원가입" }}
            />
            <Stack.Screen name="SignUpStep1" component={SignUpStep1} />
            <Stack.Screen name="SignUpStep2" component={SignUpStep2} />
            <Stack.Screen name="SignUpStep3" component={SignUpStep3} />
            <Stack.Screen name="SignUpStep4" component={SignUpStep4} />
            <Stack.Screen name="DetailTerms" component={DetailTerms} />

            {/*
      <Stack.Screen
        name="TakePhoto"
        component={TakePhoto}
        options={{ headerShown: false }}
      />*/}
        </Stack.Navigator>
    );
}
