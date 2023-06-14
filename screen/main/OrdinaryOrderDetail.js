import React, { useContext, useEffect, useState } from "react";
import { ScrollView, TouchableWithoutFeedback, View } from "react-native";
import styled from "styled-components/native";
import MediumText from "../../component/text/MediumText";
import RegistContext from "../../context/RegistContext";
import UserContext from "../../context/UserContext";
import { color } from "../../styles";
import {
    getAsyncStorageToken,
    getWorkTime,
    numberWithComma,
} from "../../utils";
import { useForm } from "react-hook-form";
import { VALID } from "../../constant";
import DefaultLayout from "../../component/layout/DefaultLayout";
import SubTitleText from "../../component/text/SubTitleText";
import { Entypo } from "@expo/vector-icons";
import HorizontalDivider from "../../component/divider/HorizontalDivider";
import axios from "axios";
import { SERVER } from "../../constant";

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
    border: 1px solid ${color.sub.blue};
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
        solid ${color.border};
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
    background-color: ${color.sub.blue};
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
    background-color: ${(props) => (props.cur ? color.sub.yellow : "#eee")};
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

    const CancleOrder = async (orderId) => {
        try {
            const response = await axios.patch(
                SERVER + "/works/remove",
                {
                    id: orderId,
                },
                {
                    headers: {
                        auth: await getAsyncStorageToken(),
                    },
                }
            );

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

                //TODO: 처리
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

    const Divider = () => (
        <Center>
            <HorizontalDivider color={color.border} thickness={0.5} />
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
                                                color={color.sub.blue}
                                            />
                                            <SubTitleText>
                                                요청 완료
                                            </SubTitleText>
                                        </Row>
                                    </View>
                                    <CancleButton
                                        onPress={() => CancleOrder(order.id)}
                                    >
                                        <MediumText>요청 취소</MediumText>
                                    </CancleButton>
                                </Center>
                            </Wrapper>
                            <Divider />
                            <Wrapper>
                                <TextRow>
                                    <MediumText>작업 시간</MediumText>
                                    <MediumText style={{ color: "#777" }}>
                                        {getWorkTime(
                                            order.workDateTime,
                                            "short"
                                        )}
                                    </MediumText>
                                </TextRow>
                                {order.type === "양사" ? (
                                    <>
                                        <TextRow>
                                            <MediumText
                                                style={{ width: "25%" }}
                                            >
                                                {order.bothType === 1
                                                    ? "내림"
                                                    : "올림"}{" "}
                                                주소
                                            </MediumText>
                                            <MediumText
                                                numberOfLines={1}
                                                style={{
                                                    width: "80%",
                                                    color: "#777",
                                                }}
                                            >
                                                {order.address1}{" "}
                                                {order.detailAddress1}
                                            </MediumText>
                                        </TextRow>
                                        <TextRow>
                                            <MediumText
                                                style={{ width: "25%" }}
                                            >
                                                {order.bothType === 1
                                                    ? "올림"
                                                    : "내림"}{" "}
                                                주소
                                            </MediumText>
                                            <MediumText
                                                numberOfLines={1}
                                                style={{
                                                    width: "80%",
                                                    color: "#777",
                                                }}
                                            >
                                                {order.address2}
                                                {order.detailAddress2}
                                            </MediumText>
                                        </TextRow>
                                    </>
                                ) : (
                                    <TextRow>
                                        <MediumText style={{ width: "25%" }}>
                                            작업 주소
                                        </MediumText>
                                        <MediumText
                                            numberOfLines={1}
                                            style={{
                                                width: "80%",
                                                color: "#777",
                                            }}
                                        >
                                            {order.address1}{" "}
                                            {order.detailAddress1}
                                        </MediumText>
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
                                            borderLeftColor: color.sub.blue,
                                            borderRightWidth: 1,
                                            borderRightColor: color.sub.blue,
                                            alignItems: "center",
                                            marginTop: 5,
                                        }}
                                    >
                                        <MediumText>작업 내역</MediumText>
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
                                        <MediumText>차량 종류</MediumText>
                                        <MediumText>
                                            {order.vehicleType}
                                        </MediumText>
                                    </TextRow>
                                    <TextRow>
                                        <MediumText>작업 종류</MediumText>
                                        <MediumText>{order.type}</MediumText>
                                    </TextRow>
                                    <TextRow>
                                        <MediumText>작업 높이 </MediumText>
                                        <MediumText>
                                            {order.type === "양사"
                                                ? `${order.floor}층 > ${order.otherFloor}층`
                                                : order.floor + "층"}
                                        </MediumText>
                                    </TextRow>
                                    {order.quantity ? (
                                        <TextRow>
                                            <MediumText>작업 물량</MediumText>
                                            <MediumText>
                                                {order.quantity}
                                            </MediumText>
                                        </TextRow>
                                    ) : (
                                        <TextRow>
                                            <MediumText>작업 시간</MediumText>
                                            <MediumText>
                                                {order.time}
                                            </MediumText>
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
                                            borderLeftColor: color.sub.blue,
                                            borderRightWidth: 1,
                                            borderRightColor: color.sub.blue,
                                            alignItems: "center",
                                            marginTop: 5,
                                        }}
                                    >
                                        <MediumText>주문자 정보</MediumText>
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
                                        <MediumText>등록자</MediumText>
                                        <MediumText>
                                            {order.registUser.userName}
                                        </MediumText>
                                    </TextRow>
                                    <TextRow>
                                        <MediumText>전화번호</MediumText>
                                        <MediumText>{order.phone}</MediumText>
                                    </TextRow>
                                    <TextRow>
                                        <MediumText>현장번호</MediumText>
                                        <MediumText>
                                            {order.directPhone}
                                        </MediumText>
                                    </TextRow>
                                </View>
                            </Wrapper>
                            <View style={{ marginTop: 15 }}></View>
                            <Wrapper>
                                <TextRow>
                                    <MediumText>작업 AP</MediumText>
                                    <MediumText>
                                        {numberWithComma(order.price)} AP
                                    </MediumText>
                                </TextRow>
                            </Wrapper>
                            <Divider />
                            <Wrapper>
                                <TextRow>
                                    <MediumText style={{ color: "#ef5285" }}>
                                        쿠폰 할인
                                    </MediumText>
                                    <MediumText style={{ color: "#ef5285" }}>
                                        {numberWithComma(20000)} AP
                                    </MediumText>
                                </TextRow>
                                <TextRow>
                                    <MediumText
                                        style={{ color: color.sub.green }}
                                    >
                                        총 필요 AP
                                    </MediumText>
                                    <MediumText
                                        style={{ color: color.sub.green }}
                                    >
                                        {numberWithComma(order.price - 20000)}{" "}
                                        AP
                                    </MediumText>
                                </TextRow>
                            </Wrapper>
                            <Divider />
                            <Wrapper>
                                <TextRow>
                                    <SubTitleText
                                        style={{
                                            color: color.main,
                                        }}
                                    >
                                        결제 금액
                                    </SubTitleText>
                                    <SubTitleText style={{ color: color.main }}>
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
                                    <MediumText
                                        style={{
                                            fontSize: 18,
                                            color:
                                                order.orderStatusId === 1
                                                    ? color.main
                                                    : color.darkFontColor,
                                        }}
                                    >
                                        {" "}
                                        출발 전
                                    </MediumText>
                                </TextIndicator>
                                <TextIndicator>
                                    <MediumText
                                        style={{
                                            fontSize: 18,
                                            color: color.darkFontColor,
                                        }}
                                    >
                                        {" "}
                                        이동 중
                                    </MediumText>
                                </TextIndicator>
                                <TextIndicator cur={order.orderStatusId === 2}>
                                    <MediumText
                                        style={{
                                            fontSize: 18,
                                            color:
                                                order.orderStatusId === 2
                                                    ? color.main
                                                    : color.darkFontColor,
                                        }}
                                    >
                                        {" "}
                                        작업시작
                                    </MediumText>
                                </TextIndicator>
                                <TextIndicator cur={order.orderStatusId === 3}>
                                    <MediumText
                                        style={{
                                            fontSize: 18,
                                            color:
                                                order.orderStatusId === 3
                                                    ? color.main
                                                    : color.darkFontColor,
                                        }}
                                    >
                                        완료요청
                                    </MediumText>
                                </TextIndicator>
                                <TextIndicator
                                    cur={
                                        order.orderStatusId === 4 ||
                                        order.orderStatusId === 5
                                    }
                                >
                                    <MediumText
                                        style={{
                                            fontSize: 18,
                                            color:
                                                order.orderStatusId === 4 ||
                                                order.orderStatusId === 5
                                                    ? color.main
                                                    : color.darkFontColor,
                                        }}
                                    >
                                        작업완료
                                    </MediumText>
                                </TextIndicator>
                            </TextProgressBar>
                            <View style={{ marginTop: 20, marginBottom: 20 }}>
                                <HorizontalDivider />
                            </View>
                            <View>
                                <View style={{ flexDirection: "row" }}>
                                    {/* <MediumText style={{ fontWeight: "400" }}>
                                        {order.orderStatusId === 1
                                            ? "출발전"
                                            : order.orderStatusId === 2
                                            ? "작업시작"
                                            : order.orderStatusId === 3
                                            ? "완료요청"
                                            : "작업완료"}
                                    </MediumText> */}
                                    <View>
                                        <MediumText>
                                            {order.vehicleType}, {order.type}(
                                            {order.floor}
                                            층),{" "}
                                            {order.volumeType === "time"
                                                ? order.time
                                                : order.quantity}
                                        </MediumText>
                                    </View>
                                </View>
                                <View>
                                    <View style={{ flexDirection: "row" }}>
                                        <MediumText style={{ marginRight: 10 }}>
                                            작업비용
                                        </MediumText>
                                        <MediumText
                                            style={{ fontWeight: "500" }}
                                        >
                                            {numberWithComma(order.price || 0)}
                                            AP
                                        </MediumText>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <MediumText style={{ marginRight: 10 }}>
                                            작업AP
                                        </MediumText>
                                        <MediumText
                                            style={{ fontWeight: "500" }}
                                        >
                                            {numberWithComma(order.point || 0)}
                                            AP
                                        </MediumText>
                                    </View>
                                </View>
                                <View
                                    style={{ marginTop: 20, marginBottom: 20 }}
                                >
                                    <HorizontalDivider />
                                </View>
                                <View>
                                    <View style={{ flexDirection: "row" }}>
                                        <MediumText
                                            style={{ fontWeight: "400" }}
                                        >
                                            작업일시 :{" "}
                                        </MediumText>
                                        <MediumText style={{}}>
                                            {getWorkTime(order.workDateTime)}
                                        </MediumText>
                                    </View>

                                    {order.type === "양사" ? (
                                        <>
                                            <View
                                                style={{ flexDirection: "row" }}
                                            >
                                                <MediumText
                                                    style={{
                                                        fontWeight: "400",
                                                    }}
                                                >
                                                    {(order.bothType === 1
                                                        ? "내림"
                                                        : "올림") +
                                                        " 주소"}{" "}
                                                    :{" "}
                                                </MediumText>
                                                <MediumText style={{}}>
                                                    {order.address1 +
                                                        " " +
                                                        order.detailAddress1}
                                                </MediumText>
                                            </View>
                                            <View
                                                style={{ flexDirection: "row" }}
                                            >
                                                <MediumText
                                                    style={{
                                                        fontWeight: "400",
                                                    }}
                                                >
                                                    {(order.bothType === 1
                                                        ? "올림"
                                                        : "내림") +
                                                        " 주소"}{" "}
                                                    :{" "}
                                                </MediumText>
                                                <MediumText style={{}}>
                                                    {order.address2 +
                                                        " " +
                                                        order.detailAddress2}
                                                </MediumText>
                                            </View>
                                        </>
                                    ) : (
                                        <>
                                            <View
                                                style={{ flexDirection: "row" }}
                                            >
                                                <MediumText
                                                    style={{
                                                        fontWeight: "400",
                                                    }}
                                                >
                                                    작업 주소 :{" "}
                                                </MediumText>
                                                <MediumText style={{}}>
                                                    {order.address1 +
                                                        " " +
                                                        order.detailAddress1}
                                                </MediumText>
                                            </View>
                                        </>
                                    )}
                                    <View style={{ flexDirection: "row" }}>
                                        <MediumText
                                            style={{
                                                fontWeight: "400",
                                            }}
                                        >
                                            전화번호 :{" "}
                                        </MediumText>
                                        <MediumText style={{}}>
                                            {order.phone}
                                        </MediumText>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <MediumText
                                            style={{
                                                fontWeight: "400",
                                            }}
                                        >
                                            특이사항 :{" "}
                                        </MediumText>
                                        <MediumText style={{}}>
                                            {order.memo || "없음"}
                                        </MediumText>
                                    </View>
                                </View>
                                <View
                                    style={{ marginTop: 20, marginBottom: 20 }}
                                >
                                    <HorizontalDivider />
                                </View>
                                <View>
                                    <MediumText style={{ fontWeight: "400" }}>
                                        작업 기사님 정보
                                    </MediumText>
                                    <View style={{ flexDirection: "row" }}>
                                        <MediumText
                                            style={{
                                                fontWeight: "400",
                                            }}
                                        >
                                            기사명 :{" "}
                                        </MediumText>
                                        <MediumText style={{}}>
                                            {user?.userName} 기사님
                                        </MediumText>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <MediumText
                                            style={{
                                                fontWeight: "400",
                                            }}
                                        >
                                            연락처 :{" "}
                                        </MediumText>
                                        <MediumText style={{}}>
                                            {user?.phone}
                                        </MediumText>
                                    </View>
                                    {user?.vehicle ? (
                                        user?.vehicle?.length > 0 ? (
                                            <>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                    }}
                                                >
                                                    <MediumText
                                                        style={{
                                                            fontWeight: "400",
                                                        }}
                                                    >
                                                        차량번호 :{" "}
                                                    </MediumText>
                                                    <MediumText style={{}}>
                                                        123가 1234
                                                    </MediumText>
                                                </View>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                    }}
                                                >
                                                    <MediumText
                                                        style={{
                                                            fontWeight: "400",
                                                        }}
                                                    >
                                                        차량무게 :{" "}
                                                    </MediumText>
                                                    <MediumText style={{}}>
                                                        3ton
                                                    </MediumText>
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
                                        <MediumText
                                            style={{ textAlign: "center" }}
                                        >
                                            {order.orderStatusId === 1
                                                ? "작업 시작 전입니다.\n작업 시작 24시간 이내부터\n취소가 불가능합니다.\n알테구 기사님 정보를 확인해 주세요."
                                                : order.orderStatusId === 2
                                                ? "작업이 시작되었습니다."
                                                : order.orderStatusId === 3
                                                ? "작업이 완료되었습니다."
                                                : "작업이 모두 완료되었습니다.\n알테구 서비스를 이용해주셔서\n감사합니다."}
                                        </MediumText>
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
