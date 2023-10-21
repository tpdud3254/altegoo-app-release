import React from "react";
import { Text } from "react-native";
import { FONT_OFFSET } from "../../constant";

function RegularText(props) {
    return (
        <Text
            {...props}
            style={{
                fontSize: 19 + FONT_OFFSET,
                fontFamily: "SpoqaHanSansNeo-Regular",
                ...props.style,
                ...(props?.style?.fontSize && {
                    fontSize: props.style.fontSize + FONT_OFFSET,
                }),
            }}
        >
            {props.children}
        </Text>
    );
}

export default RegularText;
