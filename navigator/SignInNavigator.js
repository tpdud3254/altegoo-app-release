import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import SetPassword from "../screen/auth/SetPassword";
import SignIn from "../screen/auth/SignIn";

const Stack = createStackNavigator();

//TODO: 네이게이션 옵션 presentation 적절하게변경

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
      <Stack.Screen
        name="SetPassword"
        component={SetPassword}
        options={{
          title: "",
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
