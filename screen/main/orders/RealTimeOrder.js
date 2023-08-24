import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../../context/UserContext";
import { ORDINARY, VALID } from "../../../constant";
import axios from "axios";
import { SERVER } from "../../../constant";
import {
    CheckLoading,
    getAsyncStorageToken,
    numberWithComma,
    showError,
} from "../../../utils";
import HeaderLeft from "../../../component/HeaderLeft";
import HeaderRight from "../../../component/HeaderRight";
import {
    FlatList,
    Image,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";
import MediumText from "../../../component/text/MediumText";
import { color } from "../../../styles";
import Layout, { LAYOUT_PADDING_X } from "../../../component/layout/Layout";
import BoldText from "../../../component/text/BoldText";
import { shadowProps } from "../../../component/Shadow";
import RegularText from "../../../component/text/RegularText";
import RightArrow from "../../../assets/images/icons/arrow_right_s.png";

import { Notification } from "../../../component/Notification";
import LoginContext from "../../../context/LoginContext";
import { Row } from "../../../component/Row";
import RefreshBtn from "../../../assets/images/icons/btn_Refresh.png";
import { Order } from "../../../component/order/RealTImeOrderComponent";
import LoadingLayout from "../../../component/layout/LoadingLayout";

const Refresh = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    margin-right: 15px;
`;

const Item = styled.View`
    width: 100%;
    margin-bottom: 25px;
`;
const ItemRow = styled(Item)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Select = styled.TouchableOpacity`
    background-color: #f4f4f4;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 9px 10px 9px 17px;
    border-radius: 10px;
    width: 110px;
    margin-left: 10px;
`;
const Orders = styled.View``;
const NoOrder = styled.View`
    justify-content: center;
    align-items: center;
    background-color: ${(props) =>
        props.emergency ? color["box-color-background"] : color.lightblue};
    border-radius: 16px;
    height: 150px;
`;

const Noti = styled.View`
    background-color: ${color.blue};
    margin-left: -16px;
    margin-right: -16px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px;
`;

const Shortcut = styled.TouchableOpacity`
    background-color: white;
    padding: 10px;
    border-radius: 7px;
`;

const orderData = [
    {
        acceptUser: 55,
        address: "",
        address1: "서울 관악구 신림동 1623-3",
        address2: null,
        bothType: null,
        createdAt: "2023-05-12T07:56:39.900Z",
        detailAddress1: null,
        detailAddress2: null,
        directPhone: "01032655452",
        emergency: true,
        floor: 8,
        id: 119,
        memo: null,
        orderReservation: [],
        orderStatusId: 1,
        otherAddress: null,
        otherFloor: null,
        phone: "01032655452",
        point: 9000,
        price: 60000,
        pushStatus: null,
        quantity: null,
        regionId: 1,
        registUser: { id: 56 },
        simpleAddress1: "서울 관악구",
        simpleAddress2: null,
        time: "하루",
        type: "올림",
        userId: 56,
        vehicleType: "스카이",
        volumeType: "time",
        workDateTime: "2023-05-13T08:00:00.000Z",
    },
    {
        acceptUser: 55,
        address: "",
        address1: "서울 관악구 신림동 1623-3",
        address2: null,
        bothType: null,
        createdAt: "2023-05-12T07:56:39.900Z",
        detailAddress1: null,
        detailAddress2: null,
        directPhone: "01032655452",
        emergency: true,
        floor: 8,
        id: 119,
        memo: null,
        orderReservation: [],
        orderStatusId: 5,
        otherAddress: null,
        otherFloor: null,
        phone: "01032655452",
        point: 9000,
        price: 60000,
        pushStatus: null,
        quantity: null,
        regionId: 1,
        registUser: { id: 56 },
        simpleAddress1: "서울 관악구",
        simpleAddress2: null,
        time: "하루",
        type: "양사",
        userId: 56,
        vehicleType: "스카이",
        volumeType: "time",
        workDateTime: "2023-05-14T08:00:00.000Z",
    },
    {
        acceptUser: 55,
        address: "",
        address1: "서울 관악구 신림동 1623-3",
        address2: null,
        bothType: null,
        createdAt: "2023-05-12T07:56:39.900Z",
        detailAddress1: null,
        detailAddress2: null,
        directPhone: "01032655452",
        emergency: false,
        floor: 8,
        id: 119,
        memo: null,
        orderReservation: [],
        orderStatusId: 1,
        otherAddress: null,
        otherFloor: null,
        phone: "01032655452",
        point: 9000,
        price: 60000,
        pushStatus: null,
        quantity: null,
        regionId: 1,
        registUser: { id: 56 },
        simpleAddress1: "서울 관악구",
        simpleAddress2: null,
        time: "하루",
        type: "내림",
        userId: 56,
        vehicleType: "스카이",
        volumeType: "time",
        workDateTime: "2023-05-13T08:00:00.000Z",
    },
];

function RealTimeOrder({ navigation }) {
    const { info } = useContext(UserContext);

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState(-1);
    const [acceptOrder, setAcceptOrder] = useState(-1);

    const [point, setPoint] = useState(0);

    const bannerRef = useRef();
    const { firstLogin, setFirstLogin } = useContext(LoginContext); //TODO: 앱 처음 로그인 시 가이드 말풍선 만들기
    const [showGuide, setShowGuide] = useState(false);

    useEffect(() => {
        setLoading(true);

        getOrders();
        getAcceptOrders();
    }, []);

    useEffect(() => {
        if (CheckLoading({ orders, acceptOrder })) {
            setLoading(false);
        }
    }, [orders, acceptOrder]);

    const refresh = () => {
        setLoading(true);
        setOrders(-1);

        getOrders();
    };
    const getOrders = async () => {
        axios
            .get(SERVER + "/orders/realtime", {
                headers: {
                    auth: await getAsyncStorageToken(),
                },
            })
            .then(({ data }) => {
                const { result } = data;

                if (result === VALID) {
                    const {
                        data: { order },
                    } = data;

                    console.log("orders : ", order);
                    setOrders(order || []);
                } else {
                    setOrders([]);
                }
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {});
    };

    const getAcceptOrders = async () => {
        axios
            .get(SERVER + "/orders/accept", {
                headers: {
                    auth: await getAsyncStorageToken(),
                },
            })
            .then(({ data }) => {
                const { result } = data;

                if (result === VALID) {
                    const {
                        data: { order },
                    } = data;

                    console.log("acceptOrders : ", order[order.length - 1]);
                    if (order.length > 0)
                        setAcceptOrder(order[order.length - 1]);
                    else setAcceptOrder(0);
                } else {
                    setAcceptOrder(0);
                }
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {});
    };

    const goToDriverProgress = () => {
        navigation.navigate("DriverOrderProgress", { orderId: acceptOrder.id });
    };

    return (
        <>
            {loading ? (
                <LoadingLayout />
            ) : (
                <Layout headerShown={false} registBtnShown={true}>
                    <ItemRow>
                        <BoldText
                            style={{
                                fontSize: 23,
                            }}
                        >
                            {orders && orders !== -1 ? orders.length : "0"}건의
                            실시간 오더
                        </BoldText>
                        <Row>
                            <Refresh onPress={refresh}>
                                <MediumText
                                    style={{
                                        fontSize: 15,
                                        color: color.blue,
                                        marginRight: 3,
                                    }}
                                >
                                    새로고침
                                </MediumText>
                                <Image
                                    source={RefreshBtn}
                                    resizeMode="contain"
                                    style={{ width: 27, height: 27 }}
                                />
                            </Refresh>

                            <Notification />
                        </Row>
                    </ItemRow>
                    {acceptOrder ? (
                        <Item>
                            <Noti>
                                <Row>
                                    <Image
                                        source={require("../../../assets/images/icons/icon_info1.png")}
                                        style={{
                                            width: 24,
                                            height: 24,
                                            marginRight: 7,
                                        }}
                                    />
                                    <MediumText
                                        style={{ fontSize: 16, color: "white" }}
                                    >
                                        현재 진행중인 작업이 있습니다.
                                    </MediumText>
                                </Row>
                                <Shortcut onPress={goToDriverProgress}>
                                    <MediumText
                                        style={{
                                            fontSize: 14,
                                            color: color.blue,
                                        }}
                                    >
                                        바로가기
                                    </MediumText>
                                </Shortcut>
                            </Noti>
                        </Item>
                    ) : null}
                    <ItemRow style={{ justifyContent: "flex-end" }}>
                        {/* <Select>
                            <MediumText
                                style={{
                                    fontSize: 15,
                                }}
                            >
                                전체 지역
                            </MediumText>
                            <Image
                                source={require("../../../assets/images/icons/allow_down.png")}
                                style={{ width: 21, height: 12 }}
                            />
                        </Select> */}
                        <Select>
                            <MediumText
                                style={{
                                    fontSize: 15,
                                }}
                            >
                                시간 순
                            </MediumText>
                            <Image
                                source={require("../../../assets/images/icons/allow_down.png")}
                                style={{ width: 21, height: 12 }}
                            />
                        </Select>
                    </ItemRow>
                    {true ? (
                        <Item>
                            <Orders>
                                <Order.Items>
                                    {orders.map((order, index) => (
                                        <Order.Item key={index} data={order} />
                                    ))}
                                </Order.Items>
                            </Orders>
                        </Item>
                    ) : (
                        <NoOrder>
                            <RegularText>등록된 오더가 없습니다.</RegularText>
                        </NoOrder>
                    )}
                </Layout>
            )}
        </>
    );
}

export default RealTimeOrder;
