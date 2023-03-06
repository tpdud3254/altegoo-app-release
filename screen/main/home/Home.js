import React, { useContext, useEffect, useState } from "react";
import LoginContext from "../../../context/LoginContext";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import SearchWork from "../search/SearchWork";
import { ORDINARY } from "../../../constant";
import {
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import PlainText from "../../../component/text/PlainText";
import styled from "styled-components/native";
import { theme } from "../../../styles";
import axios from "axios";
import { SERVER } from "../../../server";
import { getAsyncStorageToken } from "../../../utils";
import HeaderLeft from "../../../component/HeaderLeft";
import LoadingLayout from "../../../component/layout/LoadingLayout";
import HeaderRight from "../../../component/HeaderRight";
import MainLayout from "../../../component/layout/MainLayout";
import {
    MaterialCommunityIcons,
    MaterialIcons,
    Ionicons,
} from "@expo/vector-icons";
import LadderIcon from "../../../component/icon/LadderIcon";
import SkyIcon from "../../../component/icon/SkyIcon";

const ProgressContainer = styled.View`
    background-color: #ffffffaa;
    padding: 15px 0px;
`;
const ProgressWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const Orders = styled.View`
    margin-top: 15px;
`;
const Order = styled.View`
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
`;
const FilterContaier = styled.View`
    margin-top: 10px;
    justify-content: space-between;
    flex-direction: row;
`;
const FilterWrapper = styled.View``;

const Filter = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;
const FilterContent = styled.View`
    background-color: white;
    border-radius: 5px;
    padding: 5px 7px 0px 7px;
    margin-top: 3px;
`;
const FilterButtons = styled.View``;
const FilterButton = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
`;
function Home({ navigation }) {
    const { setIsLoggedIn } = useContext(LoginContext);
    const { info, setInfo } = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(false);
    const [regionFilterVisible, setRegionFilterVisible] = useState(false);
    const [statusFilterVisible, setStatusFilterVisible] = useState(false);

    const [orderInProgressCount, setOrderInProgressCount] = useState(0);
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRight />,
        });
        setIsLoading(true);
        getPoint(); //포인트가져오기
        getOrderInProgressCounts(); //작업목록 개수
        getOrderList(); //작업 목록 가져오기
        setIsLoading(false);
    }, []);

    const goToPoint = () => {
        // TODO: 기능추가
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
                console.log("error: ", error); //TODO:에러처리
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
                console.log("error: ", error); //TODO:에러처리
            })
            .finally(() => {});
    };
    const setAcceptOrder = async () => {
        axios
            .patch(
                SERVER + "/works/status",
                {
                    status: 2, //1: 작업 요청, 2: 작업 예약, 3: 작업 중, 4: 작업 완료
                    id: 28,
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
    const setCancleOrder = async () => {
        axios
            .patch(
                SERVER + "/works/status",
                {
                    status: 1, //1: 작업 요청, 2: 작업 예약, 3: 작업 중, 4: 작업 완료
                    id: 29,
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

    const setCancleReservation = async () => {
        axios
            .delete(SERVER + "/works/reservation", {
                data: { orderId: 29 },
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

    const filterOrderList = (type, classify) => {
        console.log(type, classify);

        if (type === "region") {
            setRegionFilterVisible(false);
        } else {
            setStatusFilterVisible(false);
        }
    };

    return (
        <>
            {isLoading ? (
                <LoadingLayout />
            ) : info.userType === ORDINARY ? null : (
                <MainLayout>
                    <ScrollView>
                        <TouchableWithoutFeedback>
                            <View>
                                <ProgressContainer>
                                    <ProgressWrapper>
                                        <MaterialCommunityIcons
                                            name="progress-alert"
                                            size={26}
                                            color={theme.sub.yellow}
                                        />
                                        <PlainText>
                                            {orderInProgressCount}건 요청 중
                                        </PlainText>
                                    </ProgressWrapper>
                                </ProgressContainer>
                                <FilterContaier>
                                    <FilterWrapper>
                                        <Filter
                                            onPress={() =>
                                                setRegionFilterVisible(
                                                    (prev) => !prev
                                                )
                                            }
                                        >
                                            <PlainText>지역 필터</PlainText>
                                            <MaterialIcons
                                                name="filter-list"
                                                size={24}
                                                color="#777"
                                            />
                                        </Filter>
                                        {regionFilterVisible ? (
                                            <FilterContent>
                                                <FilterButtons>
                                                    <FilterButton
                                                        onPress={() =>
                                                            filterOrderList(
                                                                "region",
                                                                "my"
                                                            )
                                                        }
                                                    >
                                                        <Ionicons
                                                            name="checkmark-circle"
                                                            size={24}
                                                            color="black"
                                                        />
                                                        <PlainText>
                                                            내 작업 지역
                                                        </PlainText>
                                                    </FilterButton>
                                                    <FilterButton
                                                        onPress={() =>
                                                            filterOrderList(
                                                                "region",
                                                                "all"
                                                            )
                                                        }
                                                    >
                                                        <Ionicons
                                                            name="checkmark-circle-outline"
                                                            size={24}
                                                            color="black"
                                                        />
                                                        <PlainText>
                                                            모든 작업 지역
                                                        </PlainText>
                                                    </FilterButton>
                                                </FilterButtons>
                                            </FilterContent>
                                        ) : null}
                                    </FilterWrapper>
                                    <FilterWrapper>
                                        <Filter
                                            onPress={() =>
                                                setStatusFilterVisible(
                                                    (prev) => !prev
                                                )
                                            }
                                        >
                                            <PlainText>작업상태 필터</PlainText>
                                            <MaterialIcons
                                                name="filter-list"
                                                size={24}
                                                color="#777"
                                            />
                                        </Filter>
                                        {statusFilterVisible ? (
                                            <FilterContent>
                                                <FilterButtons>
                                                    <FilterButton
                                                        onPress={() =>
                                                            filterOrderList(
                                                                "status",
                                                                "inProgress"
                                                            )
                                                        }
                                                    >
                                                        <Ionicons
                                                            name="checkmark-circle"
                                                            size={24}
                                                            color="black"
                                                        />
                                                        <PlainText>
                                                            요청 중 작업
                                                        </PlainText>
                                                    </FilterButton>
                                                    <FilterButton
                                                        onPress={() =>
                                                            filterOrderList(
                                                                "status",
                                                                "all"
                                                            )
                                                        }
                                                    >
                                                        <Ionicons
                                                            name="checkmark-circle-outline"
                                                            size={24}
                                                            color="black"
                                                        />
                                                        <PlainText>
                                                            모든 작업
                                                        </PlainText>
                                                    </FilterButton>
                                                </FilterButtons>
                                            </FilterContent>
                                        ) : null}
                                    </FilterWrapper>
                                </FilterContaier>
                                <Orders>
                                    {orderList.map((order, index) => (
                                        <Order key={index}>
                                            <View>
                                                {order.vehicleType ===
                                                "사다리" ? (
                                                    <LadderIcon />
                                                ) : (
                                                    <SkyIcon />
                                                )}
                                                <PlainText>
                                                    {order.vehicleType} /{" "}
                                                    {order.type}({order.floor}
                                                    층) /
                                                </PlainText>
                                            </View>
                                        </Order>
                                    ))}
                                </Orders>
                            </View>
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
Home.propTypes = {};
export default Home;
