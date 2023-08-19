import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import styled from "styled-components/native";
import BoldText from "../../../component/text/BoldText";
import RegularText from "../../../component/text/RegularText";
import MediumText from "../../../component/text/MediumText";
import { Notification } from "../../../component/Notification";
import { color } from "../../../styles";
import Layout from "../../../component/layout/Layout";
import { shadowProps } from "../../../component/Shadow";
import { Order } from "../../../component/order/OrderComponent";

const HeaderContainer = styled.View`
    background-color: white;
    padding-top: 48px;

    padding-left: 15px;
    padding-right: 15px;
    border-bottom-color: ${color["image-area-background"]};
    border-bottom-width: 1px;
`;

const HeaderWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const HeaderItem = styled.View`
    flex-direction: row;
    align-items: center;
    width: 110px;
`;

const HeaderTab = styled.View`
    width: 50%;
    align-items: center;
    margin-top: 25px;
`;

const HeaderTabText = styled.View`
    border-bottom-color: ${color.main};
    border-bottom-width: ${(props) => (props.selected ? 2 : 0)}px;
    padding-bottom: 12px;
    padding-left: 1px;
    padding-right: 1px;
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

const Item = styled.View`
    width: 100%;
    margin-bottom: 30px;
`;

const Wrapper = styled.View`
    background-color: white;
    padding: 10px 16px;
    border-radius: 14px;
`;
const Orders = styled.View`
    margin-top: 15px;
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

function DriverOrderList({ navigation }) {
    const [menu, setManu] = useState(1);
    const orders = 1;

    useEffect(() => {
        navigation.setOptions({
            header: () => <Header />,
        });
    });

    const Header = () => {
        return (
            <HeaderContainer>
                <HeaderWrapper>
                    <HeaderItem>
                        <Image
                            source={require("../../../assets/images/icons/bullet_tri.png")}
                            style={{ width: 20, height: 20, marginRight: 5 }}
                        />
                        <BoldText style={{ fontSize: 16 }}>
                            1건
                            <RegularText style={{ fontSize: 16 }}>
                                {" "}
                                예정
                            </RegularText>
                        </BoldText>
                    </HeaderItem>
                    {true ? (
                        <HeaderItem style={{ justifyContent: "center" }}>
                            <Select>
                                <MediumText
                                    style={{
                                        fontSize: 15,
                                    }}
                                >
                                    전체 기간
                                </MediumText>
                                <Image
                                    source={require("../../../assets/images/icons/allow_down.png")}
                                    style={{ width: 21, height: 12 }}
                                />
                            </Select>
                        </HeaderItem>
                    ) : (
                        <View
                            style={{
                                alignItems: "center",
                            }}
                        >
                            <HeaderItem
                                style={{
                                    justifyContent: "center",
                                }}
                            >
                                <Image
                                    source={require("../../../assets/images/icons/btn_prev_s.png")}
                                    style={{
                                        width: 25,
                                        height: 25,
                                        resizeMode: "contain",
                                    }}
                                />
                                <BoldText
                                    style={{
                                        fontSize: 22,
                                        paddingLeft: 12,
                                        paddingRight: 12,
                                    }}
                                >
                                    3주차
                                </BoldText>
                                <Image
                                    source={require("../../../assets/images/icons/btn_next_s.png")}
                                    style={{
                                        width: 25,
                                        height: 25,
                                        resizeMode: "contain",
                                    }}
                                />
                            </HeaderItem>
                            <RegularText
                                style={{ fontSize: 14, paddingTop: 4 }}
                            >
                                23년 5월
                            </RegularText>
                        </View>
                    )}
                    <HeaderItem style={{ justifyContent: "flex-end" }}>
                        <Notification />
                    </HeaderItem>
                </HeaderWrapper>
                <HeaderWrapper>
                    <HeaderTab>
                        <HeaderTabText selected={menu === 1}>
                            {menu === 1 ? (
                                <BoldText style={{ color: color.main }}>
                                    나의 작업
                                </BoldText>
                            ) : (
                                <RegularText
                                    style={{ color: color["page-grey-text"] }}
                                >
                                    나의 작업
                                </RegularText>
                            )}
                        </HeaderTabText>
                    </HeaderTab>
                    <HeaderTab>
                        <HeaderTabText selected={menu === 2}>
                            {menu === 2 ? (
                                <BoldText style={{ color: color.main }}>
                                    나의 오더
                                </BoldText>
                            ) : (
                                <RegularText
                                    style={{ color: color["page-grey-text"] }}
                                >
                                    나의 오더
                                </RegularText>
                            )}
                        </HeaderTabText>
                    </HeaderTab>
                </HeaderWrapper>
            </HeaderContainer>
        );
    };

    return (
        <Layout>
            {orders === 0 ? null : (
                <>
                    <Item>
                        <MediumText
                            style={{
                                textAlign: "center",
                                paddingBottom: 17,
                                marginTop: 20,
                            }}
                        >
                            23년 6월
                        </MediumText>
                        <Wrapper style={shadowProps}>
                            <Orders>
                                <Order.Items>
                                    {orderData.map((order, index) => (
                                        <Order.Item key={index} data={order} />
                                    ))}
                                </Order.Items>
                            </Orders>
                        </Wrapper>
                    </Item>
                    <Item>
                        <MediumText
                            style={{
                                textAlign: "center",
                                paddingBottom: 17,
                                marginTop: 20,
                            }}
                        >
                            23년 6월
                        </MediumText>
                        <Wrapper style={shadowProps}>
                            <Orders>
                                <Order.Items>
                                    {orderData.map((order, index) => (
                                        <Order.Item key={index} data={order} />
                                    ))}
                                </Order.Items>
                            </Orders>
                        </Wrapper>
                    </Item>
                </>
            )}
        </Layout>
    );
}

DriverOrderList.propTypes = {};
export default DriverOrderList;
