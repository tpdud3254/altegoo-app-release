import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Divider = styled.View`
    height: ${(props) => props.thickness || 1}px;
    background-color: ${(props) => props.color || "black"};
    width: 100%;
`;

function HorizontalDivider({ thickness, color }) {
    return <Divider width={thickness} color={color} />;
}

HorizontalDivider.propTypes = {
    thickness: PropTypes.number,
    color: PropTypes.string,
};
export default HorizontalDivider;
