import React from "react";
import styled from "styled-components/native";

const Background = styled.View`
    width: 60%;
    padding: 10px 25px;
`;

const LogoImage = styled.Image`
    width: 100%;
    height: 65px;
`;
function Logo() {
    return (
        <Background>
            <LogoImage
                style={{
                    resizeMode: "contain",
                }}
                source={require(`../../assets/images/logo/text-logo.png`)}
            />
        </Background>
    );
}

export default Logo;
