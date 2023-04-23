import React from "react";
import styled from "styled-components/native";
import { color } from "../../styles";

const Container = styled.View`
    flex: 1;
    background-color: ${color.background};
    padding: 0px 10px 10px 10px;
`;

export default function DefaultLayout({ children }) {
    return <Container>{children}</Container>;
}
