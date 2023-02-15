import React from "react";
import styled from "styled-components/native";

const Background = styled.View`
  background-color: #dddddd;
  width: 50%;
  padding: 10px 25px;
`;

const LogoImage = styled.Image`
  width: 100%;
  height: 60px;
`;
function TruckLogo() {
  return (
    <Background>
      <LogoImage
        style={{
          resizeMode: "contain",
        }}
        source={require(`../../assets/images/logo/truck-logo.png`)}
      />
    </Background>
  );
}

export default TruckLogo;
