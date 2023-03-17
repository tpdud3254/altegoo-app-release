import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CompleteOrder from "../../screen/main/CompleteOrder";
import Home from "../../screen/main/home/Home";
import OrderDetail from "../../screen/main/OrderDetail";
import OrderProgress from "../../screen/main/OrderProgress";
import OrdinaryOrderDetail from "../../screen/main/OrdinaryOrderDetail";
import Payment from "../../screen/main/Payment";
import ChargePoint from "../../screen/main/setting/point/ChargePoint";
import TabsNavigator from "./TabsNavigator";
// import TabsNavigator from "./TabsNavigator";

const Stack = createStackNavigator();

export default function MainNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                presentation: "modal",
                headerShown: false,
            }}
        >
            <Stack.Screen name="TabsNavigator" component={TabsNavigator} />
            <Stack.Screen
                name="OrderDetail"
                component={OrderDetail}
                options={{
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerTitle: "오더 상세",
                }}
            />
            <Stack.Screen
                name="OrderProgress"
                component={OrderProgress}
                options={{
                    headerShown: true,
                    headerTitleAlign: "center",
                }}
            />
            <Stack.Screen
                name="CompleteOrder"
                component={CompleteOrder}
                options={{
                    title: "작업 완료 요청",
                    headerShown: true,
                    headerTitleAlign: "center",
                }}
            />
            <Stack.Screen
                name="OrdinaryOrderDetail"
                component={OrdinaryOrderDetail}
                options={{
                    title: "상세 보기",
                    headerShown: true,
                    headerTitleAlign: "center",
                }}
            />
            <Stack.Screen
                name="Payment"
                component={Payment}
                options={{
                    title: "결제하기",
                    headerShown: false,
                    headerTitleAlign: "center",
                }}
            />
        </Stack.Navigator>
    );
}
