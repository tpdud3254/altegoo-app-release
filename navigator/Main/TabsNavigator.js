import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Home from "../../screen/main/home/Home";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PlainText from "../../component/text/PlainText";
import { View } from "react-native";
import WorkSchedule from "../../screen/main/schedule/WorkSchedule";
import RegistDone from "../../screen/main/regist/RegistDone";
import UserContext from "../../context/UserContext";
import { ORDINARY } from "../../constant";
import RegistNavigator from "./RegistNavigator";
import SettingNavigator from "./SettingNavigator";
import TabIcon from "../../component/icon/TabIcons";

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
                headerTitleAlign: "center",
                headerShown: true,
                tabBarShowLabel: false,
                tabBarStyle: {
                    paddingTop: 0,
                    height: 70,
                },
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
                                    size={27}
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
                                    size={27}
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
                                    size={27}
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
                                    size={27}
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
                                    size={27}
                                    focused={focused}
                                    iconText="요청목록"
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
                                    iconName="list"
                                    size={27}
                                    focused={focused}
                                    iconText="내 작업"
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
                                    size={27}
                                    focused={focused}
                                    iconText="오더등록"
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
                                    size={27}
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
