import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import UserContext from "../../../context/UserContext";
import Layout, { LAYOUT_PADDING_X } from "../../../component/layout/Layout";
import { Row, RowBetween } from "../../../component/Row";
import MediumText from "../../../component/text/MediumText";
import { color } from "../../../styles";
import { shadowProps } from "../../../component/Shadow";
import { Image, TouchableOpacity, View } from "react-native";
import RegularText from "../../../component/text/RegularText";

const Tabs = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: ${color["image-area-background"]};
    flex-direction: row;
    align-items: center;
    margin-left: -${LAYOUT_PADDING_X}px;
    margin-right: -${LAYOUT_PADDING_X}px;
    margin-bottom: 10px;
`;

const Tab = styled.TouchableOpacity`
    width: 50%;
    align-items: center;
    border-bottom-width: ${(props) => (props.selected ? 2 : 0)}px;
    border-bottom-color: ${color.main};
    padding-bottom: 15px;
`;
const Item = styled.View`
    background-color: white;
    padding: 25px 23px;
    margin-top: 10px;
    margin-bottom: 8px;
    border-radius: 11px;
`;

const Wrapper = styled.View`
    margin-bottom: 25px;
`;

const COMPANY_LIST = [
    "홍길동",
    "홍길동",
    "홍길동",
    "홍길동",
    "홍길동",
    "홍길동",
    "홍길동",
    "홍길동",
];

const DRIVER_LIST = [
    "홍길동",
    "홍길동",
    "홍길동",
    "홍길동",
    "홍길동",
    "홍길동",
    "홍길동",
    "홍길동",
];
function RecommandedUser({ route, navigation }) {
    const { info, setInfo } = useContext(UserContext);
    const [menu, setMenu] = useState(1);

    const TabTitle = ({ title, num }) => (
        <Row>
            <MediumText>{title}</MediumText>
            <MediumText style={{ color: color.main, marginLeft: 5 }}>
                {num}
            </MediumText>
        </Row>
    );

    const Line = () => {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: color["image-area-background"],
                    marginTop: 17,
                    marginBottom: 17,
                }}
            ></View>
        );
    };

    const More = () => (
        <TouchableOpacity style={{ marginTop: 10 }}>
            <Row style={{ justifyContent: "center" }}>
                <Image
                    source={require("../../../assets/images/icons/icon_more.png")}
                    style={{ width: 25, height: 25, marginRight: 5 }}
                />
                <RegularText style={{ fontSize: 16 }}>더보기</RegularText>
            </Row>
        </TouchableOpacity>
    );

    return (
        <Layout>
            <Tabs>
                <Tab selected={menu === 1} onPress={() => setMenu(1)}>
                    <TabTitle title="날 추천한 기업" num={32} />
                </Tab>
                <Tab selected={menu === 2} onPress={() => setMenu(2)}>
                    <TabTitle title="날 추천한 기업" num={32} />
                </Tab>
            </Tabs>
            <Item style={shadowProps}>
                {menu === 1
                    ? COMPANY_LIST.map((value, index) => (
                          <View key={index}>
                              <RegularText>{value}</RegularText>
                              <Line />
                          </View>
                      ))
                    : DRIVER_LIST.map((value, index) => (
                          <View key={index}>
                              <RegularText>{value}</RegularText>
                              <Line />
                          </View>
                      ))}
                {false ? (
                    <More />
                ) : (
                    <RegularText
                        style={{
                            fontSize: 17,
                            textAlign: "center",
                            marginTop: 10,
                        }}
                    >
                        더 이상 내역이 없습니다.
                    </RegularText>
                )}
            </Item>
            <Item style={shadowProps}>
                <RowBetween>
                    <RegularText>내가 추천한 회원</RegularText>
                    <RegularText>홍길동</RegularText>
                </RowBetween>
            </Item>
        </Layout>
    );
}

RecommandedUser.propTypes = {};
export default RecommandedUser;
