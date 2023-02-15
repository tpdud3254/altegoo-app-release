import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
// import Room from "../screens/Room";
// import Rooms from "../screens/Rooms";
import { Ionicons } from "@expo/vector-icons";
import Menus from "../screen/main/drawer/Menus";

const Stack = createStackNavigator();

export default function DrawerNavigator() {
    return (
        <Stack.Navigator screenOptions={{}}>
            <Stack.Screen
                name="Menus"
                options={{
                    headerBackImage: ({ tintColor }) => (
                        <Ionicons
                            color={tintColor}
                            name="chevron-down"
                            size={28}
                        />
                    ),
                }}
                component={Menus}
            />
        </Stack.Navigator>
    );
}
