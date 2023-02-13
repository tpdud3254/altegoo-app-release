import React from "react";
import styled from "styled-components/native";
import { theme } from "../../styles";

const Box = styled.View`
    border: 1px solid ${theme.boxColor};
`;

function BorderBox({ children }) {
    return <Box>{children}</Box>;
}

export default BorderBox;
