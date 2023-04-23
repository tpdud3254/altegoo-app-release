import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";
import { color } from "../../styles";
import SubTitleText from "../text/SubTitleText";

function PlainButton(props) {
    return (
        <TouchableOpacity
            {...props}
            style={{
                backgroundColor: color.btnDefault,
                borderRadius: 5,
                alignItems: "center",
                marginTop: 5,
                marginBottom: 5,
                width: "100%",
                height: 55,
                justifyContent: "center",
                ...props.style,
            }}
        >
            <SubTitleText style={{ color: "white", fontSize: 21 }}>
                {props.text}
            </SubTitleText>
        </TouchableOpacity>
    );
}

PlainButton.propTypes = {
    text: PropTypes.string.isRequired,
};
export default PlainButton;
