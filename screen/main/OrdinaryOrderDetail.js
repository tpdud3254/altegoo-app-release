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
import {
    getAsyncStorageToken,
    getWorkTime,
    numberWithComma,
} from "../../utils";
import Checkbox from "expo-checkbox";
import { useForm } from "react-hook-form";
import { REGIST_NAV, VALID } from "../../constant";
import LadderIcon from "../../component/icon/LadderIcon";
import SkyIcon from "../../component/icon/SkyIcon";
import DefaultLayout from "../../component/layout/DefaultLayout";
import SubTitleText from "../../component/text/SubTitleText";
import { Entypo } from "@expo/vector-icons";
import HorizontalDivider from "../../component/divider/HorizontalDivider";
import VerticalDivider from "../../component/divider/VerticalDivider";
import axios from "axios";
import { SERVER } from "../../server";

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

const ordsdfer = {
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
    orderStatusId: 1,
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
    const [user, setUser] = useState({});

    const [order, setOrder] = useState({});
    console.log("registInfo : ", registInfo);

    console.log(route?.params.orderData);
    let interval;
    useEffect(() => {
        setOrderStatus(order.orderStatusId);
        setOrder(route?.params?.orderData);
        getUser();
        interval = setInterval(getWorkInfo, 10000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const getWorkInfo = async () => {
        try {
            const response = await axios.get(SERVER + "/works/work", {
                params: { id: order.id },
                headers: {
                    auth: await getAsyncStorageToken(),
                },
            });

            console.log(response.data);

            const {
                data: { result },
            } = response;

            if (result === VALID) {
                const {
                    data: {
                        data: { work },
                    },
                } = response;
                console.log(work);
                setOrder(work);
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

    const getUser = async () => {
        try {
            const response = await axios.get(SERVER + "/users/user", {
                params: { id: route?.params?.orderData.acceptUser },
                headers: {
                    auth: await getAsyncStorageToken(),
                },
            });

            console.log(response.data);

            const {
                data: { result },
            } = response;

            if (result === VALID) {
                const {
                    data: {
                        data: { user },
                    },
                } = response;
                console.log(user);
                setUser(user);
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

    const CancleOrder = () => {};

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
                                {order.type === "양사" ? (
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
                                                {order.address1}{" "}
                                                {order.detailAddress1}
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
                                                {order.address2}
                                                {order.detailAddress2}
                                            </PlainText>
                                        </TextRow>
                                    </>
                                ) : (
                                    <TextRow>
                                        <PlainText style={{ width: "25%" }}>
                                            작업 주소
                                        </PlainText>
                                        <PlainText
                                            numberOfLines={1}
                                            style={{
                                                width: "80%",
                                                color: "#777",
                                            }}
                                        >
                                            {order.address1}{" "}
                                            {order.detailAddress1}
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
                                <Indicator cur={order.orderStatusId === 1} />
                                <Bar />
                                <Indicator />
                                <Bar />
                                <Indicator cur={order.orderStatusId === 2} />
                                <Bar />
                                <Indicator cur={order.orderStatusId === 3} />
                                <Bar />
                                <Indicator
                                    cur={
                                        order.orderStatusId === 4 ||
                                        order.orderStatusId === 5
                                    }
                                />
                            </ProgressBar>
                            <TextProgressBar>
                                <TextIndicator cur={order.orderStatusId === 1}>
                                    <PlainText
                                        style={{
                                            fontSize: 18,
                                            color:
                                                order.orderStatusId === 1
                                                    ? theme.main
                                                    : theme.darkFontColor,
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
                                <TextIndicator cur={order.orderStatusId === 2}>
                                    <PlainText
                                        style={{
                                            fontSize: 18,
                                            color:
                                                order.orderStatusId === 2
                                                    ? theme.main
                                                    : theme.darkFontColor,
                                        }}
                                    >
                                        {" "}
                                        작업시작
                                    </PlainText>
                                </TextIndicator>
                                <TextIndicator cur={order.orderStatusId === 3}>
                                    <PlainText
                                        style={{
                                            fontSize: 18,
                                            color:
                                                order.orderStatusId === 3
                                                    ? theme.main
                                                    : theme.darkFontColor,
                                        }}
                                    >
                                        완료요청
                                    </PlainText>
                                </TextIndicator>
                                <TextIndicator
                                    cur={
                                        order.orderStatusId === 4 ||
                                        order.orderStatusId === 5
                                    }
                                >
                                    <PlainText
                                        style={{
                                            fontSize: 18,
                                            color:
                                                order.orderStatusId === 4 ||
                                                order.orderStatusId === 5
                                                    ? theme.main
                                                    : theme.darkFontColor,
                                        }}
                                    >
                                        작업완료
                                    </PlainText>
                                </TextIndicator>
                            </TextProgressBar>
                            <View style={{ marginTop: 20, marginBottom: 20 }}>
                                <HorizontalDivider />
                            </View>
                            <View>
                                <View style={{ flexDirection: "row" }}>
                                    {/* <PlainText style={{ fontWeight: "400" }}>
                                        {order.orderStatusId === 1
                                            ? "출발전"
                                            : order.orderStatusId === 2
                                            ? "작업시작"
                                            : order.orderStatusId === 3
                                            ? "완료요청"
                                            : "작업완료"}
                                    </PlainText> */}
                                    <View>
                                        <PlainText>
                                            {order.vehicleType}, {order.type}(
                                            {order.floor}
                                            층),{" "}
                                            {order.volumeType === "time"
                                                ? order.time
                                                : order.quantity}
                                        </PlainText>
                                    </View>
                                </View>
                                <View>
                                    <View style={{ flexDirection: "row" }}>
                                        <PlainText style={{ marginRight: 10 }}>
                                            작업비용
                                        </PlainText>
                                        <PlainText
                                            style={{ fontWeight: "500" }}
                                        >
                                            {numberWithComma(order.price || 0)}
                                            AP
                                        </PlainText>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <PlainText style={{ marginRight: 10 }}>
                                            작업AP
                                        </PlainText>
                                        <PlainText
                                            style={{ fontWeight: "500" }}
                                        >
                                            {numberWithComma(order.point || 0)}
                                            AP
                                        </PlainText>
                                    </View>
                                </View>
                                <View
                                    style={{ marginTop: 20, marginBottom: 20 }}
                                >
                                    <HorizontalDivider />
                                </View>
                                <View>
                                    <View style={{ flexDirection: "row" }}>
                                        <PlainText
                                            style={{ fontWeight: "400" }}
                                        >
                                            작업일시 :{" "}
                                        </PlainText>
                                        <PlainText style={{}}>
                                            {getWorkTime(order.workDateTime)}
                                        </PlainText>
                                    </View>

                                    {order.type === "양사" ? (
                                        <>
                                            <View
                                                style={{ flexDirection: "row" }}
                                            >
                                                <PlainText
                                                    style={{
                                                        fontWeight: "400",
                                                    }}
                                                >
                                                    {(order.bothType === 1
                                                        ? "내림"
                                                        : "올림") +
                                                        " 주소"}{" "}
                                                    :{" "}
                                                </PlainText>
                                                <PlainText style={{}}>
                                                    {order.address1 +
                                                        " " +
                                                        order.detailAddress1}
                                                </PlainText>
                                            </View>
                                            <View
                                                style={{ flexDirection: "row" }}
                                            >
                                                <PlainText
                                                    style={{
                                                        fontWeight: "400",
                                                    }}
                                                >
                                                    {(order.bothType === 1
                                                        ? "올림"
                                                        : "내림") +
                                                        " 주소"}{" "}
                                                    :{" "}
                                                </PlainText>
                                                <PlainText style={{}}>
                                                    {order.address2 +
                                                        " " +
                                                        order.detailAddress2}
                                                </PlainText>
                                            </View>
                                        </>
                                    ) : (
                                        <>
                                            <View
                                                style={{ flexDirection: "row" }}
                                            >
                                                <PlainText
                                                    style={{
                                                        fontWeight: "400",
                                                    }}
                                                >
                                                    작업 주소 :{" "}
                                                </PlainText>
                                                <PlainText style={{}}>
                                                    {order.address1 +
                                                        " " +
                                                        order.detailAddress1}
                                                </PlainText>
                                            </View>
                                        </>
                                    )}
                                    <View style={{ flexDirection: "row" }}>
                                        <PlainText
                                            style={{
                                                fontWeight: "400",
                                            }}
                                        >
                                            전화번호 :{" "}
                                        </PlainText>
                                        <PlainText style={{}}>
                                            {order.phone}
                                        </PlainText>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <PlainText
                                            style={{
                                                fontWeight: "400",
                                            }}
                                        >
                                            특이사항 :{" "}
                                        </PlainText>
                                        <PlainText style={{}}>
                                            {order.memo || "없음"}
                                        </PlainText>
                                    </View>
                                </View>
                                <View
                                    style={{ marginTop: 20, marginBottom: 20 }}
                                >
                                    <HorizontalDivider />
                                </View>
                                <View>
                                    <PlainText style={{ fontWeight: "400" }}>
                                        작업 기사님 정보
                                    </PlainText>
                                    <View style={{ flexDirection: "row" }}>
                                        <PlainText
                                            style={{
                                                fontWeight: "400",
                                            }}
                                        >
                                            기사명 :{" "}
                                        </PlainText>
                                        <PlainText style={{}}>
                                            {user?.userName} 기사님
                                        </PlainText>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <PlainText
                                            style={{
                                                fontWeight: "400",
                                            }}
                                        >
                                            연락처 :{" "}
                                        </PlainText>
                                        <PlainText style={{}}>
                                            {user?.phone}
                                        </PlainText>
                                    </View>
                                    {user?.vehicle ? (
                                        user?.vehicle?.length > 0 ? (
                                            <>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                    }}
                                                >
                                                    <PlainText
                                                        style={{
                                                            fontWeight: "400",
                                                        }}
                                                    >
                                                        차량번호 :{" "}
                                                    </PlainText>
                                                    <PlainText style={{}}>
                                                        123가 1234
                                                    </PlainText>
                                                </View>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                    }}
                                                >
                                                    <PlainText
                                                        style={{
                                                            fontWeight: "400",
                                                        }}
                                                    >
                                                        차량무게 :{" "}
                                                    </PlainText>
                                                    <PlainText style={{}}>
                                                        3ton
                                                    </PlainText>
                                                </View>
                                            </>
                                        ) : null
                                    ) : null}

                                    <View
                                        style={{
                                            marginTop: 20,
                                            marginBottom: 20,
                                        }}
                                    >
                                        <HorizontalDivider />
                                    </View>
                                    <View>
                                        <PlainText
                                            style={{ textAlign: "center" }}
                                        >
                                            {order.orderStatusId === 1
                                                ? "작업 시작 전입니다.\n작업 시작 24시간 이내부터\n취소가 불가능합니다.\n알테구 기사님 정보를 확인해 주세요."
                                                : order.orderStatusId === 2
                                                ? "작업이 시작되었습니다."
                                                : order.orderStatusId === 3
                                                ? "작업이 완료되었습니다."
                                                : "작업이 모두 완료되었습니다.\n알테구 서비스를 이용해주셔서\n감사합니다."}
                                        </PlainText>
                                    </View>
                                </View>
                            </View>
                        </Container>
                    )}
                </TouchableWithoutFeedback>
            </ScrollView>
        </DefaultLayout>
    );
}

export default OrdinaryOrderDetail;
