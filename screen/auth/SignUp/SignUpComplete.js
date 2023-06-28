import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { color } from "../../../styles";
import { COMPANY, DRIVER, NORMAL, SIGNUP_NAV } from "../../../constant";
import AuthLayout from "../../../component/layout/AuthLayout";
import RegularText from "../../../component/text/RegularText";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import MediumText from "../../../component/text/MediumText";
import LoginContext from "../../../context/LoginContext";
import { Ionicons } from "@expo/vector-icons";
import { BackHandler, useWindowDimensions } from "react-native";
import BoldText from "../../../component/text/BoldText";

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

function SignUpComplete() {
    const navigation = useNavigation();
    const { info, setInfo } = useContext(UserContext);
    const { setFirstLogin } = useContext(LoginContext);
    const { height: windowHeight } = useWindowDimensions();

    const onNext = () => {
        // if (type === "") {
        //     Toast.show({
        //         type: "errorToast",
        //         props: "회원 유형을 선택해 주세요.",
        //     });
        //     return;
        // }
        // const data = {
        //     userType: type,
        // };
        // setInfo(data);
        // navigation.navigate("SignUpStep1");
        console.log("done");
    };

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
        <AuthLayout>
            <Container height={windowHeight}>
                <WelcomeImage
                    style={{
                        resizeMode: "contain",
                    }}
                    source={require(`../../../assets/images/img_welcome.png`)}
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
                        {/* {info.phone.substring(0, 3)}-{info.phone.substring(3, 7)}-
                    {info.phone.substring(7, info.phone.length)} */}
                        01012341234
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
                    <RegularText
                        style={{
                            fontSize: 19,
                            color: color["page-dark-text"],
                            lineHeight: 29,
                            textAlign: "center",
                        }}
                    >
                        간편하고 정확한 사다리차 & 스카이차를{"\n"}지금 바로
                        이용해 보세요!{"\n"}작업을 등록만해도{"\n"}작업운임의
                        15%가 적립됩니다.
                        {/* TODO: 기사 기업일때도 추가(텍스트 다름)*/}
                    </RegularText>
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
                        <Button
                        // onPress={() =>
                        //     info.userType === ORDINARY
                        //         ? goToPage("Setting")
                        //         : info.userDetailType === PERSON
                        //         ? goToPage("Home")
                        //         : goToPage("Setting")
                        // }
                        >
                            <MediumText>
                                {/* {info.userType === ORDINARY
                                    ? "내정보"
                                    : info.userDetailType === PERSON
                                    ? "홈"
                                    : "내정보"} */}
                                내정보
                            </MediumText>
                        </Button>
                    </BottomButtonWrapper>
                </Bottom>
            </Container>
        </AuthLayout>
    );
}

export default SignUpComplete;
