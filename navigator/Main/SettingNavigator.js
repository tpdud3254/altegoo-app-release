import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import BlockUser from "../../screen/main/setting/BlockUser";
import Events from "../../screen/main/setting/Events";
import ModifyUserInfo from "../../screen/main/setting/ModifyUserInfo";
import Setting from "../../screen/main/setting/Setting";
import PointNavigator from "./PointNavigator";
import Menus from "../../screen/main/setting/Menus";

const Stack = createStackNavigator();

export default function SettingNavigator() {
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
