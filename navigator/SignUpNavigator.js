import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import SignUp from "../screen/auth/SignUp/SignUp";
// import DetailTerms from "../screens/DetailTerms";
// import SignUp from "../screens/SignUp/SignUp";
// import SignUpStep1 from "../screens/SignUp/SignUpStep1";
// import SignUpStep2 from "../screens/SignUp/SignUpStep2";
// import SignUpStep3 from "../screens/SignUp/SignUpStep3";
// import SignUpStep4 from "../screens/SignUp/SignUpStep4";
// import SignUpStep5 from "../screens/SignUp/SignUpStep5";
// import TakePhoto from "../screens/TakePhoto";

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
      {/* <Stack.Screen name="SignUpStep1" component={SignUpStep1} />
      <Stack.Screen name="SignUpStep2" component={SignUpStep2} />
      <Stack.Screen name="SignUpStep3" component={SignUpStep3} />
      <Stack.Screen name="SignUpStep4" component={SignUpStep4} />
      <Stack.Screen
        name="SignUpStep5"
        component={SignUpStep5}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TakePhoto"
        component={TakePhoto}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="DetailTerms" component={DetailTerms} /> */}
    </Stack.Navigator>
  );
}
