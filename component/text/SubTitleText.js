import React from "react";
import { Text } from "react-native";

function SubTitleText(props) {
    return (
        <Text
            {...props}
            style={{
                fontSize: 22,
                fontFamily: "NanumGothic_400Regular",
                ...props.style,
            }}
        >
            {props.children}
        </Text>
    );
}

export default SubTitleText;
