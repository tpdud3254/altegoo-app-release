import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import DefaultLayout from "../../component/layout/DefaultLayout";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../styles";
import { ORDINARY, PERSON } from "../../constant";
import PlainText from "../../component/text/PlainText";
import LoginContext from "../../context/LoginContext";
import { BackHandler } from "react-native";
import UserContext from "../../context/UserContext";

const Container = styled.View`
    flex: 1;
`;

const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
`;

const HeaderButton = styled.TouchableOpacity`
    z-index: 3;
`;
const WelcomeImage = styled.Image`
    width: 100%;
    height: 400px;
    margin-top: -50px;
`;
const Content = styled.View`
    margin-top: 20px;
    align-items: center;
    padding: 20px 10px;
    background-color: ${theme.btnColor2};
    border-radius: 10px;
`;

const Bottom = styled.View`
    margin-top: 55px;
`;

const BottomButtonWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Button = styled.TouchableOpacity`
    background-color: ${(props) => (props.accent ? "#CD6A41" : "#EAF4FE")};
    width: 24%;
    height: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
`;

const AccentButton = styled(Button)`
    width: 74%;
`;

function Welcome({ navigation }) {
    const { info } = useContext(UserContext);
    const { setFirstLogin } = useContext(LoginContext);

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
                params: {
                    screen: "ModifyUserInfo",
                },
            });
        } else {
            navigation.navigate("TabsNavigator");
        }
    };

    const onNextStep = () => {
        navigation.navigate("TabsNavigator");
        setFirstLogin(false);
        return true;
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
                    <HeaderButton onPress={onNextStep}>
                        <Ionicons
                            name={"close-outline"}
                            size={45}
                            color={"black"}
                        />
                    </HeaderButton>
                </Header>
                <WelcomeImage
                    style={{
                        resizeMode: "contain",
                    }}
                    source={require(`../../assets/images/img_welcome.png`)}
                />
                <PlainText style={{ fontWeight: "500", textAlign: "center" }}>
                    회원님의 아이디는
                </PlainText>
                <PlainText
                    style={{
                        fontWeight: "500",
                        textAlign: "center",
                        color: theme.main,
                        fontSize: 25,
                    }}
                >
                    {info.phone.substring(0, 3)}-{info.phone.substring(3, 7)}-
                    {info.phone.substring(7, info.phone.length)}
                </PlainText>
                <PlainText style={{ fontWeight: "500", textAlign: "center" }}>
                    입니다.
                </PlainText>

                <Content>
                    {info.userType === ORDINARY ? (
                        <>
                            <PlainText
                                style={{
                                    fontSize: 20,
                                    textAlign: "center",
                                    color: "#333333",
                                }}
                            >
                                지금부터 알테구 작업 리스트 보기 및
                            </PlainText>
                            <PlainText
                                style={{
                                    fontSize: 20,
                                    textAlign: "center",
                                    color: "#333333",
                                }}
                            >
                                작업 등록이 가능합니다.
                            </PlainText>
                            <PlainText
                                style={{
                                    fontSize: 20,
                                    textAlign: "center",
                                    color: "#333333",
                                }}
                            >
                                최초 작업 등록 시{" "}
                                <PlainText
                                    style={{
                                        fontSize: 20,
                                        textAlign: "center",
                                        color: theme.main,
                                        fontWeight: "500",
                                    }}
                                >
                                    10,000P
                                </PlainText>
                                가 적립됩니다.
                            </PlainText>
                        </>
                    ) : info.userDetailType === PERSON ? (
                        <>
                            <PlainText
                                style={{
                                    fontSize: 20,
                                    textAlign: "center",
                                    color: "#333333",
                                }}
                            >
                                지금부터 알테구 작업 리스트 보기,
                            </PlainText>
                            <PlainText
                                style={{
                                    fontSize: 20,
                                    textAlign: "center",
                                    color: "#333333",
                                }}
                            >
                                작업 등록 및 작업예약이 가능합니다.
                            </PlainText>
                            <PlainText
                                style={{
                                    fontSize: 20,
                                    textAlign: "center",
                                    color: "#333333",
                                }}
                            >
                                최초 작업 등록 시{" "}
                                <PlainText
                                    style={{
                                        fontSize: 20,
                                        textAlign: "center",
                                        color: theme.main,
                                        fontWeight: "500",
                                    }}
                                >
                                    10,000P
                                </PlainText>
                                가 적립됩니다.
                            </PlainText>
                        </>
                    ) : (
                        <>
                            <PlainText
                                style={{
                                    fontSize: 20,
                                    textAlign: "center",
                                    color: "#333333",
                                }}
                            >
                                지금부터 알테구 작업 리스트 보기 및
                            </PlainText>
                            <PlainText
                                style={{
                                    fontSize: 20,
                                    textAlign: "center",
                                    color: "#333333",
                                }}
                            >
                                작업 등록이 가능합니다.
                            </PlainText>
                            <PlainText
                                style={{
                                    fontSize: 20,
                                    textAlign: "center",
                                    color: "#333333",
                                }}
                            >
                                최초 작업 등록 시{" "}
                                <PlainText
                                    style={{
                                        fontSize: 20,
                                        textAlign: "center",
                                        color: theme.main,
                                        fontWeight: "500",
                                    }}
                                >
                                    10,000P
                                </PlainText>
                                가 적립됩니다.
                            </PlainText>
                        </>
                    )}
                </Content>

                <Bottom>
                    <BottomButtonWrapper>
                        <AccentButton
                            onPress={() => goToPage("registWork")}
                            accent
                        >
                            <PlainText
                                style={{
                                    fontWeight: "500",
                                    color: "white",
                                }}
                            >
                                작업등록하러 하기
                            </PlainText>
                        </AccentButton>
                        <Button
                            onPress={() =>
                                info.userType === ORDINARY
                                    ? goToPage("Setting")
                                    : info.userDetailType === PERSON
                                    ? goToPage("Home")
                                    : goToPage("Setting")
                            }
                        >
                            <PlainText style={{ fontWeight: "500" }}>
                                {info.userType === ORDINARY
                                    ? "내정보"
                                    : info.userDetailType === PERSON
                                    ? "홈"
                                    : "내정보"}
                            </PlainText>
                        </Button>
                    </BottomButtonWrapper>
                </Bottom>
            </Container>
        </DefaultLayout>
    );
}

export default Welcome;
