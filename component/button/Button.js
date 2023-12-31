import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import { color } from "../../styles";
import MediumText from "../text/MediumText";

export const BottomButton = styled.View`
    background-color: white;
    padding-top: 10px;
`;
function Button(props) {
    return (
        <TouchableOpacity
            onPress={props.disabled ? undefined : props.onPress}
            accent
            style={{
                backgroundColor:
                    props.type === "accent"
                        ? props.disabled
                            ? color["button-accent-disabled-background"]
                            : color["button-accent-background"]
                        : color.btnDefault,
                width: "100%",
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 14,
                ...props.style,
            }}
        >
            <MediumText
                style={{
                    fontWeight: "500",
                    color: props.type === "accent" ? "white" : "black",
                    ...props.textStyle,
                }}
            >
                {props.text}
            </MediumText>
        </TouchableOpacity>
    );
}

export default Button;
