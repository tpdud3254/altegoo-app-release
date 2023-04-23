import React from "react";
import { color } from "../styles";
import { Octicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import PropType from "prop-types";

const Icon = styled.TouchableOpacity`
    margin-right: 15px;
    background-color: ${color.main};
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

HeaderRight.propTypes = {
    onPress: PropType.func,
};
export default HeaderRight;
