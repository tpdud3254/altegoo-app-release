import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { theme } from "../../styles";

export const ButtonContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const KaKaoButton = styled.TouchableOpacity`
    width: 18%;
    height: 55px;
    background-color: ${theme.btnColor + "77"};
    border-radius: 5px;
    justify-content: center;
`;

function KakaoButton() {
    const goToKakaoChat = () => {
        //TODO: 카카오톡 챗 추가
    };

    return (
        <KaKaoButton onPress={goToKakaoChat}>
            <Image
                style={{
                    resizeMode: "contain",
                    width: "100%",
                    height: 45,
                }}
                source={require(`../../assets/images/kakao-logo.png`)}
            />
        </KaKaoButton>
    );
}

export default KakaoButton;
