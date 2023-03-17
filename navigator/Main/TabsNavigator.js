import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Home from "../../screen/main/home/Home";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PlainText from "../../component/text/PlainText";
import { Image, View } from "react-native";
import WorkSchedule from "../../screen/main/schedule/WorkSchedule";
import RegistDone from "../../screen/main/regist/RegistDone";
import UserContext from "../../context/UserContext";
import { ORDINARY } from "../../constant";
import RegistNavigator from "./RegistNavigator";
import SettingNavigator from "./SettingNavigator";
import TabIcon from "../../component/icon/TabIcons";
import MyOrderList from "../../screen/main/myOrders/MyOrderList";
import MyOrdinaryOrderList from "../../screen/main/myOrders/MyOrdinaryOrderList";

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
                unmountOnBlur: true,
            }}
        >
            {info.userType === ORDINARY ? (
                <>
                    <Tabs.Screen
                        name="Home"
                        options={{
                            tabBarIcon: ({ focused, color, size }) => (
                                <TabIcon
                                    iconName="home"
                                    size={27}
                                    focused={focused}
                                    iconText="홈"
                                />
                            ),
                            headerTitle: () => (
                                <View style={{ marginBottom: 5 }}>
                                    <Image
                                        style={{
                                            resizeMode: "contain",
                                            width: 200,
                                            height: 55,
                                        }}
                                        source={require(`../../assets/images/logo/text-logo.png`)}
                                    />
                                </View>
                            ),
                            headerStyle: {
                                height: 85,
                            },
                        }}
                        component={Home}
                    />
                    <Tabs.Screen
                        name="MyOrdinaryOrderList"
                        options={{
                            headerTitle: "내 작업",
                            tabBarIcon: ({ focused, color, size }) => (
                                <TabIcon
                                    iconName="list"
                                    size={27}
                                    focused={focused}
                                    iconText="내 작업"
                                />
                            ),
                        }}
                        component={MyOrdinaryOrderList}
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
                            headerShown: false,
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
                            headerTitle: "요청 오더 목록",
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
                        name="MyOrderList"
                        options={{
                            headerTitle: "내 작업",
                            tabBarIcon: ({ focused, color, size }) => (
                                <TabIcon
                                    iconName="list"
                                    size={27}
                                    focused={focused}
                                    iconText="내 작업"
                                />
                            ),
                        }}
                        component={MyOrderList}
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
                            headerShown: false,
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
