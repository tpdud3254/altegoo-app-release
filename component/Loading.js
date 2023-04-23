import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import { color } from "../styles";

const LoadingContainer = styled.View`
    background-color: #ffffffcc;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    justify-content: center;
`;

function Loading() {
    return (
        <LoadingContainer>
            <ActivityIndicator size={50} color={color.sub.yellow} />
        </LoadingContainer>
    );
}

export default Loading;
