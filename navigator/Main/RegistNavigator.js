import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { REGIST_NAV } from "../../constant";
import Address from "../../screen/Address";
import Payment from "../../screen/main/Payment";
import AddOtherData from "../../screen/main/regist/AddOtherData";
import RegistCompleted from "../../screen/main/regist/RegistCompleted";
import RegistDone from "../../screen/main/regist/RegistDone";
import SearchAddress from "../../screen/main/regist/SearchAddress";
import SelectDateTime from "../../screen/main/regist/SelectDateTime";
import SelectFloor from "../../screen/main/regist/SelectFloor";
import SelectVolume from "../../screen/main/regist/SelectVolume";
import SelectWorkType from "../../screen/main/regist/SelectWorkType";
import { color } from "../../styles";

const Stack = createStackNavigator();

export default function RegistNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: color.sub.blue,
                },
                headerTitleStyle: {
                    color: "white",
                },
                headerTitleAlign: "center",
                headerTintColor: "white",
            }}
        >
            <Stack.Screen
                name={REGIST_NAV[0]}
                component={SelectWorkType}
                options={{ headerTitle: "작업 선택" }}
            />
            <Stack.Screen
                name={REGIST_NAV[1]}
                component={SelectDateTime}
                options={{ headerTitle: "작업 일시" }}
            />
            <Stack.Screen
                name={REGIST_NAV[2]}
                component={SearchAddress}
                options={{ headerTitle: "주소 입력" }}
            />
            <Stack.Screen
                name={REGIST_NAV[3]}
                component={SelectFloor}
                options={{ headerTitle: "층수 선택" }}
            />
            <Stack.Screen
                name={REGIST_NAV[4]}
                component={SelectVolume}
                options={{ headerTitle: "물량/시간 선택" }}
            />
            <Stack.Screen
                name={REGIST_NAV[5]}
                component={AddOtherData}
                options={{ headerTitle: "추가 정보 입력" }}
            />
            <Stack.Screen
                name={REGIST_NAV[6]}
                component={RegistDone}
                options={{ headerTitle: "최종 등록" }}
            />
            <Stack.Screen name={REGIST_NAV[7]} component={Payment} />
            <Stack.Screen
                name={REGIST_NAV[8]}
                component={RegistCompleted}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Address"
                component={Address}
                options={{ headerTitle: "주소 검색" }}
            />
        </Stack.Navigator>
    );
}
