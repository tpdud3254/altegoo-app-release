import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";

function ChargePoint() {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>ChargePoint</Text>
        </View>
    );
}

ChargePoint.propTypes = {};
export default ChargePoint;
