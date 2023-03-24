import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import DetailTerms from "../../screen/auth/SignUp/DetailTerms";
import SignUp from "../../screen/auth/SignUp/SignUp";
import SignUpStep1 from "../../screen/auth/SignUp/SignUpStep1";
import SignUpStep2 from "../../screen/auth/SignUp/SignUpStep2";
import SignUpStep3 from "../../screen/auth/SignUp/SignUpStep3";
import TakePhoto from "../../screen/TakePhoto";

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
        options={{ title: "회원가입", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="SignUpStep1"
        component={SignUpStep1}
        options={{ title: "회원가입", headerTitleAlign: "center" }}
      />
      <Stack.Screen name="SignUpStep2" component={SignUpStep2} />
      <Stack.Screen name="SignUpStep3" component={SignUpStep3} />

      <Stack.Screen name="DetailTerms" component={DetailTerms} />
      <Stack.Screen
        name="TakePhoto"
        component={TakePhoto}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
