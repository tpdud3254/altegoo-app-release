import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import Home from "../../screen/main/home/Home";
import { useNavigation } from "@react-navigation/native";
import WorkSchedule from "../../screen/main/schedule/WorkSchedule";
import RegistDone from "../../screen/main/regist/RegistDone";
import UserContext from "../../context/UserContext";
import { COMPANY, DRIVER, NORMAL, ORDINARY, PERSON } from "../../constant";
import RegistNavigator from "./RegistNavigator";
import SettingNavigator from "./SettingNavigator";
import TabIcon from "../../component/icon/TabIcons";
import MyOrderList from "../../screen/main/myOrders/MyOrderList";
import MyOrdinaryOrderList from "../../screen/main/myOrders/MyOrdinaryOrderList";
import BoldText from "../../component/text/BoldText";
import OrderList from "../../screen/main/orders/OrderList";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

/*
일반, 기업
홈
GNB_01_ON.png / GNB_01_OFF.png
home

작업내역
GNB_02_ON.png / GNB_02_OFF.png
list

내정보
GNB_03_ON.png/GNB_03_OFF.png
setting

기사
홈
GNB_01_ON.png / GNB_01_OFF.png
home

실시간오더
GNB_driver_02_on.png/GNB_driver_02_off.png
order

내 작업
GNB_02_ON.png / GNB_02_OFF.png
list

내정보
GNB_03_ON.png/GNB_03_OFF.png
setting
*/
export default function TabsNavigator({ route }) {
    const { info, setInfo } = useContext(UserContext);

    console.log(info);
    console.log("route.params.refresh : ", route?.params?.refresh);
    const navigation = useNavigation();

    const onPress = () => {
        console.log("user info??");
    };

    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    paddingTop: 0,
                    height: 74,
                },
                unmountOnBlur: true,
                presentation: "transparentModal",
            }}
        >
            {
                //TODO: 나중에 userTYpe 수정
                info.userType === DRIVER || info.userType === PERSON ? (
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
                            initialParams={{ refresh: route?.params?.refresh }}
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
                ) : (
                    <>
                        <Tabs.Screen
                            name="Home"
                            options={{
                                tabBarIcon: ({ focused }) => (
                                    <TabIcon
                                        tabName="home"
                                        focused={focused}
                                        iconText="홈"
                                    />
                                ),
                            }}
                            component={Home}
                        />
                        <Tabs.Screen
                            name="OrderList"
                            options={{
                                headerShown: true,
                                tabBarIcon: ({ focused }) => (
                                    <TabIcon
                                        tabName="list"
                                        focused={focused}
                                        iconText="작업내역"
                                    />
                                ),
                            }}
                            component={OrderList}
                        />
                        <Tabs.Screen
                            name="SettingNavigator"
                            options={{
                                headerShown: false,
                                tabBarIcon: ({ focused }) => (
                                    <TabIcon
                                        tabName="setting"
                                        focused={focused}
                                        iconText="내 정보"
                                    />
                                ),
                            }}
                            component={SettingNavigator}
                        />
                        {/* <Tabs.Screen
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
                        /> */}
                    </>
                )
            }
        </Tabs.Navigator>
    );
}
