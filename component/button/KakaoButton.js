import React from "react";
import { Image, View } from "react-native";
import styled from "styled-components/native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { useNavigation } from "@react-navigation/native";

export const ButtonContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: 100;
`;

const Container = styled.TouchableOpacity`
    position: absolute;
    bottom: 60px;
    right: 0px;
`;

function KakaoButton() {
    const { height } = useWindowDimensions();
    const navigation = useNavigation();
    const goToKakaoChat = () => {
        console.log("kakao");
    };

    return (
        <View style={{ height: height, position: "absolute", width: "100%" }}>
            <Container onPress={goToKakaoChat} windowHeight={height}>
                <Image
                    style={{
                        resizeMode: "contain",
                        width: 170,
                    }}
                    source={require(`../../assets/images/icons/btn_kakao_help.png`)}
                />
            </Container>
        </View>
    );
}

export default KakaoButton;
