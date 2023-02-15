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
import PointMain from "../screen/main/drawer/point/PointMain";
import ChargePoint from "../screen/main/drawer/point/ChargePoint";
import ModifyPointAccount from "../screen/main/drawer/point/ModifyPointAccount";
import RegistPointAccount from "../screen/main/drawer/point/RegistPointAccount";
import WithdrawalPoint from "../screen/main/drawer/point/WithdrawalPoint";

const Stack = createStackNavigator();

export default function PointNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PointMain" component={PointMain} />
            <Stack.Screen name="ChargePoint" component={ChargePoint} />
            <Stack.Screen
                name="ModifyPointAccount"
                component={ModifyPointAccount}
            />
            <Stack.Screen
                name="RegistPointAccount"
                component={RegistPointAccount}
            />
            <Stack.Screen name="WithdrawalPoint" component={WithdrawalPoint} />
        </Stack.Navigator>
    );
}
