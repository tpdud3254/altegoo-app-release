import React from "react";
import styled from "styled-components/native";
import { color } from "../../styles";

const Box = styled.View`
    background-color: ${color.inputColor};
    border-radius: 2px;
`;

function BorderBox({ children }) {
    return <Box>{children}</Box>;
}

export default BorderBox;
