import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CompleteOrder from "../../screen/main/CompleteOrder";
import Home from "../../screen/main/home/Home";
import OrderDetail from "../../screen/main/OrderDetail";
import OrderProgress from "../../screen/main/OrderProgress";
import TabsNavigator from "./TabsNavigator";
// import TabsNavigator from "./TabsNavigator";

const Stack = createStackNavigator();

export default function MainNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                presentation: "card",
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
        </Stack.Navigator>
    );
}
