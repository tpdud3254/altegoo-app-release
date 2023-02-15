import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import DefaultLayout from "../../../component/layout/DefaultLayout";
import { Ionicons } from "@expo/vector-icons";
import TitleText from "../../../component/text/TitleText";
import HorizontalDivider from "../../../component/divider/HorizontalDivider";
import SubTitleText from "../../../component/text/SubTitleText";
import { theme } from "../../../styles";
import Logo from "../../../component/logo/Logo";
import TruckLogo from "../../../component/logo/TruckLogo";
import { ORDINARY, PERSON } from "../../../constant";
import PlainText from "../../../component/text/PlainText";
import VerticalDivider from "../../../component/divider/VerticalDivider";
import LoginContext from "../../../context/LoginContext";
import { BackHandler } from "react-native";

const Container = styled.View`
    flex: 1;
    justify-content: space-between;
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

function RegistDone() {
    const { info, setInfo } = useContext(UserContext);
    const { setIsLoggedIn } = useContext(LoginContext);
    const navigation = useNavigation();

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", onNextStep);
    });

    const onNextStep = () => {
        navigation.navigate("Home");
        // signIn();
        return true;
    };

    const signIn = () => {
        const { phone, password } = info;

        console.log(phone);
        console.log(password);
        // axios({
        //     url: SERVER + "/users/sign-in",
        //     method: "POST",
        //     header: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json;charset=UTP-8",
        //     },
        //     withCredentials: true,
        //     data: { phone, password },
        // }).then(async ({ data }) => {
        //     const { result, token, msg, user } = data;
        //     if (result) {
        //         // setLogin(token, user.id, user);
        //         setInfo(user);
        //         await AsyncStorage.setItem("token", token);
        //         await AsyncStorage.setItem("userId", user.id + "");
        //         setIsLoggedIn(true);
        //     } else {
        //         Toast.show({
        //             type: "errorToast",
        //             props: msg,
        //         });
        //     }
        // });
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
                    <HeaderButton onPress={onNextStep}>
                        <Ionicons
                            name={"close-outline"}
                            size={45}
                            color={"black"}
                        />
                    </HeaderButton>
                </Header>
                <HorizontalDivider color={"#dedede"} />
                <Content>
                    <SubTitleText
                        style={{ fontSize: 23, color: theme.btnPointColor }}
                    >
                        작업 정보 입력이 완료되었습니다
                    </SubTitleText>
                    <Logo />
                    <TruckLogo />
                    <SubTitleText
                        style={{
                            fontSize: 20,
                            color: theme.btnPointColor,
                            textAlign: "center",
                        }}
                    >
                        최종등록까지 남은시간{"\n"}
                        05:00
                    </SubTitleText>

                    <PlainText
                        style={{
                            fontSize: 16,
                            textAlign: "center",
                            color: "#555555",
                            backgroundColor: theme.sub.yellow + "33",
                            paddingLeft: 10,
                            paddingRight: 10,
                            borderRadius: 10,
                        }}
                    >
                        {`작업이 최종 등록될 시 수정이 불가합니다.\n잘못 등록된 정보로 문제가 발생할 시\n작업 등록자에게 불이익이 있을 수 있으니\n반드시 정확한 정보를 확인하여 주시기 바랍니다.`}
                    </PlainText>
                </Content>
                <HorizontalDivider color={"#dedede"} />
                <ButtonContainer>
                    <Button>
                        {/* TODO: 기능추가 */}
                        <SubTitleText style={{ fontSize: 20 }}>
                            작업 수정
                        </SubTitleText>
                    </Button>
                    <VerticalDivider color={theme.textBoxColor} />
                    <Button>
                        {/* TODO: 기능추가 */}
                        <SubTitleText style={{ fontSize: 20 }}>
                            최종 등록
                        </SubTitleText>
                    </Button>
                </ButtonContainer>
            </Container>
        </DefaultLayout>
    );
}

export default RegistDone;
