import React from "react";
import { TouchableOpacity } from "react-native";
import { color } from "../../styles";
import PlainText from "../text/PlainText";

function Button(props) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            accent
            style={{
                backgroundColor:
                    props.type === "accent"
                        ? props.disabled
                            ? color.btnDisable
                            : color.btnAccent
                        : color.btnDefault,
                width: "100%",
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 12,
                ...props.style,
            }}
        >
            <PlainText
                style={{
                    fontWeight: "500",
                    color: props.type === "accent" ? "white" : "black",
                    ...props.textStyle,
                }}
            >
                {props.text}
            </PlainText>
        </TouchableOpacity>
    );
}

export default Button;
