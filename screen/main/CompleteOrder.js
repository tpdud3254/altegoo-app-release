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
import { color } from "../../styles";
import {
    getAsyncStorageToken,
    getWorkTime,
    numberWithComma,
} from "../../utils";
import MainLayout from "../../component/layout/MainLayout";
import HorizontalDivider from "../../component/divider/HorizontalDivider";
import SubTitleText from "../../component/text/SubTitleText";
import SubmitButton from "../../component/button/SubmitButton";
import KakaoButton, {
    ButtonContainer,
} from "../../component/button/KakaoButton";
import axios from "axios";
import { SERVER } from "../../constant";
import { VALID } from "../../constant";

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

function CompleteOrder({ route, navigation }) {
    const [order, setOrder] = useState({});

    useEffect(() => {
        setOrder(route?.params?.orderData);
    });

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

    const onClose = () => {
        navigation.replace("TabsNavigator");
    };

    const goToPage = (page, data) => {
        navigation.navigate(page, data);
    };

    const onCompleteOrder = () => {
        Alert.alert("작업이 완료 되었습니다!", "이용해 주셔서 감사합니다. ^^", [
            {
                text: "확인",
                onPress: () => setOrderStatus(5),
            },
        ]);
    };

    const setOrderStatus = async (status) => {
        try {
            const response = await axios.patch(
                SERVER + "/works/status",
                {
                    status, //1: 작업 요청, 2: 작업 예약, 3: 작업 중, 4: 작업 완료
                    id: order.id,
                },
                {
                    headers: {
                        auth: await getAsyncStorageToken(),
                    },
                }
            );

            // console.log(response.data);

            const {
                data: { result },
            } = response;

            if (result === VALID) {
                onClose();
            } else {
                const {
                    data: { msg },
                } = response;

                console.log(msg);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MainLayout>
            <Order
                onPress={() =>
                    goToPage("OrderDetail", {
                        orderData: order,
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
                            {order.address1} {order.detailAddress1}
                        </PlainText>
                    </OrderContent>
                    {order.type === "양사" ? (
                        <OrderContent>
                            <Ionicons name="location" color="#777" size={24} />
                            <PlainText
                                style={{
                                    marginLeft: 5,
                                    fontSize: 19,
                                }}
                                numberOfLines={1}
                            >
                                {order.address2} {order.detailAddress2}
                            </PlainText>
                        </OrderContent>
                    ) : null}
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
                            color={color.main}
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
                            {numberWithComma(order.price || 0)}
                            AP / 수수료 : {numberWithComma(order.point || 0)}
                            AP
                        </PlainText>
                    </OrderContent>
                </OrderWrapper>
            </Order>
            <HorizontalDivider />
            <Container>
                <InProgress>
                    <MaterialCommunityIcons
                        name="progress-check"
                        size={35}
                        color="black"
                    />
                    <PlainText
                        style={{
                            fontSize: 22,
                            color: color.textDark,
                            textAlign: "center",
                            fontWeight: "400",
                        }}
                    >
                        상기 작업이 모두 완료되었습니다.
                    </PlainText>
                </InProgress>

                <Noti>
                    <NotiIcon>
                        <Octicons
                            name="megaphone"
                            size={40}
                            color={color.sub.blue}
                        />
                    </NotiIcon>
                    <NotiText>
                        <SubTitleText
                            style={{
                                fontSize: 21,
                                lineHeight: 28,
                                textAlign: "center",
                                color: color.textDark,
                            }}
                        >
                            작업 내역을 확인하시고{"\n"}작업 내역에 이상이 없을
                            시{"\n"}아래 작업 완료 확인을 눌러주세요!
                            {"\n"}
                        </SubTitleText>
                        <SubTitleText
                            style={{
                                fontSize: 21,
                                lineHeight: 28,
                                textAlign: "center",
                                color: color.main,
                            }}
                        >
                            작업이 정상적이지 않을 경우엔{"\n"}
                            고객센터 버튼을 눌러주세요.
                        </SubTitleText>
                    </NotiText>
                </Noti>
                <ButtonContainer>
                    <SubmitButton
                        text="작업 완료 확인"
                        style={{ width: "80%" }}
                        onPress={onCompleteOrder}
                    />
                    <KakaoButton />
                </ButtonContainer>
            </Container>
        </MainLayout>
    );
}

export default CompleteOrder;
