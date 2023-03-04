import React, { useContext } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";
import PlainText from "../../../component/text/PlainText";
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
            <PlainText>로그아웃</PlainText>
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
                <PlainText>회원정보수정</PlainText>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("PointNavigator");
                }}
            >
                <PlainText>포인트</PlainText>
            </TouchableOpacity>
            <TouchableOpacity>
                <PlainText>보험</PlainText>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Events");
                }}
            >
                <PlainText>이벤트</PlainText>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Setting");
                }}
            >
                <PlainText>설정</PlainText>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("BlockUser");
                }}
            >
                <PlainText>부정당회원</PlainText>
            </TouchableOpacity>
            <Logout />
        </View>
    );
}

Menus.propTypes = {};
export default Menus;
