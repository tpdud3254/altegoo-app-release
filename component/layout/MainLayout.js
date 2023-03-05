import React from "react";
import styled from "styled-components/native";
import DismissKeyboard from "../DismissKeyboard";

const Container = styled.View`
    flex: 1;
    padding: 10px;
`;

export default function MainLayout({ children }) {
    return (
        <DismissKeyboard>
            <Container>{children}</Container>
        </DismissKeyboard>
    );
}
