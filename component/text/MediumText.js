import React from "react";
import { Text } from "react-native";

function MediumText(props) {
    return (
        <Text
            {...props}
            style={{
                fontSize: 18,
                fontFamily: "SpoqaHanSansNeo-Medium",
                ...props.style,
            }}
        >
            {props.children}
        </Text>
    );
}

export default MediumText;
