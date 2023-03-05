import React, { useEffect } from "react";
import styled from "styled-components/native";
import DefaultLayout from "../../../component/layout/DefaultLayout";
import { Ionicons } from "@expo/vector-icons";
import TitleText from "../../../component/text/TitleText";
import HorizontalDivider from "../../../component/divider/HorizontalDivider";
import SubTitleText from "../../../component/text/SubTitleText";
import { theme } from "../../../styles";
import Logo from "../../../component/logo/Logo";
import TruckLogo from "../../../component/logo/TruckLogo";
import PlainText from "../../../component/text/PlainText";
import { BackHandler, View } from "react-native";

const Container = styled.View`
    flex: 1;
    justify-content: space-between;
    margin-top: 20px;
`;
const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0px 5px 0px;
`;
const HeaderButton = styled.TouchableOpacity``;

const Content = styled.View`
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 40px 0px;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    height: 100px;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 10px;
`;
const Button = styled.TouchableOpacity``;

function RegistCompleted({ navigation }) {
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () =>
            goToPage("Home")
        ); //TODO: 뒤로가기 안됨
    });

    const goToPage = (pageName) => {
        navigation.navigate(pageName);
    };

    return (
        <DefaultLayout>
            <Container>
                <Header>
                    <Ionicons
                        name={"close-outline"}
                        size={45}
                        color={"white"}
                    />
                    <TitleText style={{ fontSize: 23 }}>
                        작업 등록 완료
                    </TitleText>
                    <HeaderButton onPress={() => goToPage("Home")}>
                        <Ionicons
                            name={"close-outline"}
                            size={45}
                            color={"black"}
                        />
                    </HeaderButton>
                </Header>
                <HorizontalDivider color={"#dedede"} />
                <Content>
                    <View style={{ alignItems: "center" }}>
                        <SubTitleText
                            style={{
                                fontSize: 22,
                                color: theme.btnPointColor,
                            }}
                        >
                            등록이 완료되었습니다.
                        </SubTitleText>
                        <SubTitleText
                            style={{
                                fontSize: 19,
                                color: theme.btnPointColor,
                                marginTop: 10,
                            }}
                        >
                            소중한 작업을 등록해 주셔서 감사합니다.
                        </SubTitleText>
                    </View>
                    <Logo />
                    <TruckLogo />
                    <PlainText style={{ textAlign: "center" }}>
                        현재 등록 되어있는{"\n"}000명의 기사님께{"\n"}작업 요청
                        알림이 전송되었습니다.
                    </PlainText>
                </Content>
                <HorizontalDivider color={"#dedede"} />
                <ButtonContainer>
                    <Button onPress={() => goToPage("Home")}>
                        <SubTitleText>홈으로</SubTitleText>
                    </Button>
                </ButtonContainer>
            </Container>
        </DefaultLayout>
    );
}

export default RegistCompleted;
