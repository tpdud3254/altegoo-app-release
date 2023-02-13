import React from "react";
import { Text } from "react-native";

function TitleText(props) {
    return (
        <Text
            {...props}
            style={{
                fontSize: 35,
                fontFamily: "IBMPlexSansKR_500Medium",
                marginTop: -20,
                marginBottom: -20,
                ...props.style,
            }}
        >
            {props.children}
        </Text>
    );
}

export default TitleText;
