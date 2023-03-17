import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import DefaultLayout from "../../../component/layout/DefaultLayout";
import { theme } from "../../../styles";
import Logo from "../../../component/logo/Logo";
import PlainText from "../../../component/text/PlainText";
import { BackHandler, View } from "react-native";
import RegistContext from "../../../context/RegistContext";
import { SERVER } from "../../../server";
import axios from "axios";
import { getAsyncStorageToken } from "../../../utils";
import { VALID } from "../../../constant";

const Container = styled.View`
    flex: 1;
    justify-content: space-between;
    margin-top: 20px;
    align-items: center;
`;
const Header = styled.View``;

const WelcomeImage = styled.Image`
    width: 100%;
    height: 400px;
    margin-top: -50px;
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

function RegistCompleted({ navigation, route }) {
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () =>
            goToPage("Home")
        ); //TODO: 뒤로가기 안됨

        getSpecialUserCount();
    });

    const getSpecialUserCount = async () => {
        try {
            const response = await axios.get(SERVER + "/users/special/count", {
                headers: {
                    auth: await getAsyncStorageToken(),
                },
            });

            console.log(response.data);

            const {
                data: { result },
            } = response;

            if (result === VALID) {
                const {
                    data: {
                        data: { count },
                    },
                } = response;

                setUserCount(count);
            } else {
                const {
                    data: { msg },
                } = response;

                console.log(msg);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const goToPage = (pageName) => {
        if (pageName === "TabRegistWork") navigation.popToTop();
        else navigation.navigate(pageName);
    };

    console.log(route?.params);

    return (
        <DefaultLayout>
            <Container>
                <Logo />
                <Header>
                    <PlainText
                        style={{
                            fontWeight: "600",
                            fontSize: 30,
                            textAlign: "center",
                            marginBottom: 30,
                        }}
                    >
                        작업 등록이{"\n"}완료되었습니다.
                    </PlainText>

                    <PlainText
                        style={{
                            fontSize: 22,
                            textAlign: "center",
                        }}
                    >
                        현재 등록되어 있는{"\n"}
                        <PlainText
                            style={{
                                fontSize: 22,
                                fontWeight: "400",
                                color: theme.main,
                            }}
                        >
                            {userCount}명
                        </PlainText>
                        의 기사님께{"\n"}작업 알림이 전송되었습니다.
                    </PlainText>
                </Header>
                {/* <HorizontalDivider color={"#dedede"} /> */}

                <Bottom>
                    <BottomButtonWrapper>
                        <AccentButton
                            accent
                            onPress={() => goToPage("TabRegistWork")}
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
                        <Button onPress={() => goToPage("Home")}>
                            <PlainText style={{ fontWeight: "500" }}>
                                홈
                            </PlainText>
                        </Button>
                    </BottomButtonWrapper>
                </Bottom>
            </Container>
        </DefaultLayout>
    );
}

export default RegistCompleted;
