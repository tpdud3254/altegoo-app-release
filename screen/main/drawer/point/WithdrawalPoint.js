import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";

function WithdrawalPoint() {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>WithdrawalPoint</Text>
        </View>
    );
}

WithdrawalPoint.propTypes = {};
export default WithdrawalPoint;
