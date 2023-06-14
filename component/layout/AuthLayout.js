import React from "react";
import styled from "styled-components/native";
import { color } from "../../styles";
import { ScrollView, TouchableWithoutFeedback } from "react-native";
import MediumText from "../text/MediumText";

const Container = styled.View`
    flex: 1;
    background-color: ${color["page-background"]};
`;
const Wrapper = styled.View`
    flex: 1;
    padding: 10px 16px;
`;

const BottomButton = styled.TouchableOpacity`
    background-color: ${(props) =>
        props.disabled ? color.btnDisable : color.btnAccent};
    height: 60px;
    align-items: center;
    justify-content: center;
`;

export default function AuthLayout({ children, bottomButtonProps }) {
    return (
        <Container>
            <ScrollView>
                <TouchableWithoutFeedback>
                    <Wrapper>{children}</Wrapper>
                </TouchableWithoutFeedback>
            </ScrollView>
            <BottomButton
                onPress={bottomButtonProps.onPress}
                disabled={bottomButtonProps.disabled}
            >
                <MediumText style={{ color: "white" }}>
                    {bottomButtonProps.title}
                </MediumText>
            </BottomButton>
        </Container>
    );
}
