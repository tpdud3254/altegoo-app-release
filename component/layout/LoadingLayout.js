import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { color } from "../../styles";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${color["page-background"]};
`;

export default function LoadingLayout() {
    return (
        <Container>
            <ActivityIndicator size={50} color={color.main} />
        </Container>
    );
}
