import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { FlatList, useWindowDimensions, View } from "react-native";
import * as Location from "expo-location";
import Logo from "../component/logo/Logo";
import { theme } from "../styles";
import VerticalDivider from "../component/divider/VerticalDivider";
import { useNavigation } from "@react-navigation/native";
import SubTitleText from "../component/text/SubTitleText";
import axios from "axios";
import { SERVER } from "../server";
import PlainText from "../component/text/PlainText";

const imagePath = [
    require(`../assets/images/intro/img_01.png`),
    require(`../assets/images/intro/img_02.png`),
    require(`../assets/images/intro/img_03.png`),
];

const Container = styled.View`
    flex: 1;
    width: 100%;
    background-color: white;
`;

const Top = styled.View`
    flex: 1.2;
    padding-top: 30px;
    padding-bottom: 30px;
    align-items: center;
`;

const Middle = styled.View`
    flex: 10;
    align-items: center;
    margin-top: 120px;
`;

const Bottom = styled.View`
    flex: 1.5;
`;

const IntroImage = styled.Image`
    width: ${(props) => props.size + "px"};
    height: ${(props) => props.size + "px"};
`;

const MiddleButtonWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-bottom: 35px;
`;

const CircleButton = styled.TouchableOpacity`
    width: ${(props) => (props.cur ? "35px" : "13px")};
    height: 13px;
    background-color: ${(props) => props.color || props.theme.main};
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    margin: 0px 5px 0px 5px;
`;

const BottomButtonWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    /* margin-top: 50px; */
    /* height: 60%; */
    justify-content: space-evenly;
`;

const Button = styled.TouchableOpacity`
    background-color: ${(props) => (props.accent ? "#CD6A41" : "#EAF4FE")};
    width: 185px;
    height: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
`;

function Intro() {
    const { width: imageSize } = useWindowDimensions();
    const navigation = useNavigation();
    const flatListRef = useRef();
    const [imageIndex, setImageIndex] = useState(0);
    const [ok, setOk] = useState(true);

    const askLocationPermission = async () => {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
            setOk(false);
        }
    };

    useEffect(() => {
        askLocationPermission();
    }, []);

    const renderIntro = ({ item: path }) => (
        <IntroImage size={imageSize} source={path} />
    );

    const scrollToIntroImage = (index) => {
        flatListRef.current.scrollToIndex({ index });
        setImageIndex(index);
    };

    const goToSignIn = () => {
        navigation.navigate("SignInNavigator");
    };

    const goToSignUp = () => {
        navigation.navigate("SignUpNavigator");
    };
    return (
        <>
            {
                ok ? (
                    <Container>
                        {/* <Top>
                            <Logo />
                        </Top> */}
                        <Middle>
                            <FlatList
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                data={imagePath}
                                renderItem={renderIntro}
                                ref={flatListRef}
                                onMomentumScrollEnd={(event) => {
                                    const index = Math.floor(
                                        Math.floor(
                                            event.nativeEvent.contentOffset.x
                                        ) /
                                            Math.floor(
                                                event.nativeEvent
                                                    .layoutMeasurement.width
                                            )
                                    );
                                    setImageIndex(index);
                                }}
                            />
                            <MiddleButtonWrapper>
                                {imagePath.map((__, index) => (
                                    <CircleButton
                                        key={index}
                                        onPress={() =>
                                            scrollToIntroImage(index)
                                        }
                                        color={
                                            imageIndex === index
                                                ? "#CD6A41"
                                                : "rgba(205, 106, 65, 0.4)"
                                        }
                                        cur={imageIndex === index}
                                    />
                                ))}
                            </MiddleButtonWrapper>
                        </Middle>
                        <Bottom>
                            <BottomButtonWrapper>
                                <Button onPress={goToSignIn} accent>
                                    <PlainText
                                        style={{
                                            fontWeight: "500",
                                            color: "white",
                                        }}
                                    >
                                        로그인
                                    </PlainText>
                                </Button>
                                <Button onPress={goToSignUp}>
                                    <PlainText style={{ fontWeight: "500" }}>
                                        회원가입
                                    </PlainText>
                                </Button>
                            </BottomButtonWrapper>
                        </Bottom>
                    </Container>
                ) : null //TODO: 어플종료 추가
            }
        </>
    );
}

export default Intro;
