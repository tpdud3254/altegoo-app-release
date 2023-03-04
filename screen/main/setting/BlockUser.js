import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";

function BlockUser() {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>BlockUser</Text>
        </View>
    );
}

BlockUser.propTypes = {};
export default BlockUser;
