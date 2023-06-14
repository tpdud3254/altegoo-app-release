import React from "react";
import { Text } from "react-native";

function BoldText(props) {
    return (
        <Text
            {...props}
            style={{
                fontSize: 18,
                fontFamily: "SpoqaHanSansNeo-Bold",
                ...props.style,
            }}
        >
            {props.children}
        </Text>
    );
}

export default BoldText;
