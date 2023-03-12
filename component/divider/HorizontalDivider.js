import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Divider = styled.View`
    height: ${(props) => props.thickness || 1}px;
    background-color: ${(props) => props.color || "black"};
    width: ${(props) => (props.width ? props.width : "100%")};
`;

function HorizontalDivider({ thickness, color, width }) {
    return <Divider thickness={thickness} color={color} width={width} />;
}

HorizontalDivider.propTypes = {
    thickness: PropTypes.number,
    color: PropTypes.string,
};
export default HorizontalDivider;
