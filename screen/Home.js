import React, { useContext } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, View } from "react-native";
import LoginContext from "../context/LoginContext";

function Home() {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <TouchableOpacity onPress={() => setIsLoggedIn(false)}>
                <Text>로그아웃</Text>
            </TouchableOpacity>
        </View>
    );
}

Home.propTypes = {};
export default Home;
