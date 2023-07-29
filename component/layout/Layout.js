import React from "react";
import styled from "styled-components/native";
import { color } from "../../styles";
import { ScrollView } from "react-native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import RegistButton from "../button/RegistButton";

export const LAYOUT_PADDING_X = 16;
const Container = styled.View`
    flex: 1;
    background-color: ${color["page-background"]};
    padding-top: ${(props) => (props.headerShown ? 0 : 40)}px;
`;
const Wrapper = styled.View`
    flex: 1;
    padding: 10px ${LAYOUT_PADDING_X}px;
    min-height: ${(props) => props.windowHeight - 120}px;
`;

export default function Layout({ children, headerShown = true }) {
    const { height } = useWindowDimensions();
    return (
        <Container headerShown={headerShown}>
            <ScrollView>
                <Wrapper windowHeight={height}>{children}</Wrapper>
            </ScrollView>
            <RegistButton />
        </Container>
    );
}
