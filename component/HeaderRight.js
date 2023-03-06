import React from "react";
import { TouchableOpacity, View } from "react-native";
import { theme } from "../styles";
import { numberWithComma } from "../utils";
import PlainText from "./text/PlainText";
import { Octicons } from "@expo/vector-icons";
import styled from "styled-components/native";

const Icon = styled.TouchableOpacity`
    margin-right: 15px;
    background-color: ${theme.btnPointColor};
    padding: 7px;
    border-radius: 25px;
`;
function HeaderRight({ onPress, name, point }) {
    return (
        <Icon onPress={onPress}>
            <Octicons name="megaphone" size={24} color="white" />
        </Icon>
    );
}
//TODO: protype
export default HeaderRight;
