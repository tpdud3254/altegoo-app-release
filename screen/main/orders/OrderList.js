import React, { useContext, useEffect, useState } from "react";
import LoginContext from "../../../context/LoginContext";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import SearchWork from "../search/SearchWork";
import { ORDINARY } from "../../../constant";
import {
    ScrollView,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
} from "react-native";
import PlainText from "../../../component/text/PlainText";
import styled from "styled-components/native";
import { theme } from "../../../styles";
import axios from "axios";
import { SERVER } from "../../../server";
import { getAsyncStorageToken, numberWithComma } from "../../../utils";
import HeaderLeft from "../../../component/HeaderLeft";
import LoadingLayout from "../../../component/layout/LoadingLayout";
import HeaderRight from "../../../component/HeaderRight";
import MainLayout from "../../../component/layout/MainLayout";
import {
    MaterialCommunityIcons,
    MaterialIcons,
    Ionicons,
    FontAwesome5,
} from "@expo/vector-icons";
import LadderIcon from "../../../component/icon/LadderIcon";
import SkyIcon from "../../../component/icon/SkyIcon";
import { Button, Menu, Divider, Provider, Text } from "react-native-paper";

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
`;

const Orders = styled.View`
    margin-top: 15px;
`;
const Order = styled.TouchableOpacity`
    background-color: white;
    border-radius: 10px;
    margin-bottom: 20px;
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
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

function OrderList({ navigation }) {
    const { setIsLoggedIn } = useContext(LoginContext);
    const { info, setInfo } = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(false);
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
        getOrderInProgressCounts(); //작업목록 개수
        getOrderList(); //작업 목록 가져오기
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
    }, [regionFilterType, statusFilterType]);
    const goToPoint = () => {
        // TODO: 기능추가
    };

    const filterOrderList = (type, classify) => {
        //TODO:기능추가
        console.log(type, classify);
        if (type === "region") {
            setRegionFilterType(classify);
            closeRegionFiletr();
        } else {
            setStatusFilterType(classify);
            closeStatusFiletr();
        }
    };

    const getWorkTime = (dateTime) => {
        const getDay = (index) => {
            switch (index) {
                case 0:
                    return "일";
                case 1:
                    return "월";
                case 2:
                    return "화";
                case 3:
                    return "수";
                case 4:
                    return "목";
                case 5:
                    return "금";
                case 6:
                    return "토";

                default:
                    break;
            }
        };
        const workDateTime = new Date(dateTime);

        return `${workDateTime.getFullYear()}년 ${
            workDateTime.getMonth() + 1 < 10
                ? "0" + (workDateTime.getMonth() + 1)
                : workDateTime.getMonth() + 1
        }월 ${
            workDateTime.getDate() < 10
                ? "0" + workDateTime.getDate()
                : workDateTime.getDate()
        }일 (${getDay(workDateTime.getDay())}) ${
            workDateTime.getHours() < 10
                ? "0" + workDateTime.getHours()
                : workDateTime.getHours()
        }:${
            workDateTime.getMinutes() < 10
                ? "0" + workDateTime.getMinutes()
                : workDateTime.getMinutes()
        }`;
    };
    /* 
            <Button onPress={setAcceptOrder}>
                <PlainText>예약하기</PlainText>
            </Button>
            <Button onPress={setCancleOrder}>
                <PlainText>예약취소하기</PlainText>
            </Button>
            <Button onPress={setReserveOrder}>
                <PlainText>예약대기하기</PlainText>
            </Button>
            <Button onPress={setCancleReservation}>
                <PlainText>예약대기취소하기</PlainText>
            </Button>
            <Button onPress={getMyOrderList}>
                <PlainText>내 작업 목록 가져오기</PlainText>
            </Button>
            <Button onPress={classifyAddress}>
                <PlainText>작업주소분류</PlainText>
            </Button> */

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
                console.log("error: ", error); //TODO:에러처리
            })
            .finally(() => {});
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
                console.log("getOrderInProgressCounts error: ", error); //TODO:에러처리
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
                setFilteredList(list);
            })
            .catch((error) => {
                console.log("error: ", error); //TODO:에러처리
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
                // console.log(data);
                const { result } = data;
                console.log("result: ", result);
            })
            .catch((error) => {
                console.log("error: ", error); //TODO:에러처리
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
                // console.log(data);
                const { result } = data;
                console.log("result: ", result);
            })
            .catch((error) => {
                console.log("error: ", error); //TODO:에러처리
            })
            .finally(() => {});
    };

    const setReserveOrder = async () => {
        axios
            .post(
                SERVER + "/works/reservation",
                {
                    orderId: 29,
                },
                {
                    headers: {
                        auth: await getAsyncStorageToken(),
                    },
                }
            )
            .then(({ data }) => {
                // console.log(data);
                const { result } = data;
                console.log("result: ", result);
            })
            .catch((error) => {
                console.log("error: ", error); //TODO:에러처리
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
                // console.log(data);
                const { result } = data;
                console.log("result: ", result);
            })
            .catch((error) => {
                console.log("error: ", error); //TODO:에러처리
            })
            .finally(() => {});
    };
    const getMyOrderList = async () => {
        axios
            .get(SERVER + "/works/mylist", {
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
            })
            .catch((error) => {
                console.log("error: ", error); //TODO:에러처리
            })
            .finally(() => {});
    };

    const classifyAddress = () => {
        const text = [
            "서울시 관악구 신림동",
            "경기도 의정부시 어쩌구",
            "인천광역시 어쩌구저쩌구",
            "경기도 광주시",
            "전라북도 전주시",
        ];

        const regionArr = ["서울", "인천", "경기"];
        const regionDetailArr = [
            ["김포", "부천", "파주", "고양", "동두천", "연천"],
            ["의정부", "양주", "구리", "남양주", "포천", "가평"],
            [
                "광명",
                "시흥",
                "안산",
                "안양",
                "과천",
                "의왕",
                "군포",
                "수원",
                "오산",
                "화성",
                "평택",
            ],
            ["성남", "하남", "광주", "용인", "안성", "이천", "여주", "양평"],
        ];

        text.map((text, textIndex) => {
            regionArr.map((region, regionIndex) => {
                console.log(text, "includes", region, text.includes(region));
            });
        });

        // 경기 북서부 : 김포시, 부천시, 파주시, 고양시, 동두천시, 연천군
        // 경기 북동부 : 의정부시, 양주시, 구리시, 남양주시, 포천시, 가평군
        // 경기 남서부 : 광명시, 시흥시, 안산시, 안양시, 과천시, 의왕시, 군포시, 수원시, 오산시, 화성시, 평택시
        // 경기 남동부 : 성남시, 하남시, 광주시, 용인시, 안성시, 이천시, 여주시, 양평군
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

    //TODO: 예약하기 로직 수정
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
            color={theme.sub.blue}
            onPress={() => setCancleReservation(orderId)}
        >
            <PlainText style={{ fontSize: 19, color: "white" }}>
                예약대기취소
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
        // { ? (

        //   ) : order.orderStatusId ===
        //     2 ? (

        //       order.acceptUser ===
        //       info.id ? (
        //
        //       ) : (
        //           <ReserveButton
        //               orderId={
        //                   order.id
        //               }
        //           />
        //       )
        //   ) : null}
    };
    //TODO: cache
    return (
        <>
            {isLoading ? (
                <LoadingLayout />
            ) : info.userType === ORDINARY ? null : (
                <MainLayout>
                    <ScrollView>
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
                                                        <PlainText>
                                                            지역 필터
                                                        </PlainText>
                                                        <MaterialIcons
                                                            name="filter-list"
                                                            size={24}
                                                            color="#777"
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
                                                    title="모든 작업 지역"
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
                                                        <PlainText>
                                                            작업상태 필터
                                                        </PlainText>
                                                        <MaterialIcons
                                                            name="filter-list"
                                                            size={24}
                                                            color="#777"
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
                                                    title="모든 작업"
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
                                                disabled={
                                                    order.orderStatusId === 4
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

const a = {
    acceptUser: 55,
    address: "서울 종로구 북촌로1길 9 402호",
    bothType: null,
    createdAt: "2023-03-06T03:28:11.248Z",
    directPhone: "01090665452",
    emergency: true,
    floor: 4,
    id: 29,
    memo: null,
    orderStatusId: 1,
    otherAddress: null,
    otherFloor: null,
    phone: "01090665452",
    point: 10800,
    price: 72000,
    quantity: null,
    registUser: { userName: "고응주" },
    time: "추가 1시간 당",
    type: "내림",
    userId: 55,
    volumeType: "time",
    workDateTime: "2023-03-06T20:00:00.000Z",
};
OrderList.propTypes = {};
export default OrderList;
