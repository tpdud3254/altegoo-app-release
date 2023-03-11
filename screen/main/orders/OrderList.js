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
import { theme } from "../../../styles";
import axios from "axios";
import { SERVER } from "../../../server";
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
    Ionicons,
    FontAwesome5,
} from "@expo/vector-icons";
import LadderIcon from "../../../component/icon/LadderIcon";
import SkyIcon from "../../../component/icon/SkyIcon";
import { Menu, Divider, Provider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

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
    justify-content: space-between;
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

const statusArr = [
    {
        text: "작업 요청",
        color: theme.btnPointColor + "44",
        textColor: "black",
    },
    {
        text: "예약 완료",
        color: theme.sub.blue + "44",
        textColor: "black",
    },
    {
        text: "작업 중",
        color: theme.sub.yellow + "77",
        textColor: "#777",
    },
    {
        text: "완료",
        color: theme.btnColor,
        textColor: "white",
    },
];

function OrderList() {
    const navigation = useNavigation();
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
        getOrderInProgressCounts();
        getOrderList();
        setIsLoading(false);
    }, []);

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

    const goToPage = (page, data) => {
        navigation.navigate(page, data);
    };
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getOrderInProgressCounts();
        await getOrderList();
        setRefreshing(false);
    }, []);

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
                setOrderList(list);
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
            color={theme.btnPointColor}
            onPress={() => setAcceptOrder(orderId)}
        >
            <PlainText style={{ fontSize: 19, color: "white" }}>
                예약하기
            </PlainText>
        </OrderButton>
    );

    const ReserveButton = ({ orderId }) => (
        <OrderButton
            color={theme.sub.blue}
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
            color={theme.sub.green}
            onPress={() => setCancleReservation(orderId)}
        >
            <PlainText style={{ fontSize: 19, color: "white" }}>
                예약대기 취소
            </PlainText>
        </OrderButton>
    );

    const SetStatusButton = ({ order }) => {
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
            ) : info.userType === ORDINARY ? null : (
                <MainLayout>
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
                                    <ProgressContainer>
                                        <ProgressWrapper>
                                            <MaterialCommunityIcons
                                                name="progress-alert"
                                                size={26}
                                                color={theme.sub.yellow}
                                            />
                                            <PlainText
                                                style={{ marginLeft: 5 }}
                                            >
                                                {orderInProgressCount}건 요청 중
                                            </PlainText>
                                        </ProgressWrapper>
                                    </ProgressContainer>
                                    <FilterContaier>
                                        <FilterWrapper
                                            setHeight={filteredList.length < 1}
                                        >
                                            <Menu
                                                visible={regionFilterVisible}
                                                onDismiss={closeRegionFiletr}
                                                anchor={
                                                    <Filter
                                                        onPress={
                                                            openRegionFilter
                                                        }
                                                    >
                                                        <PlainText
                                                            style={{
                                                                textAlign:
                                                                    "center",
                                                            }}
                                                        >
                                                            {regionFilterType ===
                                                            "all"
                                                                ? "지역 전체"
                                                                : "내 작업 지역"}
                                                        </PlainText>
                                                        <Ionicons
                                                            name="caret-down-circle-outline"
                                                            size={24}
                                                            color="#777"
                                                            style={{
                                                                marginLeft: 3,
                                                            }}
                                                        />
                                                    </Filter>
                                                }
                                                contentStyle={{
                                                    backgroundColor: "white",
                                                    marginTop: -50,
                                                }}
                                            >
                                                <Menu.Item
                                                    onPress={() =>
                                                        filterOrderList(
                                                            "region",
                                                            "my"
                                                        )
                                                    }
                                                    title="내 작업 지역"
                                                    style={{
                                                        backgroundColor:
                                                            "white",
                                                    }}
                                                />
                                                <Divider />
                                                <Menu.Item
                                                    onPress={() =>
                                                        filterOrderList(
                                                            "region",
                                                            "all"
                                                        )
                                                    }
                                                    title="지역 전체"
                                                    style={{
                                                        backgroundColor:
                                                            "white",
                                                    }}
                                                />
                                            </Menu>
                                        </FilterWrapper>
                                        <FilterWrapper>
                                            <Menu
                                                visible={statusFilterVisible}
                                                onDismiss={closeStatusFiletr}
                                                anchor={
                                                    <Filter
                                                        onPress={
                                                            openStatusFilter
                                                        }
                                                    >
                                                        <PlainText
                                                            style={{
                                                                textAlign:
                                                                    "center",
                                                            }}
                                                        >
                                                            {statusFilterType ===
                                                            "all"
                                                                ? "전체 작업"
                                                                : "요청 중 작업"}
                                                        </PlainText>
                                                        <Ionicons
                                                            name="caret-down-circle-outline"
                                                            size={24}
                                                            color="#777"
                                                            style={{
                                                                marginLeft: 3,
                                                            }}
                                                        />
                                                    </Filter>
                                                }
                                                contentStyle={{
                                                    backgroundColor: "white",
                                                    marginTop: -50,
                                                }}
                                            >
                                                <Menu.Item
                                                    onPress={() =>
                                                        filterOrderList(
                                                            "status",
                                                            "inProgress"
                                                        )
                                                    }
                                                    title="요청 중 작업"
                                                    style={{
                                                        backgroundColor:
                                                            "white",
                                                    }}
                                                />
                                                <Divider />
                                                <Menu.Item
                                                    onPress={() =>
                                                        filterOrderList(
                                                            "status",
                                                            "all"
                                                        )
                                                    }
                                                    title="전체 작업"
                                                    style={{
                                                        backgroundColor:
                                                            "white",
                                                    }}
                                                />
                                            </Menu>
                                        </FilterWrapper>
                                    </FilterContaier>
                                    <Orders>
                                        {filteredList.map((order, index) => (
                                            <Order
                                                key={index}
                                                done={order.orderStatusId === 4}
                                                onPress={() =>
                                                    order.userId === info.id
                                                        ? goToPage(
                                                              "CompleteOrder",
                                                              {
                                                                  orderId:
                                                                      order.id,
                                                                  back: true,
                                                              }
                                                          )
                                                        : order.acceptUser ===
                                                          info.id
                                                        ? goToPage(
                                                              "OrderProgress",
                                                              {
                                                                  orderId:
                                                                      order.id,
                                                                  back: true,
                                                              }
                                                          )
                                                        : goToPage(
                                                              "OrderDetail",
                                                              {
                                                                  orderId:
                                                                      order.id,
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
                                                            {order.address}
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
                                                            color={theme.main}
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
                                                <OrderButtonContainer>
                                                    <SetStatusButton
                                                        order={order}
                                                    />
                                                </OrderButtonContainer>
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

OrderList.propTypes = {};
export default OrderList;
