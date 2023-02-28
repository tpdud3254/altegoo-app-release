import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import FormLayout from "../../../component/layout/FormLayout";
import TitleText from "../../../component/text/TitleText";
import TitleInputItem from "../../../component/item/TitleInputItem";
import { TextInput } from "../../../component/input/TextInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import PlainText from "../../../component/text/PlainText";
import SubmitButton from "../../../component/button/SubmitButton";
import { useForm } from "react-hook-form";
import { checkPassword } from "../../../utils";
import Toast from "react-native-toast-message";
import PlainButton from "../../../component/button/PlainButton";

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

function OrdinarySignUp() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [textSecure, setTextSecure] = useState(true);
  const [phoneAuth, setPhoneAuth] = useState(false);
  const { info, setInfo } = useContext(UserContext);
  const navigation = useNavigation();

  const passwordRef = useRef();
  const phoneRef = useRef();

  useEffect(() => {
    console.log(info);
    register("name", {
      required: true,
    });
    register("password", {
      required: true,
    });
    register("phone", {
      required: true,
    });
  }, [register]);

  const showPassword = () => {
    setTextSecure((prev) => !prev);
  };

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onNextStep = ({ name, password, phone }) => {
    const authData = {
      userName: "고응주",
      gender: "남",
      birth: "580820",
    };
    const newData = { name, password, phone };
    setInfo({ ...newData, ...info, ...authData });
    navigation.navigate("SignUpStep3");
  };

  const getPhoneAuth = () => {
    console.log("본인인증");
    setPhoneAuth(true); //TODO:test code
    //TODO: 본인 인증 후 존재하는 아이디면 빠꾸
  };
  const onValid = ({ name, password, phone }) => {
    if (name.length < 2) {
      Toast.show({
        type: "errorToast",
        props: "이름을 2자리 이상 입력해주세요.",
      });
      return;
    }

    if (password.length < 8) {
      Toast.show({
        type: "errorToast",
        props: "비밀번호를 8자리 이상 입력해주세요.",
      });

      return;
    }

    if (!checkPassword(password)) {
      Toast.show({
        type: "errorToast",
        props: "비밀번호가 조건에 맞지 않습니다.",
      });

      return;
    }

    if (!phoneAuth) {
      Toast.show({
        type: "errorToast",
        props: "본인 인증을 진행해주세요.",
      });

      return;
    }

    //TODO: 가입된 회원인지 check

    onNextStep({ name, password, phone });
  };

  return (
    <FormLayout>
      <Container>
        <Title>
          <TitleText>회원가입</TitleText>
        </Title>
        <InputContainer>
          <View>
            <TitleInputItem title="이름">
              <TextInput
                placeholder="이름 (2자리 이상)"
                returnKeyType="next"
                onSubmitEditing={() => onNext(passwordRef)}
                onChangeText={(text) => setValue("name", text)}
              />
            </TitleInputItem>
            <TitleInputItem title="비밀번호">
              <Password>
                <TextInput
                  ref={passwordRef}
                  placeholder="비밀번호 (8자리 이상)"
                  secureTextEntry={textSecure}
                  returnKeyType="next"
                  onSubmitEditing={() => onNext(phoneRef)}
                  onChangeText={(text) => setValue("password", text)}
                  width="87%"
                />
                <TouchableOpacity onPress={showPassword}>
                  <PlainText>보기</PlainText>
                </TouchableOpacity>
              </Password>
            </TitleInputItem>
          </View>
          <PlainText style={{ fontSize: 20, marginTop: -5 }}>
            * 영문, 숫자를 포함한 8자 이상의 문자열
          </PlainText>
          <TitleInputItem title="휴대폰번호">
            {/* TODO: 휴대폰 API 리턴값 따라 달라질 수 있음 */}
            <TextInput
              ref={phoneRef}
              onChangeText={(text) => setValue("phone", text)}
              placeholder="숫자만 적어주세요"
              keyboardType="number-pad"
              returnKeyType="done"
            />
          </TitleInputItem>
          <PlainButton text="본인인증하기" onPress={getPhoneAuth} />
          {/* TODO: 본인인증 완료 텍스트 추가 */}
        </InputContainer>
      </Container>
      <ButtonContainer>
        <SubmitButton
          text="회원가입"
          disabled={!(watch("name") && watch("password") && watch("phone"))}
          onPress={handleSubmit(onValid)}
        />
      </ButtonContainer>
    </FormLayout>
  );
}

export default OrdinarySignUp;
