import React, { useContext } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, View } from "react-native";
import LoginContext from "../context/LoginContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../context/UserContext";

function Home() {
    const { setIsLoggedIn } = useContext(LoginContext);
    const { setInfo } = useContext(UserContext);
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <TouchableOpacity
                onPress={async () => {
                    setIsLoggedIn(false);
                    setInfo({});
                    await AsyncStorage.removeItem("token");
                }}
            >
                <Text>로그아웃</Text>
            </TouchableOpacity>
        </View>
    );
}

Home.propTypes = {};
export default Home;
