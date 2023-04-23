import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";
import { color } from "../../styles";
import SubTitleText from "../text/SubTitleText";

function SubmitButton(props) {
    return (
        <TouchableOpacity
            {...props}
            style={{
                backgroundColor: color.btnAccent,
                borderRadius: 5,
                alignItems: "center",
                marginTop: 5,
                marginBottom: 5,
                width: "100%",
                height: 55,
                justifyContent: "center",
                opacity: props.disabled ? 0.5 : 1,
                ...props.style,
            }}
        >
            <SubTitleText style={{ color: "white", fontSize: 21 }}>
                {props.text}
            </SubTitleText>
        </TouchableOpacity>
    );
}

SubmitButton.propTypes = {
    text: PropTypes.string.isRequired,
};
export default SubmitButton;
