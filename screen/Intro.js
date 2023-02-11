import React, { useContext } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, View } from "react-native";
import LoginContext from "../context/LoginContext";

function Intro() {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <TouchableOpacity onPress={() => setIsLoggedIn(true)}>
                <Text>로그인</Text>
            </TouchableOpacity>
        </View>
    );
}

Intro.propTypes = {};
export default Intro;
