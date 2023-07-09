import React from "react";
import styled from "styled-components/native";
import { color } from "../../styles";
import { ScrollView, TouchableWithoutFeedback } from "react-native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";

export const LAYOUT_PADDING_X = 16;
const Container = styled.View`
    flex: 1;
    background-color: ${color["page-background"]};
    padding-top: 40px;
`;
const Wrapper = styled.View`
    flex: 1;
    padding: 10px ${LAYOUT_PADDING_X}px;
    min-height: ${(props) => props.windowHeight - 120}px;
`;

export default function Layout({ children }) {
    const { height } = useWindowDimensions();
    return (
        <Container>
            <ScrollView>
                <Wrapper windowHeight={height}>{children}</Wrapper>
            </ScrollView>
        </Container>
    );
}
