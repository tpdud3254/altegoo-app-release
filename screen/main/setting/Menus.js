import React, { useContext } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";
import MediumText from "../../../component/text/MediumText";
import UserContext from "../../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginContext from "../../../context/LoginContext";

function Menus({ navigation }) {
    const { setIsLoggedIn } = useContext(LoginContext);
    const { setInfo } = useContext(UserContext);
    const Logout = () => (
        <TouchableOpacity
            onPress={async () => {
                setIsLoggedIn(false);
                setInfo({});
                await AsyncStorage.removeItem("token");
            }}
        >
            <MediumText>로그아웃</MediumText>
        </TouchableOpacity>
    );

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("ModifyUserInfo");
                }}
            >
                {/* <MediumText>회원정보수정</MediumText> ㅅTODO: 추후변경 */}
                <MediumText>회원정보</MediumText>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("PointNavigator");
                }}
            >
                <MediumText>포인트</MediumText>
            </TouchableOpacity>
            <TouchableOpacity>
                <MediumText>보험</MediumText>
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
            </TouchableOpacity>
            <Logout />
        </View>
    );
}

Menus.propTypes = {};
export default Menus;
