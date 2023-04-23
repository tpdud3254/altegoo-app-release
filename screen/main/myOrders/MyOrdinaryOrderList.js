import React, { useCallback, useContext, useEffect, useState } from "react";
import LoginContext from "../../../context/LoginContext";
import UserContext from "../../../context/UserContext";
import { ORDINARY } from "../../../constant";
import {
    ScrollView,
    View,
    TouchableWithoutFeedback,
    RefreshControl,
} from "react-native";
import PlainText from "../../../component/text/PlainText";
import styled from "styled-components/native";
import { color } from "../../../styles";
import axios from "axios";
import { SERVER } from "../../../constant";
import {
    getAsyncStorageToken,
    getWorkTime,
    numberWithComma,
    showError,
} from "../../../utils";
import LoadingLayout from "../../../component/layout/LoadingLayout";
import MainLayout from "../../../component/layout/MainLayout";
import {
    MaterialCommunityIcons,
    MaterialIcons,
    Ionicons,
    FontAwesome5,
    Feather,
} from "@expo/vector-icons";
import LadderIcon from "../../../component/icon/LadderIcon";
import SkyIcon from "../../../component/icon/SkyIcon";
import { Menu, Divider, Provider } from "react-native-paper";
import HeaderRight from "../../../component/HeaderRight";
import HeaderLeft from "../../../component/HeaderLeft";
import HorizontalDivider from "../../../component/divider/HorizontalDivider";
import SubTitleText from "../../../component/text/SubTitleText";

const TopContainer = styled.View`
    margin: -10px -10px 0px -10px;
    background-color: white;
    border-top-width: 0.5px;
    border-top-color: ${color.border};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
`;

const Week = styled.View`
    flex-direction: row;
    align-items: center;
`;
const OrderCount = styled(Week)``;

const ProgressContainer = styled.View`
    background-color: #ffffffaa;
    padding: 15px 0px;
`;
const ProgressWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const FilterContaier = styled.View`
    margin-top: 10px;
    justify-content: flex-end;
    flex-direction: row;
`;
const FilterWrapper = styled.View`
    height: ${(props) => (props.setHeight ? "500px" : "auto")};
`;

const Filter = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    padding: 3px;
`;

const Orders = styled.View`
    margin-top: 15px;
`;
const Order = styled.TouchableOpacity`
    background-color: white;
    border-radius: 10px;
    margin-bottom: 20px;
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

const Status = styled.View`
    background-color: ${(props) => statusArr[props.status - 1].color};
    align-items: center;
    padding: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const OrderButtonContainer = styled.View``;
const OrderButton = styled.TouchableOpacity`
    background-color: ${(props) => (props.color ? props.color : "#777")};
    align-items: center;
    padding: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;

const Notifications = styled.View`
    align-items: center;
    padding: 10px;
`;
const Notification = styled.View`
    flex-direction: row;
    margin-bottom: 8px;
    width: 380px;
    border: 1px solid
        ${(props) =>
            props.order
                ? color.btnAccent + "aa"
                : props.event
                ? "#ef5285" + "aa"
                : color.textDark + "aa"};
`;
const NotiWrapper = styled.View`
    padding-left: 10px;
    border-left-width: 0px;
`;
const NotiIcon = styled.View`
    background-color: ${(props) =>
        props.order
            ? color.btnAccent
            : props.event
            ? "#ef5285" + "aa"
            : color.textDark};
    padding: 3px;
    justify-content: center;
`;
const NotiTitle = styled.View``;
const NotiText = styled.View``;

const statusArr = [
    {
        text: "작업 요청",
        color: color.btnAccent,
        textColor: "white",
    },
    {
        text: "예약 완료",
        color: color.sub.blue,
        textColor: "white",
    },
    {
        text: "작업 중",
        color: color.sub.yellow,
        textColor: "black",
    },
    {
        text: "완료",
        color: color.btnDefault,
        textColor: "white",
    },
    {
        text: "완료",
        color: color.btnDefault,
        textColor: "white",
    },
];

function MyOrdinaryOrderList({ navigation }) {
    const { info } = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [regionFilterVisible, setRegionFilterVisible] = useState(false);
    const [statusFilterVisible, setStatusFilterVisible] = useState(false);
    const [regionFilterType, setRegionFilterType] = useState("all");
    const [statusFilterType, setStatusFilterType] = useState("all");

    const [orderInProgressCount, setOrderInProgressCount] = useState(0);
    const [orderList, setOrderList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const openRegionFilter = () => {
        setRegionFilterVisible(true);
    };
    const closeRegionFiletr = () => {
        setRegionFilterVisible(false);
    };

    const openStatusFilter = () => {
        setStatusFilterVisible(true);
    };
    const closeStatusFiletr = () => {
        setStatusFilterVisible(false);
    };

    useEffect(() => {
        setIsLoading(true);

        getOrderList();
        setIsLoading(false);
    }, []);
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRight />,
        });
        getPoint(); //포인트가져오기
    }, []);

    const getPoint = async () => {
        axios
            .get(SERVER + "/users/point", {
                headers: {
                    auth: await getAsyncStorageToken(),
                },
            })
            .then(({ data }) => {
                const {
                    result,
                    data: { point },
                } = data;
                console.log("result: ", result);
                console.log("point: ", point);

                navigation.setOptions({
                    headerLeft: () => (
                        <HeaderLeft
                            onPress={goToPoint}
                            name={info.name}
                            point={point?.curPoint}
                        />
                    ),
                });
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {});
    };

    const goToPoint = () => {
        navigation.navigate("SettingNavigator", { screen: "PointNavigator" });
    };

    useEffect(() => {
        const originalOrder = orderList;
        let regionFiltered = [];

        if (regionFilterType === "my") {
            info.workRegion.map((region) => {
                const result = originalOrder.filter(
                    (order) => order.regionCode === region
                );

                if (result.length > 0) regionFiltered = [...result];
            });
        } else {
            regionFiltered = originalOrder;
        }

        let statusFiltered = [];
        if (statusFilterType === "inProgress") {
            const result = regionFiltered.filter(
                (order) => order.orderStatusId === 1
            );

            if (result.length > 0) statusFiltered = [...result];
        } else {
            statusFiltered = regionFiltered;
        }
        setFilteredList(statusFiltered);
    }, [regionFilterType, statusFilterType, orderList]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getOrderInProgressCounts();
        await getOrderList();
        setRefreshing(false);
    }, []);

    const goToPage = (page, data) => {
        navigation.navigate(page, data);
    };
    const filterOrderList = (type, classify) => {
        console.log(type, classify);
        if (type === "region") {
            setRegionFilterType(classify);
            closeRegionFiletr();
        } else {
            setStatusFilterType(classify);
            closeStatusFiletr();
        }
    };

    const getOrderInProgressCounts = async () => {
        axios
            .get(SERVER + "/works/count/progress", {
                headers: {
                    auth: await getAsyncStorageToken(),
                },
            })
            .then(({ data }) => {
                const {
                    result,
                    data: { count },
                } = data;
                console.log("result: ", result);
                console.log("count: ", count);
                setOrderInProgressCount(count);
            })
            .catch((error) => {
                console.log("getOrderInProgressCounts error: ", error);
                showError(error);
            })
            .finally(() => {});
    };
    const getOrderList = async () => {
        axios
            .get(SERVER + "/works/list", {
                headers: {
                    auth: await getAsyncStorageToken(),
                },
            })
            .then(({ data }) => {
                // console.log(data);
                const {
                    result,
                    data: { list },
                } = data;
                console.log("result: ", result);
                console.log("list: ", list);
                const newList = [];
                setTotalCount(0);
                list.map((value, index) => {
                    if (value.userId === info.id) {
                        newList.push(value);
                        if (value.orderStatusId < 3) {
                            setTotalCount((prev) => prev + 1);
                        }
                    }
                });
                setOrderList(newList);
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {});
    };
    const setAcceptOrder = async (orderId) => {
        axios
            .patch(
                SERVER + "/works/status",
                {
                    status: 2, //1: 작업 요청, 2: 작업 예약, 3: 작업 중, 4: 작업 완료
                    id: orderId,
                },
                {
                    headers: {
                        auth: await getAsyncStorageToken(),
                    },
                }
            )
            .then(({ data }) => {
                const {
                    result,
                    data: { list },
                } = data;
                console.log("result: ", result);
                setOrderList(list);
                getOrderInProgressCounts();
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {});
    };
    const setCancleOrder = async (orderId) => {
        axios
            .patch(
                SERVER + "/works/status",
                {
                    status: 1, //1: 작업 요청, 2: 작업 예약, 3: 작업 중, 4: 작업 완료
                    id: orderId,
                },
                {
                    headers: {
                        auth: await getAsyncStorageToken(),
                    },
                }
            )
            .then(({ data }) => {
                const {
                    result,
                    data: { list },
                } = data;
                console.log("result: ", result);
                setOrderList(list);
                getOrderInProgressCounts();
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {});
    };
    const setReserveOrder = async (orderId) => {
        axios
            .post(
                SERVER + "/works/reservation",
                {
                    orderId,
                },
                {
                    headers: {
                        auth: await getAsyncStorageToken(),
                    },
                }
            )
            .then(({ data }) => {
                const {
                    result,
                    data: { list },
                } = data;
                console.log("result: ", result);
                setOrderList(list);
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {});
    };
    const setCancleReservation = async (orderId) => {
        axios
            .delete(SERVER + "/works/reservation", {
                data: { orderId },
                headers: {
                    auth: await getAsyncStorageToken(),
                },
            })
            .then(({ data }) => {
                const {
                    result,
                    data: { list },
                } = data;
                console.log("result: ", result);
                setOrderList(list);
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {});
    };

    const AcceptButton = ({ orderId }) => (
        <OrderButton
            color={color.btnAccent}
            onPress={() => setAcceptOrder(orderId)}
        >
            <PlainText style={{ fontSize: 19, color: "white" }}>
                예약하기
            </PlainText>
        </OrderButton>
    );

    const ReserveButton = ({ orderId }) => (
        <OrderButton
            color={color.sub.blue}
            onPress={() => setReserveOrder(orderId)}
        >
            <PlainText style={{ fontSize: 19, color: "white" }}>
                예약대기
            </PlainText>
        </OrderButton>
    );

    const CancleButton = ({ orderId }) => (
        <OrderButton color="#777" onPress={() => setCancleOrder(orderId)}>
            <PlainText style={{ fontSize: 19, color: "white" }}>
                예약취소
            </PlainText>
        </OrderButton>
    );

    const CancleReserveButton = ({ orderId }) => (
        <OrderButton
            color={color.sub.green}
            onPress={() => setCancleReservation(orderId)}
        >
            <PlainText style={{ fontSize: 19, color: "white" }}>
                예약대기 취소
            </PlainText>
        </OrderButton>
    );

    const SetStatusButton = ({ order }) => {
        if (order.userId === info.id) return null;
        if (order.orderStatusId === 1)
            //작업 요청
            return <AcceptButton orderId={order.id} />;
        else if (order.orderStatusId === 2) {
            //예약 완료

            //내가 예약한 오더인 경우
            if (order.acceptUser === info.id)
                return <CancleButton orderId={order.id} />;

            //내가 예약하지 않은 오더인 경우
            if (order.orderReservation && order.orderReservation.length > 0) {
                let exist = false;
                order.orderReservation.map((value, index) => {
                    exist = value.userId === info.id;
                });

                //예약대기 목록에 내가 존재할 경우
                if (exist) return <CancleReserveButton orderId={order.id} />;
            }

            return <ReserveButton orderId={order.id} />;
        }
    };

    return (
        <>
            {isLoading ? (
                <LoadingLayout />
            ) : (
                <MainLayout>
                    <TopContainer>
                        <Week>
                            {/* <Ionicons
                                name="calendar-sharp"
                                size={37}
                                color="black"
                            /> */}
                            <Ionicons
                                name="caret-back-circle-outline"
                                size={37}
                                color="#777"
                            />
                            <PlainText
                                style={{ marginLeft: 5, marginRight: 5 }}
                            >
                                1월 1주차
                            </PlainText>
                            <Ionicons
                                name="caret-forward-circle-outline"
                                size={37}
                                color="#777"
                            />
                        </Week>
                        <OrderCount>
                            <MaterialCommunityIcons
                                name="progress-alert"
                                size={26}
                                color={color.sub.yellow}
                            />
                            <PlainText style={{ marginLeft: 5 }}>
                                {orderInProgressCount}건 (예정)
                            </PlainText>
                        </OrderCount>
                    </TopContainer>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        <TouchableWithoutFeedback>
                            <Provider>
                                <View>
                                    <Orders>
                                        {filteredList.map((order, index) => (
                                            <Order
                                                key={index}
                                                done={order.orderStatusId >= 4}
                                                onPress={() =>
                                                    goToPage(
                                                        "OrdinaryOrderDetail",
                                                        {
                                                            orderData: order,
                                                        }
                                                    )
                                                }
                                            >
                                                <Status
                                                    status={order.orderStatusId}
                                                >
                                                    <PlainText
                                                        style={{
                                                            color: statusArr[
                                                                order.orderStatusId -
                                                                    1
                                                            ].textColor,
                                                            fontSize: 18,
                                                        }}
                                                    >
                                                        {
                                                            statusArr[
                                                                order.orderStatusId -
                                                                    1
                                                            ].text
                                                        }
                                                    </PlainText>
                                                </Status>
                                                <OrderWrapper>
                                                    <OrderContent>
                                                        {order.vehicleType ===
                                                        "사다리" ? (
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
                                                            {order.vehicleType}{" "}
                                                            / {order.type}(
                                                            {order.floor}
                                                            층) /{" "}
                                                            {order.volumeType ===
                                                            "time"
                                                                ? order.time
                                                                : order.quantity}
                                                        </PlainText>
                                                    </OrderContent>
                                                    <OrderContent>
                                                        <Ionicons
                                                            name="location"
                                                            color="#777"
                                                            size={24}
                                                        />
                                                        <PlainText
                                                            style={{
                                                                marginLeft: 5,
                                                                fontSize: 19,
                                                            }}
                                                            numberOfLines={1}
                                                        >
                                                            {order.type ===
                                                            "양사"
                                                                ? `${order.simpleAddress1} > ${order.simpleAddress2}`
                                                                : order.address1 +
                                                                  " " +
                                                                  order.detailAddress1}
                                                        </PlainText>
                                                    </OrderContent>
                                                    <OrderContent>
                                                        <Ionicons
                                                            name="time"
                                                            color="#777"
                                                            size={24}
                                                        />
                                                        <PlainText
                                                            style={{
                                                                marginLeft: 5,
                                                                fontSize: 19,
                                                            }}
                                                            numberOfLines={1}
                                                        >
                                                            {getWorkTime(
                                                                order.workDateTime
                                                            )}
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
                                                                fontWeight:
                                                                    "400",
                                                            }}
                                                            numberOfLines={1}
                                                        >
                                                            {numberWithComma(
                                                                order.price
                                                            )}
                                                            AP / 수수료 :{" "}
                                                            {numberWithComma(
                                                                order.point
                                                            )}
                                                            AP
                                                        </PlainText>
                                                    </OrderContent>
                                                </OrderWrapper>
                                            </Order>
                                        ))}
                                    </Orders>
                                </View>
                            </Provider>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </MainLayout>
            )}
        </>
    );
}

MyOrdinaryOrderList.propTypes = {};
export default MyOrdinaryOrderList;
