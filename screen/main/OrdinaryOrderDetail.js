import React, { useContext, useEffect, useState } from "react";
import {
    ScrollView,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import styled from "styled-components/native";
import MainLayout from "../../component/layout/MainLayout";
import PlainText from "../../component/text/PlainText";
import RegistContext from "../../context/RegistContext";
import UserContext from "../../context/UserContext";
import { theme } from "../../styles";
import { getWorkTime, numberWithComma } from "../../utils";
import Checkbox from "expo-checkbox";
import { useForm } from "react-hook-form";
import { REGIST_NAV } from "../../constant";
import LadderIcon from "../../component/icon/LadderIcon";
import SkyIcon from "../../component/icon/SkyIcon";
import DefaultLayout from "../../component/layout/DefaultLayout";
import SubTitleText from "../../component/text/SubTitleText";
import { Entypo } from "@expo/vector-icons";
import HorizontalDivider from "../../component/divider/HorizontalDivider";
import VerticalDivider from "../../component/divider/VerticalDivider";

const Container = styled.View`
    padding-left: 10px;
    padding-right: 10px;
`;

const Wrapper = styled.View`
    margin: 10px 0px;
`;

const Row = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const TextRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const Center = styled.View`
    align-items: center;
`;

const CancleButton = styled.TouchableOpacity`
    border-radius: 50px;
    background-color: aliceblue;
    border: 1px solid ${theme.sub.blue};
    align-items: center;
    margin-top: 10px;
    padding: 3px 0px;
    width: 130px;
`;
const SRow = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`;
const STitle = styled.View`
    width: 25%;
    align-items: center;
`;

const SContent = styled.View`
    width: 75%;
    border: ${(props) =>
            props.borderLine || props.inputBorderLine ? "0px" : "1px"}
        solid ${theme.boxColor};
    padding: 5px;
    background-color: ${(props) => (props.background ? "white" : "")};
`;

const Emergency = styled.View`
    align-items: center;
    margin-top: -5px;
`;

const ButtonContainer = styled.View`
    align-items: center;
`;
const Button = styled.TouchableOpacity`
    background-color: ${theme.sub.blue};
    width: 100px;
    align-items: center;
    border-radius: 5px;
    margin-top: 15px;
    margin-bottom: 10px;
    padding: 10px;
`;

const ProgressBar = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

const TextProgressBar = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 5px;
`;
const Indicator = styled.View`
    background-color: ${(props) => (props.cur ? theme.sub.yellow : "#eee")};
    width: 20px;
    height: 20px;
    border-radius: 10px;
`;

const TextIndicator = styled.View``;

const Bar = styled.View`
    height: 2px;
    background-color: #eee;
    width: 55px;
`;

const order = {
    acceptUser: null,
    address: "서울 마포구 마포대로14길 32 ㅇㅇㅇ",
    bothType: 2,
    createdAt: "2023-03-06T03:22:25.145Z",
    directPhone: "01090665452",
    emergency: false,
    floor: 5,
    id: 28,
    memo: null,
    orderReservation: [[Object]],
    orderStatusId: 2,
    otherAddress: "인천 마포구 마포대로14길 32 ㅇㅇㅇ",
    otherFloor: null,
    phone: "01090665452",
    point: 9000,
    price: 60000,
    quantity: "5톤",
    regionCode: 1,
    registUser: { userName: "고응주" },
    time: null,
    type: "올림",
    userId: 56,
    vehicleType: "스카이",
    volumeType: "quantity",
    workDateTime: "2023-03-07T05:00:00.000Z",
};
function OrdinaryOrderDetail({ navigation, route }) {
    const { registInfo, setRegistInfo } = useContext(RegistContext);
    const { info } = useContext(UserContext);
    const [price, setPrice] = useState(60000);
    const [emergencyOrder, setEmergencyOrder] = useState(false);
    const [isDirectPhone, setIsDirectPhone] = useState(false);
    const { setValue, register, handleSubmit } = useForm();
    const [orderStatus, setOrderStatus] = useState(null);
    console.log("registInfo : ", registInfo);

    console.log(route?.params);
    useEffect(() => {
        setOrderStatus(order.orderStatusId);

        // register("directPhone");
        // register("memo");
    }, []);

    useEffect(() => {
        if (isDirectPhone) {
            setValue("directPhone", info.phone);
        } else {
            setValue("directPhone", null);
        }
    }, [isDirectPhone]);

    useEffect(() => {
        setPrice(60000);
        if (emergencyOrder) {
            setPrice((prev) => prev + prev * 0.2);
        }
    }, [emergencyOrder]);

    const getWorkType = () => {
        const info = registInfo;

        let text = "";
        text = `${info.vehicleType} / ${info.upDown} (${
            info.bothType === 1 ? "내림" : "올림 > 내림"
        })`;
        // return bothType === 1 ;
    };

    // const getWorkTime = () => {
    //     const getDay = (index) => {
    //         switch (index) {
    //             case 0:
    //                 return "일";
    //             case 1:
    //                 return "월";
    //             case 2:
    //                 return "화";
    //             case 3:
    //                 return "수";
    //             case 4:
    //                 return "목";
    //             case 5:
    //                 return "금";
    //             case 6:
    //                 return "토";

    //             default:
    //                 break;
    //         }
    //     };
    //     const info = registInfo;
    //     const workTime = new Date(info.dateTime);
    //     let text = `${workTime.getFullYear()}년 ${
    //         workTime.getMonth() + 1 < 10
    //             ? "0" + (workTime.getMonth() + 1)
    //             : workTime.getMonth() + 1
    //     }월 ${
    //         workTime.getDate() < 10
    //             ? "0" + workTime.getDate()
    //             : workTime.getDate()
    //     }일 (${getDay(workTime.getDay())}) ${
    //         workTime.getHours() < 10
    //             ? "0" + workTime.getHours()
    //             : workTime.getHours()
    //     }:${
    //         workTime.getMinutes() < 10
    //             ? "0" + workTime.getMinutes()
    //             : workTime.getMinutes()
    //     }`;

    //     return text;
    // };

    const getWorkFloor = () => {
        const info = registInfo;

        let text = "";

        if (info.upDown === "양사") {
            text = `${info.floor}층(${
                info.bothType === 1 ? "내림" : "올림"
            }) > ${info.otherFloor}층(${
                info.bothType === 1 ? "올림" : "내림"
            })`;
        } else {
            text = `${info.floor}층`;
        }

        return text;
    };

    const getPrice = () => {
        //TODO: 작업비용
        return `${numberWithComma(price)} AP`;
    };

    const getPoint = () => {
        return `${numberWithComma(price * 0.15)} AP`;
    };

    const onNextStep = ({ directPhone, memo }) => {
        const point = price * 0.15;

        setRegistInfo({
            price,
            point,
            memo: memo || null,
            directPhone: directPhone || info.phone,
            emergency: emergencyOrder,
            ...registInfo,
        });

        navigation.navigate(REGIST_NAV[6]);
    };

    const CancleOrder = () => {};

    const InputRow = ({ title, placeholder, checkBox, defaultValue, type }) => (
        <SRow>
            <STitle>
                <PlainText style={{ fontSize: 18 }}>{title}</PlainText>
            </STitle>
            <SContent
                inputBorderLine={!checkBox}
                borderLine={checkBox}
                background={!checkBox}
            >
                {checkBox ? (
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: -5,
                            marginBottom: -5,
                        }}
                    >
                        <Checkbox
                            style={{
                                width: 28,
                                height: 28,
                                marginRight: 5,
                            }}
                            value={isDirectPhone}
                            onValueChange={setIsDirectPhone}
                            color="#777"
                        />
                        <PlainText style={{ fontSize: 18 }}>
                            핸드폰 번호 동일
                        </PlainText>
                    </View>
                ) : (
                    <TextInput
                        style={{ fontSize: 18 }}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        onChangeText={(text) => setValue(type, text)}
                        keyboardType={
                            type === "memo" ? "default" : "number-pad"
                        }
                    />
                )}
            </SContent>
        </SRow>
    );

    const Divider = () => (
        <Center>
            <HorizontalDivider color={theme.boxColor} thickness={0.5} />
        </Center>
    );
    return (
        <DefaultLayout>
            <ScrollView>
                <TouchableWithoutFeedback>
                    {order.orderStatusId === 1 ? (
                        <Container>
                            <Wrapper center>
                                <Center>
                                    <View style={{ marginLeft: -27 }}>
                                        <Row>
                                            <Entypo
                                                name="check"
                                                size={27}
                                                color={theme.sub.blue}
                                            />
                                            <SubTitleText>
                                                요청 완료
                                            </SubTitleText>
                                        </Row>
                                    </View>
                                    <CancleButton onPress={CancleOrder}>
                                        <PlainText>요청 취소</PlainText>
                                    </CancleButton>
                                </Center>
                            </Wrapper>
                            <Divider />
                            <Wrapper>
                                <TextRow>
                                    <PlainText>작업 시간</PlainText>
                                    <PlainText style={{ color: "#777" }}>
                                        {getWorkTime(
                                            order.workDateTime,
                                            "short"
                                        )}
                                    </PlainText>
                                </TextRow>
                                {order.type === "양사" || true ? (
                                    <>
                                        <TextRow>
                                            <PlainText style={{ width: "25%" }}>
                                                {order.bothType === 1
                                                    ? "내림"
                                                    : "올림"}{" "}
                                                주소
                                            </PlainText>
                                            <PlainText
                                                numberOfLines={1}
                                                style={{
                                                    width: "80%",
                                                    color: "#777",
                                                }}
                                            >
                                                {order.address}
                                            </PlainText>
                                        </TextRow>
                                        <TextRow>
                                            <PlainText style={{ width: "25%" }}>
                                                {order.bothType === 1
                                                    ? "올림"
                                                    : "내림"}{" "}
                                                주소
                                            </PlainText>
                                            <PlainText
                                                numberOfLines={1}
                                                style={{
                                                    width: "80%",
                                                    color: "#777",
                                                }}
                                            >
                                                {order.otherAddress}
                                            </PlainText>
                                        </TextRow>
                                    </>
                                ) : (
                                    <TextRow>
                                        <PlainText style={{ width: "25%" }}>
                                            작업 주소
                                        </PlainText>
                                        <PlainText
                                            style={{
                                                width: "80%",
                                                color: "#777",
                                            }}
                                        >
                                            {getWorkTime(
                                                order.workDateTime,
                                                "short"
                                            )}
                                        </PlainText>
                                    </TextRow>
                                )}
                            </Wrapper>
                            <Divider />
                            <Wrapper>
                                <Center>
                                    <View
                                        style={{
                                            width: 100,
                                            paddingLeft: 3,
                                            paddingRight: 3,
                                            borderLeftWidth: 1,
                                            borderLeftColor: theme.sub.blue,
                                            borderRightWidth: 1,
                                            borderRightColor: theme.sub.blue,
                                            alignItems: "center",
                                            marginTop: 5,
                                        }}
                                    >
                                        <PlainText>작업 내역</PlainText>
                                    </View>
                                </Center>
                                <View
                                    style={{
                                        justifyContent: "space-between",
                                        paddingTop: 3,
                                        paddingBottom: 3,
                                    }}
                                >
                                    <TextRow>
                                        <PlainText>차량 종류</PlainText>
                                        <PlainText>
                                            {order.vehicleType}
                                        </PlainText>
                                    </TextRow>
                                    <TextRow>
                                        <PlainText>작업 종류</PlainText>
                                        <PlainText>{order.type}</PlainText>
                                    </TextRow>
                                    <TextRow>
                                        <PlainText>작업 높이 </PlainText>
                                        <PlainText>
                                            {order.type === "양사"
                                                ? `${order.floor}층 > ${order.otherFloor}층`
                                                : order.floor + "층"}
                                        </PlainText>
                                    </TextRow>
                                    {order.quantity ? (
                                        <TextRow>
                                            <PlainText>작업 물량</PlainText>
                                            <PlainText>
                                                {order.quantity}
                                            </PlainText>
                                        </TextRow>
                                    ) : (
                                        <TextRow>
                                            <PlainText>작업 시간</PlainText>
                                            <PlainText>{order.time}</PlainText>
                                        </TextRow>
                                    )}
                                </View>
                            </Wrapper>
                            <Divider />
                            <Wrapper>
                                <Center>
                                    <View
                                        style={{
                                            width: 120,
                                            paddingLeft: 3,
                                            paddingRight: 3,
                                            borderLeftWidth: 1,
                                            borderLeftColor: theme.sub.blue,
                                            borderRightWidth: 1,
                                            borderRightColor: theme.sub.blue,
                                            alignItems: "center",
                                            marginTop: 5,
                                        }}
                                    >
                                        <PlainText>주문자 정보</PlainText>
                                    </View>
                                </Center>
                                <View
                                    style={{
                                        justifyContent: "space-between",
                                        paddingTop: 3,
                                        paddingBottom: 3,
                                    }}
                                >
                                    <TextRow>
                                        <PlainText>등록자</PlainText>
                                        <PlainText>
                                            {order.registUser.userName}
                                        </PlainText>
                                    </TextRow>
                                    <TextRow>
                                        <PlainText>전화번호</PlainText>
                                        <PlainText>{order.phone}</PlainText>
                                    </TextRow>
                                    <TextRow>
                                        <PlainText>현장번호</PlainText>
                                        <PlainText>
                                            {order.directPhone}
                                        </PlainText>
                                    </TextRow>
                                </View>
                            </Wrapper>
                            <View style={{ marginTop: 15 }}></View>
                            <Wrapper>
                                <TextRow>
                                    <PlainText>작업 AP</PlainText>
                                    <PlainText>
                                        {numberWithComma(order.price)} AP
                                    </PlainText>
                                </TextRow>
                            </Wrapper>
                            <Divider />
                            <Wrapper>
                                <TextRow>
                                    <PlainText style={{ color: "#ef5285" }}>
                                        쿠폰 할인
                                    </PlainText>
                                    <PlainText style={{ color: "#ef5285" }}>
                                        {numberWithComma(20000)} AP
                                    </PlainText>
                                </TextRow>
                                <TextRow>
                                    <PlainText
                                        style={{ color: theme.sub.green }}
                                    >
                                        총 필요 AP
                                    </PlainText>
                                    <PlainText
                                        style={{ color: theme.sub.green }}
                                    >
                                        {numberWithComma(order.price - 20000)}{" "}
                                        AP
                                    </PlainText>
                                </TextRow>
                            </Wrapper>
                            <Divider />
                            <Wrapper>
                                <TextRow>
                                    <SubTitleText
                                        style={{
                                            color: theme.main,
                                        }}
                                    >
                                        결제 금액
                                    </SubTitleText>
                                    <SubTitleText style={{ color: theme.main }}>
                                        {numberWithComma(
                                            order.price -
                                                20000 +
                                                (order.price - 20000) * 0.1
                                        )}{" "}
                                        AP
                                    </SubTitleText>
                                </TextRow>
                            </Wrapper>
                        </Container>
                    ) : (
                        <Container>
                            <ProgressBar>
                                <Indicator cur />
                                <Bar />
                                <Indicator />
                                <Bar />
                                <Indicator />
                                <Bar />
                                <Indicator />
                                <Bar />
                                <Indicator />
                            </ProgressBar>
                            <TextProgressBar>
                                <TextIndicator cur>
                                    <PlainText
                                        style={{
                                            fontSize: 18,
                                            color: theme.main,
                                        }}
                                    >
                                        {" "}
                                        출발 전
                                    </PlainText>
                                </TextIndicator>
                                <TextIndicator>
                                    <PlainText
                                        style={{
                                            fontSize: 18,
                                            color: theme.darkFontColor,
                                        }}
                                    >
                                        {" "}
                                        이동 중
                                    </PlainText>
                                </TextIndicator>
                                <TextIndicator>
                                    <PlainText
                                        style={{
                                            fontSize: 18,
                                            color: theme.darkFontColor,
                                        }}
                                    >
                                        {" "}
                                        작업시작
                                    </PlainText>
                                </TextIndicator>
                                <TextIndicator>
                                    <PlainText
                                        style={{
                                            fontSize: 18,
                                            color: theme.darkFontColor,
                                        }}
                                    >
                                        완료요청
                                    </PlainText>
                                </TextIndicator>
                                <TextIndicator>
                                    <PlainText
                                        style={{
                                            fontSize: 18,
                                            color: theme.darkFontColor,
                                        }}
                                    >
                                        작업완료
                                    </PlainText>
                                </TextIndicator>
                            </TextProgressBar>
                            <View style={{ marginTop: 20, marginBottom: 20 }}>
                                <HorizontalDivider />
                            </View>
                            <View></View>
                        </Container>
                    )}
                </TouchableWithoutFeedback>
            </ScrollView>
        </DefaultLayout>
    );
}

export default OrdinaryOrderDetail;
