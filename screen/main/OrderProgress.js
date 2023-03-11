import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Alert } from "react-native";
import LadderIcon from "../../component/icon/LadderIcon";
import SkyIcon from "../../component/icon/SkyIcon";
import PlainText from "../../component/text/PlainText";
import {
    MaterialCommunityIcons,
    Ionicons,
    FontAwesome5,
    Octicons,
    AntDesign,
} from "@expo/vector-icons";
import styled from "styled-components/native";
import { theme } from "../../styles";
import { getWorkTime, numberWithComma } from "../../utils";
import MainLayout from "../../component/layout/MainLayout";
import PlainButton from "../../component/button/PlainButton";
import HorizontalDivider from "../../component/divider/HorizontalDivider";
import SubTitleText from "../../component/text/SubTitleText";
import SubmitButton from "../../component/button/SubmitButton";
import KakaoButton, {
    ButtonContainer,
} from "../../component/button/KakaoButton";

const Order = styled.TouchableOpacity`
    background-color: white;
    border-radius: 10px;
    margin-bottom: 14px;
    opacity: ${(props) => (props.done ? 0.5 : 1)};
`;

const OrderWrapper = styled.View`
    padding: 10px;
`;

const OrderContent = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 3px;
`;

const Container = styled.View`
    margin-top: 10px;
    flex: 1;
    justify-content: space-between;
`;

const Noti = styled.View`
    flex: 1;
    background-color: white;
    align-items: center;
    margin: 15px 0px;
    justify-content: center;
`;

const NotiIcon = styled.View`
    margin-bottom: 15px;
`;
const NotiText = styled.View``;

const InProgress = styled.View`
    align-items: center;
    padding: 10px 0px;
`;

function OrderProgress({ route, navigation }) {
    const [orderStatusId, setOrderStatusId] = useState(2);
    const order = {
        acceptUser: 55,
        address: "서울 관악구 신림동길 3 4츤",
        bothType: 2,
        createdAt: "2023-03-08T01:35:27.631Z",
        directPhone: "01090665452",
        emergency: false,
        floor: 4,
        id: 31,
        memo: null,
        orderReservation: [],
        orderStatusId: 2,
        otherAddress: null,
        otherFloor: null,
        phone: "01090665452",
        point: 9000,
        price: 60000,
        quantity: null,
        regionCode: 1,
        registUser: { userName: "고응주" },
        time: "추가 1시간 당",
        type: "올림",
        userId: 55,
        vehicleType: "스카이",
        volumeType: "time",
        workDateTime: "2023-03-15T06:00:00.000Z",
    };

    console.log(route?.params);

    useEffect(() => {
        if (route?.params?.back) {
            navigation.setOptions({
                headerRight: null,
            });
        } else {
            navigation.setOptions({
                headerLeft: null,
                headerRight: () => (
                    <TouchableOpacity
                        style={{ marginRight: 10 }}
                        onPress={onClose}
                    >
                        <AntDesign
                            name="closecircleo"
                            size={30}
                            color="black"
                        />
                    </TouchableOpacity>
                ),
            });
        }
    }, []);

    useEffect(() => {
        navigation.setOptions({
            title: orderStatusId === 2 ? "작업 시작" : "작업 진행",
        });
    }, [orderStatusId]);

    const onClose = () => {
        navigation.navigate("Home");
    };

    const goToPage = (page, data) => {
        navigation.navigate(page, data);
    };

    const onStart = () => {
        // setStatus(2);
        //출발하기 어케 제어하지? TODO:
    };

    const onStartOrder = () => {
        Alert.alert("작업이 시작되었습니다!", "안전한 작업 부탁드립니다 ^^", [
            {
                text: "확인",
                onPress: () => setStatus(3),
            },
        ]);
    };

    const onOrderDone = () => {
        Alert.alert(
            "작업이 완료 되었습니다!",
            "이번에도 고생 많으셨습니다. ^^",
            [
                {
                    text: "확인",
                    onPress: () => onClose(),
                },
            ]
        );
    };

    const setStatus = (statusId) => {
        console.log(statusId);

        if (statusId === 3) setOrderStatusId(statusId);
    };
    return (
        <MainLayout>
            <Order
                onPress={() =>
                    goToPage("OrderDetail", {
                        orderId: order.id,
                    })
                }
            >
                <OrderWrapper>
                    <OrderContent>
                        {order.vehicleType === "사다리" ? (
                            <LadderIcon />
                        ) : (
                            <SkyIcon />
                        )}
                        <PlainText
                            style={{
                                marginLeft: 5,
                                fontSize: 19,
                            }}
                            numberOfLines={1}
                        >
                            {order.vehicleType} / {order.type}({order.floor}
                            층) /{" "}
                            {order.volumeType === "time"
                                ? order.time
                                : order.quantity}
                        </PlainText>
                    </OrderContent>
                    <OrderContent>
                        <Ionicons name="location" color="#777" size={24} />
                        <PlainText
                            style={{
                                marginLeft: 5,
                                fontSize: 19,
                            }}
                            numberOfLines={1}
                        >
                            {order.address}
                        </PlainText>
                    </OrderContent>
                    <OrderContent>
                        <Ionicons name="time" color="#777" size={24} />
                        <PlainText
                            style={{
                                marginLeft: 5,
                                fontSize: 19,
                            }}
                            numberOfLines={1}
                        >
                            {getWorkTime(order.workDateTime)}
                        </PlainText>
                    </OrderContent>
                    <OrderContent>
                        <FontAwesome5
                            name="coins"
                            color={theme.main}
                            size={24}
                        />
                        <PlainText
                            style={{
                                marginLeft: 5,
                                fontSize: 19,
                                fontWeight: "400",
                            }}
                            numberOfLines={1}
                        >
                            {numberWithComma(order.price)}
                            AP / 수수료 : {numberWithComma(order.point)}
                            AP
                        </PlainText>
                    </OrderContent>
                </OrderWrapper>
            </Order>
            <HorizontalDivider />
            <Container>
                {orderStatusId === 2 ? (
                    <PlainButton text="출발하기" onPress={onStart} />
                ) : (
                    <InProgress>
                        <MaterialCommunityIcons
                            name="progress-wrench"
                            size={35}
                            color="black"
                        />
                        <PlainText
                            style={{
                                fontSize: 22,
                                color: theme.darkFontColor,
                                textAlign: "center",
                                fontWeight: "400",
                            }}
                        >
                            현재 작업이 진행 중 입니다.
                        </PlainText>
                    </InProgress>
                )}

                <Noti>
                    <NotiIcon>
                        <Octicons
                            name="megaphone"
                            size={40}
                            color={theme.sub.blue}
                        />
                    </NotiIcon>
                    {orderStatusId === 2 ? (
                        <NotiText>
                            <SubTitleText
                                style={{
                                    fontSize: 21,
                                    lineHeight: 28,
                                    textAlign: "center",
                                    color: theme.darkFontColor,
                                }}
                            >
                                작업이 시작될 시간입니다.{"\n"}현장에
                                도착하셨나요?
                                {"\n"}
                            </SubTitleText>
                            <SubTitleText
                                style={{
                                    fontSize: 21,
                                    lineHeight: 28,
                                    textAlign: "center",
                                    color: theme.main,
                                }}
                            >
                                작업 시작 버튼을 누르지 않으면{"\n"}비용이
                                지급되지 않으니{"\n"}작업을 진행하기 전에 꼭!!!
                                {"\n"}
                                작업 시작 버튼을 눌러주세요!
                            </SubTitleText>
                        </NotiText>
                    ) : (
                        <NotiText>
                            <SubTitleText
                                style={{
                                    fontSize: 21,
                                    lineHeight: 28,
                                    textAlign: "center",

                                    color: theme.main,
                                }}
                            >
                                작업을 완료하셨으면{"\n"}꼭!! 작업 완료 버튼을
                                눌러주세요!
                                {"\n"}
                            </SubTitleText>
                            <SubTitleText
                                style={{
                                    fontSize: 21,
                                    lineHeight: 28,
                                    textAlign: "center",
                                    color: theme.darkFontColor,
                                }}
                            >
                                작업 등록자 확인 후 비용이{"\n"}지급될
                                예정입니다.
                            </SubTitleText>
                        </NotiText>
                    )}
                </Noti>
                <SubmitButton
                    text={orderStatusId === 2 ? "작업 시작" : "작업 완료"}
                    onPress={orderStatusId === 2 ? onStartOrder : onOrderDone}
                />
            </Container>
        </MainLayout>
    );
}

export default OrderProgress;
