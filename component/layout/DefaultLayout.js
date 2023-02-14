import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.backgroundColor};
    padding: 0px 10px 10px 10px;
`;

export default function DefaultLayout({ children }) {
    return (
            <Container>{children}</Container>
    );
}
