import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Divider = styled.View`
    width: ${(props) => props.thickness || 1}px;
    background-color: ${(props) => props.color || "black"};
    height: 100%;
`;

function VerticalDivider({ thickness, color }) {
    return <Divider width={thickness} color={color} />;
}

VerticalDivider.propTypes = {
    thickness: PropTypes.number,
    color: PropTypes.string,
};
export default VerticalDivider;
