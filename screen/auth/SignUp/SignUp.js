import React, { useContext } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import PlainText from "../../../component/text/PlainText";
import { color } from "../../../styles";
import { COMPANY, ORDINARY, PERSON, SPECIAL } from "../../../constant";
import { Entypo } from "@expo/vector-icons";
import HorizontalDivider from "../../../component/divider/HorizontalDivider";

const Container = styled.View`
    justify-content: space-evenly;
    flex: 1;
    padding: 0px 20px;
`;

const Wrapper = styled.TouchableOpacity`
    background-color: white;
    border-radius: 5px;
    padding: 10px;
`;

const Title = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
`;

const Content = styled.View`
    margin-top: 8px;
`;

function SignUp() {
    const { setInfo } = useContext(UserContext);
    const navigation = useNavigation();

    const onPress = (userType, userDetailType) => {
        const data = {
            userType: userType,
            ...(userDetailType && { userDetailType }),
        };

        setInfo(data);
        navigation.navigate("SignUpStep1");
    };

    const Text = ({ text }) => {
        return (
            <PlainText style={{ color: color.darkGrey, marginBottom: 3 }}>
                {text}
            </PlainText>
        );
    };

    return (
        <Container>
            <Wrapper onPress={() => onPress(ORDINARY)}>
                <Title>
                    <PlainText style={{ fontWeight: "400" }}>
                        일반 회원가입
                    </PlainText>
                    <Entypo
                        name="chevron-small-right"
                        size={30}
                        color={color.main}
                    />
                </Title>
                <HorizontalDivider thickness={0.5} color={color.lightGrey} />
                <Content>
                    <Text text="일반회원은 작업 등록만 가능하며 등록된 작업을 예약할 수 없습니다." />
                    <Text text="일반회원 가입 후 언제든지 자유롭게 기사/기업회원 전환이 가능합니다." />
                </Content>
            </Wrapper>
            <Wrapper onPress={() => onPress(SPECIAL, PERSON)}>
                <Title>
                    <PlainText style={{ fontWeight: "400" }}>
                        기사 회원가입
                    </PlainText>
                    <Entypo
                        name="chevron-small-right"
                        size={30}
                        color={color.main}
                    />
                </Title>
                <HorizontalDivider thickness={0.5} color={color.lightGrey} />
                <Content>
                    <Text text="기사회원은 작업 등록 뿐만 아니라 등록된 작업을 예약하여 진행하실 수 있습니다." />
                    <Text text="제휴 기업의 경우 별도의 작업 등록 시스템이 제공됩니다." />
                </Content>
            </Wrapper>
            <Wrapper onPress={() => onPress(SPECIAL, COMPANY)}>
                <Title>
                    <PlainText style={{ fontWeight: "400" }}>
                        기업 회원가입
                    </PlainText>
                    <Entypo
                        name="chevron-small-right"
                        size={30}
                        color={color.main}
                    />
                </Title>
                <HorizontalDivider thickness={0.5} color={color.lightGrey} />
                <Content>
                    <Text text="기업회원은 작업 등록 뿐만 아니라 등록된 작업을 예약하여 진행하실 수 있습니다." />
                    <Text text="제휴 기업의 경우 별도의 작업 등록 시스템이 제공됩니다." />
                </Content>
            </Wrapper>
        </Container>
    );
}

export default SignUp;
