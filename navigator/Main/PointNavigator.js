import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PointMain from "../../screen/main/setting/point/PointMain";
import ChargePoint from "../../screen/main/setting/point/ChargePoint";
import ModifyPointAccount from "../../screen/main/setting/point/ModifyPointAccount";
import RegistPointAccount from "../../screen/main/setting/point/RegistPointAccount";
import WithdrawalPoint from "../../screen/main/setting/point/WithdrawalPoint";
import PointBreakdown from "../../screen/main/setting/point/PointBreakdown";
import { color } from "../../styles";
import { FONTS } from "../../constant";
import { Image } from "react-native";

const Stack = createStackNavigator();

export default function PointNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                presentation: "transparentModal",
                headerTintColor: color["header-title-text"],
                headerTitleStyle: {
                    fontFamily: FONTS.medium,
                },
                headerStyle: {
                    backgroundColor: color["page-background"],
                },
                headerBackImage: () => (
                    <Image
                        source={require(`../../assets/images/icons/btn_prev.png`)}
                        style={{
                            resizeMode: "contain",
                            width: 25,
                            marginLeft: 5,
                        }}
                    />
                ),
            }}
        >
            <Stack.Screen
                name="ChargePoint"
                component={ChargePoint}
                options={{ title: "포인트 충전" }}
            />
            <Stack.Screen
                name="ModifyPointAccount"
                component={ModifyPointAccount}
                options={{ title: "출금계좌 수정하기" }}
            />
            <Stack.Screen
                name="RegistPointAccount"
                component={RegistPointAccount}
                options={{ title: "계좌등록 하기" }}
            />
            <Stack.Screen
                name="WithdrawalPoint"
                component={WithdrawalPoint}
                options={{ title: "포인트 출금" }}
            />
            <Stack.Screen
                name="PointBreakdown"
                component={PointBreakdown}
                options={{ title: "포인트 사용내역" }}
            />
        </Stack.Navigator>
    );
}
