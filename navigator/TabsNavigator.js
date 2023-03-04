import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import TabIcon from "../component/icon/TabIcons";
import Home from "../screen/main/home/Home";
import RegistWork from "../screen/main/regist/RegistWork";
import SearchAddress from "../screen/main/regist/SearchAddress";
import SelectWorkTheme from "../screen/main/regist/SelectWorkTheme";
import SearchWork from "../screen/main/search/SearchWork";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PlainText from "../component/text/PlainText";
import { View } from "react-native";
import WorkSchedule from "../screen/main/schedule/WorkSchedule";
import RegistDone from "../screen/main/regist/RegistDone";
import UserContext from "../context/UserContext";
import { ORDINARY } from "../constant";
import RegistNavigator from "./RegistNavigator";
import SettingNavigator from "./SettingNavigator";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function TabsNavigator() {
    const { info, setInfo } = useContext(UserContext);

    console.log(info);
    const navigation = useNavigation();

    const onPress = () => {
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
                // headerLeft: () => (
                //     <TouchableOpacity
                //         onPress={onPress}
                //         style={{ marginLeft: 10 }}
                //     >
                //         <Ionicons name="menu" color="black" size={30} />
                //     </TouchableOpacity>
                // ),
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={onPress}
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
            {info.userType === ORDINARY ? (
                <>
                    <Tabs.Screen
                        name="Home"
                        options={{
                            headerTitle: "홈",
                            tabBarIcon: ({ focused, color, size }) => (
                                <TabIcon
                                    iconName="home"
                                    size={24}
                                    focused={focused}
                                    iconText="홈"
                                />
                            ),
                        }}
                        component={Home}
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
                    <Tabs.Screen
                        name="TabRegistWork"
                        options={{
                            headerShown: false,
                            tabBarIcon: ({ focused, color, size }) => (
                                <TabIcon
                                    iconName="add-circle"
                                    size={24}
                                    focused={focused}
                                    iconText="작업등록"
                                />
                            ),
                        }}
                        component={RegistNavigator}
                    />
                    <Tabs.Screen
                        name="SettingNavigator"
                        options={{
                            headerTitle: "내 정보",
                            tabBarIcon: ({ focused, color, size }) => (
                                <TabIcon
                                    iconName="person"
                                    size={24}
                                    focused={focused}
                                    iconText="내 정보"
                                />
                            ),
                        }}
                        component={SettingNavigator}
                    />
                </>
            ) : (
                <>
                    <Tabs.Screen
                        name="Home"
                        options={{
                            headerTitle: "작업요청 목록",
                            tabBarIcon: ({ focused, color, size }) => (
                                <TabIcon
                                    iconName="search"
                                    size={24}
                                    focused={focused}
                                    iconText="작업검색"
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
                                    iconText="작업등록"
                                />
                            ),
                        }}
                        component={RegistNavigator}
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
                    <Tabs.Screen
                        name="SettingNavigator"
                        options={{
                            headerTitle: "내 정보",
                            tabBarIcon: ({ focused, color, size }) => (
                                <TabIcon
                                    iconName="person"
                                    size={24}
                                    focused={focused}
                                    iconText="내 정보"
                                />
                            ),
                        }}
                        component={SettingNavigator}
                    />
                </>
            )}
        </Tabs.Navigator>
    );
}
