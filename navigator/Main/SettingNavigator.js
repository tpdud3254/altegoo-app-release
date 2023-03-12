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
        <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
            <Stack.Screen
                name="Menus"
                options={{
                    title: "내 정보",
                }}
                component={Menus}
            />
            <Stack.Screen
                name="BlockUser"
                component={BlockUser}
                options={{
                    title: "부정당 회원",
                }}
            />
            <Stack.Screen
                name="Events"
                component={Events}
                options={{
                    title: "이벤트",
                }}
            />
            <Stack.Screen
                name="ModifyUserInfo"
                component={ModifyUserInfo}
                options={{
                    title: "회원 정보 수정",
                }}
            />
            <Stack.Screen
                name="Setting"
                component={Setting}
                options={{
                    title: "설정",
                }}
            />
            <Stack.Screen
                name="PointNavigator"
                component={PointNavigator}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
