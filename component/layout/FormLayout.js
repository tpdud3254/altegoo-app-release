import React from "react";
import styled from "styled-components/native";
import DismissKeyboard from "../DismissKeyboard";

const Container = styled.View`
    flex: 1;
    justify-content: space-between;
    background-color: ${(props) => props.theme.backgroundColor};
    padding: 0px 10px 10px 10px;
    background-color: white;
`;

export default function FormLayout({ children }) {
    return (
        <DismissKeyboard>
            <Container>{children}</Container>
        </DismissKeyboard>
    );
}
