import React from "react";
import { theme } from "../../styles";
import styled from "styled-components/native";
import { View } from "react-native";

const Box = styled.View`
    border: 1px solid ${theme.boxColor};
`;
function InputItem(props) {
    return (
        <View
            style={{
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: theme.boxColor,
                flex: 1,
                ...props.style,
            }}
        >
            {props.children}
        </View>
    );
}
export default InputItem;
