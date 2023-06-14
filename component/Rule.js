import React from "react";
import PropTypes from "prop-types";
import MediumText from "./text/MediumText";
import { color } from "../styles";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components";

const SRule = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: -5px;
`;

function Rule({ text }) {
    const ExclamationMark = () => (
        <AntDesign
            name="exclamationcircleo"
            size={20}
            color={color.main}
            style={{ marginTop: 2 }}
        />
    );

    return (
        <SRule>
            <ExclamationMark />
            <MediumText
                style={{
                    fontSize: 20,
                    color: color.darkGrey,
                    marginLeft: 5,
                }}
            >
                {text}
            </MediumText>
        </SRule>
    );
}

Rule.propTypes = {
    text: PropTypes.string.isRequired,
};
export default Rule;
