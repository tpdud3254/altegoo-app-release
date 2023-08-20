import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Image, TouchableOpacity, View } from "react-native";
import MediumText from "../../../component/text/MediumText";
import UserContext from "../../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginContext from "../../../context/LoginContext";
import Layout from "../../../component/layout/Layout";
import BoldText from "../../../component/text/BoldText";
import RegularText from "../../../component/text/RegularText";
import { GetPhoneNumberWithDash, showErrorMessage } from "../../../utils";
import { color } from "../../../styles";
import { shadowProps } from "../../../component/Shadow";
import Arrow from "../../../assets/images/icons/arrow_right_B.png";

const Top = styled.View`
    background-color: white;
    flex-direction: row;
    justify-content: space-between;
    padding: 60px 20px 20px 20px;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: ${color["image-area-background"]};
`;

const UserInfomation = styled.TouchableOpacity`
    border: 1px ${color["box-border"]} solid;
    justify-content: center;
    padding-left: 13px;
    padding-right: 13px;
    border-radius: 10px;
    height: 40px;
`;

const SMenu = styled.TouchableOpacity`
    background-color: white;
    padding: 25px 23px;
    margin-top: 8px;
    margin-bottom: 8px;
    border-radius: 11px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
function Menus({ navigation }) {
    const { setIsLoggedIn } = useContext(LoginContext);
    const { info, setInfo } = useContext(UserContext);

    useEffect(() => {
        navigation.setOptions({
            header: () => (
                <Top>
                    <View>
                        <BoldText style={{ fontSize: 22, marginBottom: 5 }}>
                            {info.name} 님
                        </BoldText>
                        <RegularText>
                            {GetPhoneNumberWithDash(info.phone)}
                        </RegularText>
                    </View>
                    <UserInfomation
                        onPress={() => goToPage("MemberInformation")}
                    >
                        <MediumText style={{ fontSize: 16 }}>
                            회원정보
                        </MediumText>
                    </UserInfomation>
                </Top>
            ),
        });
    }, []);

    const goToPage = (pageName) => {
        navigation.navigate("SettingNavigator", {
            screen: pageName,
        });
    };

    const Menu = ({ children, onPress }) => {
        return (
            <SMenu style={shadowProps} onPress={onPress}>
                <View>{children}</View>
                <Image source={Arrow} style={{ width: 20, height: 30 }} />
            </SMenu>
        );
    };
    return (
        <Layout scroll={false}>
            <Menu onPress={() => goToPage("PointMain")}>
                <MediumText>
                    포인트 및 쿠폰{"      "}
                    <MediumText style={{ color: color.main }}>
                        0{" "}
                        <MediumText style={{ color: color.main, fontSize: 14 }}>
                            AP
                        </MediumText>
                    </MediumText>
                </MediumText>
            </Menu>
            <Menu>
                <MediumText>결제내역</MediumText>
            </Menu>
            <Menu>
                <MediumText>추천인 정보</MediumText>
            </Menu>
            <Menu>
                <MediumText>비밀번호 변경</MediumText>
            </Menu>
            {/* <TouchableOpacity
                onPress={() => {
                    navigation.navigate("ModifyUserInfo");
                }}
            >
                <MediumText>회원정보수정</MediumText> ㅅTODO: 추후변경
                <MediumText>회원정보</MediumText>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("PointNavigator");
                }}
            >
                <MediumText>포인트</MediumText>
            </TouchableOpacity>
            <TouchableOpacity
            // onPress={() => {
            //     navigation.navigate("Events");
            // }}
            >
                <MediumText>이벤트</MediumText>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Setting");
                }}
            >
                <MediumText>설정</MediumText>
            </TouchableOpacity>
            <TouchableOpacity
            // onPress={() => {
            //     navigation.navigate("BlockUser");
            // }}
            >
                <MediumText>부정당회원</MediumText>
            </TouchableOpacity> */}
        </Layout>
    );
}

Menus.propTypes = {};
export default Menus;
