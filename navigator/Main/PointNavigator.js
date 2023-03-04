import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PointMain from "../../screen/main/setting/point/PointMain";
import ChargePoint from "../../screen/main/setting/point/ChargePoint";
import ModifyPointAccount from "../../screen/main/setting/point/ModifyPointAccount";
import RegistPointAccount from "../../screen/main/setting/point/RegistPointAccount";
import WithdrawalPoint from "../../screen/main/setting/point/WithdrawalPoint";

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
