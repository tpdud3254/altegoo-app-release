import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import LoadingLayout from "../../component/layout/LoadingLayout";
import { FONTS, VALID } from "../../constant";
import LoginContext from "../../context/LoginContext";
import Charge from "../../screen/main/Charge";
import CompleteOrder from "../../screen/main/CompleteOrder";
import OrderProgress from "../../screen/main/OrderProgress";
import OrdinaryOrderDetail from "../../screen/main/OrdinaryOrderDetail";
import Payment from "../../screen/main/Payment";
import Welcome from "../../screen/main/Welcome";
import { SERVER } from "../../constant";
import { checkPosition, getAsyncStorageToken } from "../../utils";
import TabsNavigator from "./TabsNavigator";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Image, Platform } from "react-native";
import { AndroidNotificationVisibility } from "expo-notifications";
import { color } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import OrderDetail from "../../screen/main/orders/OrderDetail";

Location.watchPositionAsync(
    {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000 * 10, //TODO: 나중에 수치 변경
        distanceInterval: 1000, //TODO: 나중에 수치 변경
    },
    async (position) => {
        const {
            coords: { latitude, longitude },
        } = position;

        console.log("watchPositionAsync : ", latitude, longitude);
        checkPosition({ latitude, longitude });
    }
);

const Stack = createStackNavigator();

export default function MainNavigator() {
    const [loading, setLoading] = useState(true);
    const { firstLogin } = useContext(LoginContext);
    const [acceptOrderList, setAcceptOrderList] = useState([]);
    const [registOrderList, setRegistOrderList] = useState([]);
    const notificationListener = useRef();
    const responseListener = useRef();
    const navigation = useNavigation();

    useEffect(() => {
        registerForPushNotificationsAsync().then(async (token) => {
            try {
                const response = await axios.post(
                    SERVER + "/push/token",
                    {
                        token,
                    },
                    {
                        headers: {
                            auth: await getAsyncStorageToken(),
                        },
                    }
                );

                console.log(response.data);
            } catch (error) {
                console.log("error : ", error);
            }
        });

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                console.log(
                    "addNotificationReceivedListener notification : ",
                    notification
                );
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    console.log(
                        "addNotificationResponseReceivedListener response : ",
                        response
                    );

                    if (response?.notification?.request?.content?.data) {
                        const pushData =
                            response.notification.request.content.data;

                        if (pushData.screen === "NoticeDetail") {
                            //TODO: 공지 추가
                            console.log(pushData.noticeId);
                            // navigation.navigate("NoticeDetail");
                        } else if (pushData.screen === "Home") {
                            navigation.navigate("TabsNavigator");
                            //TODO: 리프레쉬
                        } else if (
                            pushData.screen === "OrderProgress" ||
                            pushData.screen === "OrderDetail" ||
                            pushData.screen === "CompleteOrder"
                        ) {
                            navigation.navigate(pushData.screen, {
                                orderData: pushData.order,
                            });
                        } else {
                            navigation.navigate("TabsNavigator");
                        }
                    }
                }
            );
        //TODO: wake lock 추가 (https://www.npmjs.com/package/react-native-android-wake-lock?activeTab=readme)

        //init
        setAcceptOrderList([]);
        setRegistOrderList([]);
        setLoading(true);

        //작업 예약 중인 리스트 먼저 받아오기
        getAcceptOrderList();

        return () => {
            if (
                typeof notificationListener.current !== "undefined" &&
                typeof responseListener.current !== "undefined"
            ) {
                Notifications.removeNotificationSubscription(
                    notificationListener.current
                );
                Notifications.removeNotificationSubscription(
                    responseListener.current
                );
            }
        };
    }, []);

    const registerForPushNotificationsAsync = async () => {
        let token;

        if (Device.isDevice) {
            token = (
                await Notifications.getExpoPushTokenAsync({
                    projectId: "0d74eebd-b11d-421e-bce6-587423f34de3",
                })
            ).data;
            console.log(token);
        } else {
            alert("Must use physical device for Push Notifications");
        }

        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: color.main,
                lockscreenVisibility: AndroidNotificationVisibility.PUBLIC,
            });
        }

        return token;
    };

    const getAcceptOrderList = async () => {
        try {
            const response = await axios.get(SERVER + "/works/mylist/accept", {
                headers: {
                    auth: await getAsyncStorageToken(),
                },
            });

            // console.log(response.data);

            const {
                data: { result },
            } = response;

            if (result === VALID) {
                const {
                    data: {
                        data: { list },
                    },
                } = response;

                console.log(list);
                const newList = [];
                list.map((order, index) => {
                    if (
                        order.orderStatusId === 2 ||
                        order.orderStatusId === 3 ||
                        order.orderStatusId === 4
                    ) {
                        newList.push(order);
                    }
                });

                setAcceptOrderList(newList);

                console.log("acceptOrderList : ", newList);
                if (newList.length < 1) getRegistOrderList();
                else setLoading(false);
            } else {
                const {
                    data: { msg },
                } = response;

                console.log(msg);
                getRegistOrderList();
            }
        } catch (error) {
            console.log(error);
            getRegistOrderList();
        }
    };

    const getRegistOrderList = async () => {
        try {
            const response = await axios.get(SERVER + "/works/mylist/regist", {
                headers: {
                    auth: await getAsyncStorageToken(),
                },
            });

            // console.log(response.data);

            const {
                data: { result },
            } = response;

            if (result === VALID) {
                const {
                    data: {
                        data: { list },
                    },
                } = response;

                console.log("registlist:", list);

                setRegistOrderList(list);
                setLoading(false);
            } else {
                const {
                    data: { msg },
                } = response;

                console.log(msg);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    return (
        <>
            {loading ? (
                <LoadingLayout />
            ) : (
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

                    {acceptOrderList.length > 0 ? (
                        <Stack.Screen
                            name="IntroOrderProgress"
                            component={OrderProgress}
                            options={{
                                headerShown: true,
                                headerTitleAlign: "center",
                            }}
                            initialParams={{
                                orderData: { ...acceptOrderList[0] },
                            }}
                        />
                    ) : null}

                    {registOrderList.length > 0 ? (
                        <Stack.Screen
                            name="IntroCompleteOrder"
                            component={CompleteOrder}
                            options={{
                                title: "작업 완료 요청",
                                headerShown: true,
                                headerTitleAlign: "center",
                            }}
                            initialParams={{
                                orderData: { ...registOrderList[0] },
                            }}
                        />
                    ) : null}
                    <Stack.Screen
                        name="TabsNavigator"
                        component={TabsNavigator}
                    />
                    <Stack.Screen
                        name="OrderDetail"
                        component={OrderDetail}
                        options={{
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
                            headerTitle: "오더 현황",
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
                    <Stack.Screen
                        name="Charge"
                        component={Charge}
                        options={{
                            title: "결제하기",
                            headerShown: false,
                            headerTitleAlign: "center",
                        }}
                    />
                </Stack.Navigator>
            )}
        </>
    );
}
