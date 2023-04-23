import React, { useContext } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import DefaultLayout from "../../../component/layout/DefaultLayout";
import SubTitleText from "../../../component/text/SubTitleText";
import PlainText from "../../../component/text/PlainText";
import { color } from "../../../styles";
import { ORDINARY, SPECIAL } from "../../../constant";

const Container = styled.View`
    justify-content: space-evenly;
    flex: 1;
`;
const Wrapper = styled.View``;
const Button = styled.TouchableOpacity`
    background-color: ${color.btnAccent};
    align-items: center;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 5px;
`;
const Content = styled.View``;

function SignUp() {
    const { setInfo } = useContext(UserContext);
    const navigation = useNavigation();

    const onPress = (data) => {
        setInfo({ userType: data });
        navigation.navigate("SignUpStep1");
    };

    return (
        <DefaultLayout>
            <Container>
                <Wrapper>
                    <Button onPress={() => onPress(ORDINARY)}>
                        <SubTitleText
                            style={{
                                color: color.textLight,
                                fontSize: 25,
                            }}
                        >
                            일반회원 가입
                        </SubTitleText>
                    </Button>
                    <Content>
                        <PlainText style={{ fontSize: 20 }}>
                            일반회원은 작업 등록만 가능하며 등록된 작업을 예약할
                            수 없습니다.
                            {"\n"}일반회원 가입 후 언제든지 자유롭게
                            기사/기업회원 전환이 가능합니다.
                        </PlainText>
                    </Content>
                </Wrapper>
                <Wrapper>
                    <Button onPress={() => onPress(SPECIAL)}>
                        <SubTitleText
                            style={{
                                color: color.textLight,
                                fontSize: 25,
                            }}
                        >
                            기사/기업 가입
                        </SubTitleText>
                    </Button>
                    <Content>
                        <PlainText style={{ fontSize: 20 }}>
                            기사/기업회원은 작업 등록 분만 아니라 등록된 작업을
                            예약하여 진행하실 수 있습니다.{"\n"}제휴 기업의 경우
                            별도의 작업 등록 시스템이 제공됩니다.
                        </PlainText>
                    </Content>
                </Wrapper>
            </Container>
        </DefaultLayout>
    );
}

export default SignUp;
