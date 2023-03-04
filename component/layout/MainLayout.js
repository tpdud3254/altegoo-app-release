import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
    flex: 1;
    padding: 10px;
`;

export default function MainLayout({ children }) {
    return <Container>{children}</Container>;
}
