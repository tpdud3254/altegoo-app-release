import React from "react";
import { color } from "../../styles";
import styled from "styled-components/native";
import { View } from "react-native";

function InputItem(props) {
    return (
        <View
            style={{
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: color.border,
                flex: 1,
                ...props.style,
            }}
        >
            {props.children}
        </View>
    );
}
export default InputItem;
