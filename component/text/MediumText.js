import React from "react";
import { Text } from "react-native";
import { color } from "../../styles";

function MediumText(props) {
    return (
        <Text
            {...props}
            style={{
                fontSize: 18,
                fontFamily: "SpoqaHanSansNeo-Medium",
                color: color["page-black-text"],
                ...props.style,
            }}
        >
            {props.children}
        </Text>
    );
}

export default MediumText;
