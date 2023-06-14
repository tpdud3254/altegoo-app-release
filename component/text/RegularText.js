import React from "react";
import { Text } from "react-native";

function RegularText(props) {
    return (
        <Text
            {...props}
            style={{
                fontSize: 18,
                fontFamily: "SpoqaHanSansNeo-Regular",
                ...props.style,
            }}
        >
            {props.children}
        </Text>
    );
}

export default RegularText;
