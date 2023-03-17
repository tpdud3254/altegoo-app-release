import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import LoginContext from "../../context/LoginContext";
import CompleteOrder from "../../screen/main/CompleteOrder";
import OrderDetail from "../../screen/main/OrderDetail";
import OrderProgress from "../../screen/main/OrderProgress";
import OrdinaryOrderDetail from "../../screen/main/OrdinaryOrderDetail";
import Payment from "../../screen/main/Payment";
import Welcome from "../../screen/main/Welcome";
import TabsNavigator from "./TabsNavigator";

const Stack = createStackNavigator();

export default function MainNavigator() {
    const { firstLogin } = useContext(LoginContext);
    console.log(firstLogin);
    return (
        <Stack.Navigator
            screenOptions={{
                presentation: "modal",
                headerShown: false,
            }}
        >
            {firstLogin ? (
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{
                        headerShown: false,
                        headerTitleAlign: "center",
                    }}
                />
            ) : null}
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
