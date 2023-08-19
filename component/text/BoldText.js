import React from "react";
import { Text } from "react-native";
import { color } from "../../styles";

function BoldText(props) {
    return (
        <Text
            {...props}
            style={{
                fontSize: 19,
                fontFamily: "SpoqaHanSansNeo-Bold",
                color: color["page-black-text"],
                ...props.style,
            }}
        >
            {props.children}
        </Text>
    );
}

export default BoldText;
