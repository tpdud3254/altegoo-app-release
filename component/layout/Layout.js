import React from "react";
import styled from "styled-components/native";
import { color } from "../../styles";
import { ScrollView, TouchableWithoutFeedback } from "react-native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import RegistButton from "../button/RegistButton";
import MediumText from "../text/MediumText";

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

const BottomButton = styled.TouchableOpacity`
    background-color: ${(props) =>
        props.disabled ? color.btnDisable : color.btnAccent};
    height: 60px;
    align-items: center;
    justify-content: center;
`;

export default function Layout({
    children,
    headerShown = true,
    registBtnShown = false,
    bottomButtonProps,
}) {
    const { height } = useWindowDimensions();
    return (
        <Container headerShown={headerShown}>
            <ScrollView>
                <TouchableWithoutFeedback>
                    <Wrapper windowHeight={height}>{children}</Wrapper>
                </TouchableWithoutFeedback>
            </ScrollView>
            {registBtnShown ? <RegistButton /> : null}
            {bottomButtonProps ? (
                <BottomButton
                    onPress={bottomButtonProps.onPress}
                    disabled={bottomButtonProps.disabled}
                >
                    <MediumText style={{ color: "white" }}>
                        {bottomButtonProps.title}
                    </MediumText>
                </BottomButton>
            ) : null}
        </Container>
    );
}
