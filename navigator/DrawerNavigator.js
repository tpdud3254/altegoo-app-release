import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
// import Room from "../screens/Room";
// import Rooms from "../screens/Rooms";
import { Ionicons } from "@expo/vector-icons";
import Menus from "../screen/main/drawer/Menus";
import BlockUser from "../screen/main/drawer/BlockUser";
import Events from "../screen/main/drawer/Events";
import ModifyUserInfo from "../screen/main/drawer/ModifyUserInfo";
import Setting from "../screen/main/drawer/Setting";
import PointNavigator from "./PointNavigator";

const Stack = createStackNavigator();

export default function DrawerNavigator() {
    return (
        <Stack.Navigator>
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
            <Stack.Screen name="BlockUser" component={BlockUser} />
            <Stack.Screen name="Events" component={Events} />
            <Stack.Screen name="ModifyUserInfo" component={ModifyUserInfo} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="PointNavigator" component={PointNavigator} />
        </Stack.Navigator>
    );
}
