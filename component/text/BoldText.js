import React from "react";
import { Text } from "react-native";
import { color } from "../../styles";
import { FONT_OFFSET } from "../../constant";

function BoldText(props) {
    return (
        <Text
            {...props}
            style={{
                fontSize: 19 + FONT_OFFSET,
                fontFamily: "SpoqaHanSansNeo-Bold",
                color: color["page-black-text"],
                ...props.style,
                ...(props.style.fontSize && {
                    fontSize: props.style.fontSize + FONT_OFFSET,
                }),
            }}
        >
            {props.children}
        </Text>
    );
}

export default BoldText;
