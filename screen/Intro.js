import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { FlatList, useWindowDimensions } from "react-native";
import * as Location from "expo-location";
import Logo from "../component/logo/Logo";
import { theme } from "../styles";
import VerticalDivider from "../component/divider/VerticalDivider";
import { useNavigation } from "@react-navigation/native";
import SubTitleText from "../component/text/SubTitleText";

const imagePath = [
    require(`../assets/images/intro/intro_1.jpeg`),
    require(`../assets/images/intro/intro_2.jpeg`),
    require(`../assets/images/intro/intro_3.jpeg`),
];

const Container = styled.View`
    flex: 1;
    width: 100%;
    background-color: white;
`;

const Top = styled.View`
    flex: 1;
    padding-top: 15px;
    padding-bottom: 15px;
    align-items: center;
`;

const Middle = styled.View`
    flex: 5;
    align-items: center;
`;

const Bottom = styled.View`
    flex: 2;
`;

const IntroImage = styled.Image`
    width: ${(props) => props.size + "px"};
    height: ${(props) => props.size + "px"};
`;

const MiddleButtonWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
`;

const CircleButton = styled.TouchableOpacity`
    width: 25px;
    height: 25px;
    background-color: ${(props) => props.color || props.theme.main};
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    margin: 0px 5px 0px 5px;
`;

const BottomButtonWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 50px;
    height: 60%;
`;

const Button = styled.TouchableOpacity`
    background-color: ${(props) => props.color || props.theme.main};
    justify-content: center;
    align-items: center;
    width: 50%;
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
                        <Top>
                            <Logo />
                        </Top>
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
                                                ? theme.sub.yellow
                                                : "#eeeeee"
                                        }
                                    />
                                ))}
                            </MiddleButtonWrapper>
                        </Middle>
                        <Bottom>
                            <BottomButtonWrapper>
                                <Button onPress={goToSignIn}>
                                    <SubTitleText>로그인</SubTitleText>
                                </Button>
                                <VerticalDivider color="#cccccc" />

                                <Button onPress={goToSignUp}>
                                    <SubTitleText>회원가입</SubTitleText>
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
