import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "../screen/main/home/Home";
import TabsNavigator from "./TabsNavigator";
// import TabsNavigator from "./TabsNavigator";

const Stack = createStackNavigator();

export default function MainNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{ presentation: "card", headerShown: false }}
        >
            <Stack.Screen name="TabsNavigator" component={TabsNavigator} />
        </Stack.Navigator>
    );
}
