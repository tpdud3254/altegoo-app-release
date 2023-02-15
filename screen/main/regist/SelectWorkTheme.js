import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import DefaultLayout from "../../../component/layout/DefaultLayout";
import { theme } from "../../../styles";
import SubTitleText from "../../../component/text/SubTitleText";

const Container = styled.View`
    flex: 1;
    justify-content: center;
`;
const Warrper = styled.View`
    margin-top: 15px;
`;

const Row = styled.View`
    flex-direction: row;
    justify-content: center;
`;

const Button = styled.TouchableOpacity`
    align-items: center;
    background-color: ${(props) => props.color};
    padding: 15px 25px;
    border-radius: 10px;
    margin: 5px 5px;
`;

function SelectWorkTheme({ navigation }) {
    const selectTheme = (type, range) => {
        navigation.navigate("RegistWork", { type, range });
    };

    const MainText = ({ text }) => (
        <SubTitleText
            style={{
                color: "white",
                fontSize: 30,
            }}
        >
            {text}
        </SubTitleText>
    );

    const SubText = ({ text }) => (
        <SubTitleText
            style={{
                color: "white",
                fontSize: 20,
                marginTop: -10,
                marginBottom: 15,
            }}
        >
            {text}
        </SubTitleText>
    );

    return (
        <DefaultLayout>
            <Container>
                <Warrper>
                    <Row>
                        <Button
                            color={theme.sub.yellow}
                            onPress={() => {
                                selectTheme("ladder", "row");
                            }}
                        >
                            <MainText text="사다리" />
                            <SubText text="저층 (1-5층)" />
                        </Button>
                        <Button
                            color={theme.sub.yellow}
                            onPress={() => {
                                selectTheme("ladder", "middle");
                            }}
                        >
                            <MainText text="사다리" />
                            <SubText text="중층 (6-12층)" />
                        </Button>
                    </Row>
                    <Row>
                        <Button
                            color={theme.sub.yellow}
                            onPress={() => {
                                selectTheme("ladder", "high");
                            }}
                        >
                            <MainText text="사다리" />
                            <SubText text="고층 (12층 이상)" />
                        </Button>
                    </Row>
                </Warrper>
                <Warrper>
                    <Row>
                        <Button
                            color={theme.sub.green + "ee"}
                            onPress={() => {
                                selectTheme("sky", "row");
                            }}
                        >
                            <MainText text="스카이" />
                            <SubText text="저층 (1-5층)" />
                        </Button>

                        <Button
                            color={theme.sub.green + "ee"}
                            onPress={() => {
                                selectTheme("sky", "middle");
                            }}
                        >
                            <MainText text="스카이" />
                            <SubText text="중층 (6-12층)" />
                        </Button>
                    </Row>
                    <Row>
                        <Button
                            color={theme.sub.green + "ee"}
                            onPress={() => {
                                selectTheme("sky", "high");
                            }}
                        >
                            <MainText text="스카이" />
                            <SubText text="고층 (12층 이상)" />
                        </Button>
                    </Row>
                </Warrper>
            </Container>
        </DefaultLayout>
    );
}

export default SelectWorkTheme;
