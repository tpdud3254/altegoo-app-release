import React from "react";
import { Text } from "react-native";

function PlainText(props) {
    return (
        <Text
            {...props}
            style={{
                fontSize: 24,
                fontWeight: "300",
                ...props.style,
            }}
        >
            {props.children}
        </Text>
    );
}

export default PlainText;
