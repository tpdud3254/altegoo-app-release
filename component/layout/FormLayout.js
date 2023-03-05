import React from "react";
import styled from "styled-components/native";
import { theme } from "../../styles";
import DismissKeyboard from "../DismissKeyboard";

const Container = styled.View`
    flex: 1;
    justify-content: space-between;
    background-color: ${theme.backgroundColor};
    padding: 0px 10px 0px 10px;
`;
//TODO: KeyboardAvoidingView추가
export default function FormLayout({ children }) {
    return (
        <DismissKeyboard>
            <Container>{children}</Container>
        </DismissKeyboard>
    );
}
