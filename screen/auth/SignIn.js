import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import FormLayout from "../../component/layout/FormLayout";
import TitleText from "../../component/text/TitleText";
import SubTitleText from "../../component/text/SubTitleText";
import { TextInput } from "../../component/input/TextInput";
import TitleInputItem from "../../component/item/TitleInputItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import PlainText from "../../component/text/PlainText";
import PlainButton from "../../component/button/PlainButton";
import SubmitButton from "../../component/button/SubmitButton";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import axios from "axios";
import { VALID } from "../../constant";
import UserContext from "../../context/UserContext";
import LoginContext from "../../context/LoginContext";
import { SERVER } from "../../server";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { setAsyncStorageToken, showError } from "../../utils";
import LoadingLayout from "../../component/layout/LoadingLayout";

const Container = styled.View`
  flex: 1;
`;
const Title = styled.View`
  margin-bottom: 15px;
`;

const InputContainer = styled.View``;

const ButtonContainer = styled.View``;

const Password = styled.View`
  flex-direction: row;
  align-items: center;
`;

function SignIn() {
  const [textSecure, setTextSecure] = useState(true);
  const { register, handleSubmit, setValue, watch } = useForm();
  const navigation = useNavigation();
  const { setIsLoggedIn } = useContext(LoginContext);
  const { setInfo } = useContext(UserContext);

  const passwordRef = useRef();

  useEffect(() => {
    register("phone", {
      required: true,
    });
    register("password", {
      required: true,
    });
  }, [register]);

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const ShowPassword = () => {
    setTextSecure((prev) => !prev);
  };

  const ResetPassword = () => {
    navigation.navigate("SetPassword");
  };

  const onValid = ({ phone, password }) => {
    axios
      .post(SERVER + "/users/login", {
        phone,
        password,
      })
      .then(async ({ data }) => {
        const {
          result,
          data: { token, user },
          msg,
        } = data;

        if (result === VALID) {
          console.log("Current User : ", user);
          console.log("Token : ", token);
          setInfo(user);
          await setAsyncStorageToken(token);
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        showError(error);
      })
      .finally(() => {});
  };

  return (
    <>
      <FormLayout>
        <Container>
          <Title>
            <TitleText>로그인</TitleText>
            <SubTitleText>안녕하세요. 환영합니다.</SubTitleText>
          </Title>
          <InputContainer>
            <View>
              <TitleInputItem title="휴대폰번호">
                <TextInput
                  placeholder="숫자만 적어주세요"
                  keyboardType="number-pad"
                  returnKeyType="next"
                  onSubmitEditing={() => onNext(passwordRef)}
                  onChangeText={(text) => setValue("phone", text)}
                />
              </TitleInputItem>
              <TitleInputItem title="비밀번호">
                <Password>
                  <TextInput
                    ref={passwordRef}
                    placeholder="비밀번호"
                    secureTextEntry={textSecure}
                    returnKeyType="done"
                    onChangeText={(text) => setValue("password", text)}
                    width="87%"
                  />
                  <TouchableOpacity onPress={ShowPassword}>
                    <PlainText>보기</PlainText>
                  </TouchableOpacity>
                </Password>
              </TitleInputItem>
            </View>
            <PlainButton text="비밀번호 초기화" onPress={ResetPassword} />
          </InputContainer>
        </Container>
        <ButtonContainer>
          <SubmitButton
            text="로그인"
            disabled={!(watch("phone") && watch("password"))}
            onPress={handleSubmit(onValid)}
          />
        </ButtonContainer>
      </FormLayout>
    </>
  );
}

export default SignIn;
