import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";

function SearchWork() {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>작업검색</Text>
        </View>
    );
}

SearchWork.propTypes = {};
export default SearchWork;
