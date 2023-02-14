import React, { useContext } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import DefaultLayout from "../../../component/layout/DefaultLayout";
import { Text } from "react-native";
import TitleText from "../../../component/text/TitleText";
import SubmitButton from "../../../component/button/SubmitButton";

const Container = styled.View`
  flex: auto;
`;
const Title = styled.View`
  margin-bottom: 15px;
`;

const ButtonContainer = styled.View``;

function SignUpStep3() {
  const { setInfo } = useContext(UserContext);
  const navigation = useNavigation();

  const onPress = (data) => {
    setInfo({ userType: data });
    navigation.navigate("SignUpStep4");
  };

  return (
    <DefaultLayout>
      <Container>
        <Title>
          <TitleText>약관동의</TitleText>
        </Title>
      </Container>
      <ButtonContainer>
        <SubmitButton
          text="회원가입"
          // disabled={!(watch("name") && watch("password") && watch("phone"))}
          // onPress={handleSubmit(onValid)}
        />
      </ButtonContainer>
    </DefaultLayout>
  );
}

export default SignUpStep3;
