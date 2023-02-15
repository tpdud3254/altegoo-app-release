import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import TabIcon from "../component/icon/TabIcons";
import Home from "../screen/main/home/Home";
import RegistWork from "../screen/main/regist/RegistWork";
import SearchAddress from "../screen/main/regist/SearchAddress";
import SelectWorkTheme from "../screen/main/regist/SelectWorkTheme";
import Works from "../screen/main/works/Works";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PlainText from "../component/text/PlainText";
import { View } from "react-native";
import WorkSchedule from "../screen/main/schedule/WorkSchedule";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function TabsNavigator() {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate("DrawerNavigator");
    };

    const onPress2 = () => {
        // navigation.navigate("DrawerNavigator");
        console.log("user info??");
    };
    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: true,
                // headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderTopColor: "rgba(0,0,0,0.3)",
                    paddingTop: 0,
                    height: 70,
                },
                // headerStatusBarHeight: 80,
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={onPress}
                        style={{ marginLeft: 10 }}
                    >
                        <Ionicons name="menu" color="black" size={30} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity
                        onPress={onPress2}
                        style={{ marginRight: 10 }}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <View>
                                <PlainText>고세영 님</PlainText>
                                <PlainText>10,000p</PlainText>
                            </View>
                            <View>
                                <Ionicons
                                    name="person-circle"
                                    color="black"
                                    size={50}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                ),
            }}
        >
            <Tabs.Screen
                name="Home"
                options={{
                    headerTitle: "작업요청 리스트",
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName="home"
                            size={22}
                            focused={focused}
                            iconText="홈"
                        />
                    ),
                }}
                component={Home}
            />
            <Tabs.Screen
                name="TabRegistWork"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName="add-circle"
                            size={24}
                            focused={focused}
                            iconText="작업 등록"
                        />
                    ),
                }}
            >
                {() => (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="SelectWorkTheme"
                            component={SelectWorkTheme}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="RegistWork"
                            component={RegistWork}
                            options={{
                                headerBackTitleVisible: false,
                                title: "작업 등록",
                            }}
                        />
                        <Stack.Screen
                            name="SearchAddress"
                            component={SearchAddress}
                            options={{
                                title: "주소 검색",
                                headerShown: true,
                            }}
                        />
                    </Stack.Navigator>
                )}
            </Tabs.Screen>
            <Tabs.Screen
                name="Works"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName="list"
                            size={24}
                            focused={focused}
                            iconText="내 작업"
                        />
                    ),
                }}
                component={Works}
            />
            <Tabs.Screen
                name="WorkSchedule"
                options={{
                    headerTitle: "작업일정",
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName="calendar"
                            size={24}
                            focused={focused}
                            iconText="작업일정"
                        />
                    ),
                }}
                component={WorkSchedule}
            />
        </Tabs.Navigator>
    );
}
