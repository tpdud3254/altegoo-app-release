import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { color } from "../../styles";
import AuthLayout from "../../component/layout/AuthLayout";
import RegularText from "../../component/text/RegularText";
import MediumText from "../../component/text/MediumText";
import { BackHandler, useWindowDimensions } from "react-native";
import BoldText from "../../component/text/BoldText";
import UserContext from "../../context/UserContext";
import { GetPhoneNumberWithDash } from "../../utils";

const Container = styled.View`
    justify-content: space-between;
    height: ${(props) => props.height - 40}px;
`;

const WelcomeImage = styled.Image`
    width: 100%;
    height: 400px;
`;

const WelcomText = styled.View`
    align-items: center;
`;
const Content = styled.View`
    background-color: ${color["box-color-background"]};
    align-items: center;
    padding: 20px 10px;
    border-radius: 15px;
`;

const Bottom = styled.View``;

const BottomButtonWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Button = styled.TouchableOpacity`
    background-color: ${(props) =>
        props.accent ? color["button-accent-background"] : color.btnDefault};
    width: 34%;
    height: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
`;

const AccentButton = styled(Button)`
    width: 64%;
`;

function Welcome() {
    const navigation = useNavigation();
    const { info } = useContext(UserContext);
    const { height: windowHeight } = useWindowDimensions();

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", onNextStep); //TODO: 뒤로가기 안됨
    });

    const goToPage = (pageName) => {
        console.log(pageName);
        if (pageName === "registWork") {
            navigation.navigate("TabsNavigator", { screen: "TabRegistWork" });
        } else if (pageName === "Setting") {
            navigation.navigate("TabsNavigator", {
                screen: "SettingNavigator",
            });
        } else {
            navigation.navigate("TabsNavigator");
        }
    };

    const onNextStep = () => {
        navigation.navigate("TabsNavigator");
        return true;
    };

    return (
        <AuthLayout>
            <Container height={windowHeight}>
                <WelcomeImage
                    style={{
                        resizeMode: "contain",
                    }}
                    source={require(`../../assets/images/img_welcome.png`)}
                />
                <WelcomText>
                    <RegularText
                        style={{
                            fontSize: 20,
                            color: color["page-dark-text"],
                        }}
                    >
                        회원님의 아이디는
                    </RegularText>
                    <BoldText
                        style={{
                            color: color["page-color-text"],
                            fontSize: 26,
                            marginTop: 5,
                            marginBottom: 5,
                        }}
                    >
                        {GetPhoneNumberWithDash(info.phone)}
                    </BoldText>
                    <RegularText
                        style={{
                            fontSize: 20,
                            color: color["page-dark-text"],
                        }}
                    >
                        입니다.
                    </RegularText>
                </WelcomText>
                <Content>
                    {info.userTypeId === 2 ? (
                        <RegularText
                            style={{
                                fontSize: 19,
                                color: color["page-dark-text"],
                                lineHeight: 29,
                                textAlign: "center",
                            }}
                        >
                            최초 1회 정회원 가입 없이{"\n"}작업 진행이
                            가능합니다.{"\n"}지금 바로 작업 요청을 확인해
                            보세요,
                        </RegularText>
                    ) : info.userTypeId === 3 ? (
                        <RegularText
                            style={{
                                fontSize: 19,
                                color: color["page-dark-text"],
                                lineHeight: 29,
                                textAlign: "center",
                            }}
                        >
                            <BoldText
                                style={{
                                    fontSize: 20,
                                    color: color["page-color-text"],
                                    lineHeight: 29,
                                }}
                            >
                                20,000원
                            </BoldText>{" "}
                            상당의 쿠폰이 발급되었습니다.{"\n"}
                            간편하고 정확한 사다리차 & 스카이차를
                            {"\n"}지금 바로 이용해 보세요!{"\n"}작업을
                            등록만해도{"\n"}작업운임의 15%가 적립됩니다.
                        </RegularText>
                    ) : (
                        <RegularText
                            style={{
                                fontSize: 19,
                                color: color["page-dark-text"],
                                lineHeight: 29,
                                textAlign: "center",
                            }}
                        >
                            간편하고 정확한 사다리차 & 스카이차를{"\n"}지금 바로
                            이용해 보세요!{"\n"}작업을 등록만해도{"\n"}
                            작업운임의 15%가 적립됩니다.
                        </RegularText>
                    )}
                </Content>
                <Bottom>
                    <BottomButtonWrapper>
                        <AccentButton
                            onPress={() => goToPage("registWork")}
                            accent
                        >
                            <MediumText
                                style={{
                                    color: "white",
                                }}
                            >
                                홈으로 가기
                            </MediumText>
                        </AccentButton>
                        <Button onPress={() => goToPage("Setting")}>
                            <MediumText>내정보</MediumText>
                        </Button>
                    </BottomButtonWrapper>
                </Bottom>
            </Container>
        </AuthLayout>
    );
}

export default Welcome;
