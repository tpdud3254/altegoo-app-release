import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import BlockUser from "../../screen/main/setting/BlockUser";
import Events from "../../screen/main/setting/Events";
import ModifyUserInfo from "../../screen/main/setting/ModifyUserInfo";
import Setting from "../../screen/main/setting/Setting";
import PointNavigator from "./PointNavigator";
import Menus from "../../screen/main/setting/Menus";
import { FONTS } from "../../constant";
import { color } from "../../styles";
import { Image } from "react-native";
import MemberInformation from "../../screen/main/setting/MemberInformation";
import PointMain from "../../screen/main/setting/point/PointMain";
import PointBreakdown from "../../screen/main/setting/point/PointBreakdown";
import ChargePoint from "../../screen/main/setting/point/ChargePoint";
import WithdrawalPoint from "../../screen/main/setting/point/WithdrawalPoint";
import RegistPointAccount from "../../screen/main/setting/point/RegistPointAccount";
import ModifyPointAccount from "../../screen/main/setting/point/ModifyPointAccount";

const Stack = createStackNavigator();

export default function SettingNavigator() {
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
                name="MemberInformation"
                component={MemberInformation}
                options={{ title: "회원 정보" }}
            />
            <Stack.Screen
                name="PointMain"
                component={PointMain}
                options={{ title: "포인트" }}
            />
            <Stack.Screen
                name="PointBreakdown"
                component={PointBreakdown}
                options={{ title: "포인트 이용내역" }}
            />
            <Stack.Screen
                name="ChargePoint"
                component={ChargePoint}
                options={{ title: "포인트 충전" }}
            />
            <Stack.Screen
                name="WithdrawalPoint"
                component={WithdrawalPoint}
                options={{ title: "포인트 출금" }}
            />
            <Stack.Screen
                name="RegistPointAccount"
                component={RegistPointAccount}
                options={{ title: "계좌등록" }}
            />
            <Stack.Screen
                name="ModifyPointAccount"
                component={ModifyPointAccount}
                options={{ title: "계좌수정" }}
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
                    title: "회원 정보",
                    // title: "회원 정보 수정", TODO: 수정으로 변경
                }}
            />
            <Stack.Screen
                name="Setting"
                component={Setting}
                options={{
                    title: "설정",
                }}
            />
        </Stack.Navigator>
    );
}
