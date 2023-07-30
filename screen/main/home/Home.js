import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../../context/UserContext";
import { ORDINARY } from "../../../constant";
import axios from "axios";
import { SERVER } from "../../../constant";
import {
    getAsyncStorageToken,
    numberWithComma,
    showError,
} from "../../../utils";
import HeaderLeft from "../../../component/HeaderLeft";
import HeaderRight from "../../../component/HeaderRight";
import { FlatList, Image, View, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import MediumText from "../../../component/text/MediumText";
import { color } from "../../../styles";
import Layout, { LAYOUT_PADDING_X } from "../../../component/layout/Layout";
import BoldText from "../../../component/text/BoldText";
import { shadowProps } from "../../../component/Shadow";
import RegularText from "../../../component/text/RegularText";
import RightArrow from "../../../assets/images/icons/arrow_right_s.png";
import { Order } from "../../../component/order/OrderList";
import { Notification } from "../../../component/Notification";
import LoginContext from "../../../context/LoginContext";

const Item = styled.View`
    width: 100%;
    margin-bottom: 30px;
`;
const ItemRow = styled(Item)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const PointButton = styled.TouchableOpacity`
    background-color: ${color["button-accent-background"]};
    flex-direction: row;
    align-items: center;
    align-self: flex-start;
    padding: 8px 13px;
    border-radius: 12px;
    margin-top: -20px;
`;

const Wrapper = styled.View`
    background-color: white;
    padding: 16px 16px;
    border-radius: 14px;
`;
const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const Select = styled.TouchableOpacity`
    background-color: #f4f4f4;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 9px 10px 9px 17px;
    border-radius: 10px;
    width: 110px;
`;
const Orders = styled.View`
    margin-top: 25px;
`;
const NoOrder = styled.View`
    align-items: center;
    padding: 40px;
    margin-bottom: 10px;
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
        emergency: false,
        floor: 8,
        id: 119,
        memo: null,
        orderReservation: [],
        orderStatusId: 3,
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
        emergency: false,
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
        type: "올림",
        userId: 56,
        vehicleType: "스카이",
        volumeType: "time",
        workDateTime: "2023-05-13T08:00:00.000Z",
    },
];

function Home({ navigation }) {
    const { width } = useWindowDimensions();
    const { info } = useContext(UserContext);
    const [point, setPoint] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const bannerRef = useRef();
    const { firstLogin, setFirstLogin } = useContext(LoginContext); //TODO: 앱 처음 로그인 시 가이드 말풍선 만들기
    const [showGuide, setShowGuide] = useState(false);

    const orders = 1;
    useEffect(() => {
        if (info.userType !== ORDINARY) {
            navigation.setOptions({
                headerRight: () => <HeaderRight />,
            });
        }
        getPoint(); //포인트가져오기

        // getTest();
    }, []);

    const getTest = async () => {
        axios
            .get(SERVER + "/users/test", {
                headers: {
                    auth: await getAsyncStorageToken(),
                },
            })
            .then(({ data }) => {
                console.log(data);
                // const {
                //     result,
                //     data: { point },
                // } = data;
                // console.log("result: ", result);
                // console.log("point: ", point);
                // if (info.userType !== ORDINARY) {
                //     navigation.setOptions({
                //         headerLeft: () => (
                //             <HeaderLeft
                //                 onPress={goToPoint}
                //                 name={info.name}
                //                 point={point?.curPoint}
                //             />
                //         ),
                //     });
                // } else {
                //     setPoint(point?.curPoint);
                // }
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {});
    };

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

                if (info.userType !== ORDINARY) {
                    navigation.setOptions({
                        headerLeft: () => (
                            <HeaderLeft
                                onPress={goToPoint}
                                name={info.name}
                                point={point?.curPoint}
                            />
                        ),
                    });
                } else {
                    setPoint(point?.curPoint);
                }
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {});
    };

    const goToPoint = () => {
        navigation.navigate("SettingNavigator", { screen: "PointNavigator" });
    };

    const imagePath = [
        require(`../../../assets/images/intro/img_01.png`),
        require(`../../../assets/images/intro/img_02.png`),
        require(`../../../assets/images/intro/img_03.png`),
    ];

    const bannerData = [
        {
            title: "banner1",
        },
        {
            title: "banner2",
        },
        {
            title: "banner3",
        },
    ];
    const renderIntro = ({ item }) => (
        <View
            style={{
                width: width - LAYOUT_PADDING_X * 2,
                height: 120,
                backgroundColor: color.lightblue,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 12,
            }}
        >
            <BoldText style={{ color: "#0561FC" }}>{item.title}</BoldText>
        </View>
    );
    return (
        <Layout headerShown={false} registBtnShown={true}>
            <ItemRow>
                <BoldText
                    style={{
                        fontSize: 23,
                    }}
                >
                    안녕하세요! {info.name}님.
                </BoldText>
                <Notification />
            </ItemRow>
            <Item>
                <PointButton>
                    <Image
                        source={require("../../../assets/images/icons/icon_point.png")}
                        style={{ width: 27, height: 27 }}
                    />
                    <BoldText
                        style={{
                            fontSize: 15,
                            color: "white",
                        }}
                    >
                        {" " + numberWithComma(point || 0)}
                        <BoldText
                            style={{
                                fontSize: 12,
                                color: "white",
                            }}
                        >
                            {" "}
                            AP
                        </BoldText>
                    </BoldText>
                </PointButton>
            </Item>
            <Item>
                <FlatList
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    data={bannerData}
                    renderItem={renderIntro}
                    ref={bannerRef}
                />
            </Item>
            <Item>
                <Wrapper style={shadowProps}>
                    <Header>
                        <MediumText>
                            이번 달{" "}
                            <MediumText
                                style={{ color: color["page-color-text"] }}
                            >
                                추천인
                            </MediumText>{" "}
                            수익
                        </MediumText>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <MediumText style={{ fontSize: 22 }}>
                                1,234,000{" "}
                                <MediumText style={{ fontSize: 12 }}>
                                    AP
                                </MediumText>
                            </MediumText>
                            <Image
                                source={RightArrow}
                                style={{ width: 30, height: 30 }}
                            />
                        </View>
                    </Header>
                </Wrapper>
            </Item>
            <Item>
                <Wrapper style={shadowProps}>
                    <Header>
                        <MediumText
                            style={{
                                fontSize: 18,
                            }}
                        >
                            최근 등록한 작업
                        </MediumText>
                        <Select>
                            <MediumText
                                style={{
                                    fontSize: 15,
                                }}
                            >
                                3개월
                            </MediumText>
                            <Image
                                source={require("../../../assets/images/icons/allow_down.png")}
                                style={{ width: 21, height: 12 }}
                            />
                        </Select>
                    </Header>
                    {orders === 0 ? (
                        <NoOrder>
                            <RegularText
                                style={{
                                    fontSize: 18,
                                    color: color["page-bluegrey-text"],
                                }}
                            >
                                최근 등록한 작업이 없습니다.
                            </RegularText>
                        </NoOrder>
                    ) : (
                        <Orders>
                            <Order.Items>
                                {orderData.map((order, index) => (
                                    <Order.Item key={index} data={order} />
                                ))}
                            </Order.Items>
                        </Orders>
                    )}
                </Wrapper>
            </Item>
        </Layout>
    );
}

export default Home;
