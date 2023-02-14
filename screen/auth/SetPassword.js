import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, View } from "react-native";
import DefaultLayout from "../../component/layout/DefaultLayout";
import TitleText from "../../component/text/TitleText";
import ColumnInputItem from "../../component/item/ColumnInputItem";
import { TextInput } from "../../component/input/TextInput";
import PlainText from "../../component/text/PlainText";
import SubmitButton from "../../component/button/SubmitButton";
import PlainButton from "../../component/button/PlainButton";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { checkPassword } from "../../utils";
import axios from "axios";

const AuthContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const PassWordContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const Wrapper = styled.View`
  margin-top: 15px;
`;
function SetPassword() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [pass, setPass] = useState(false);
  const [phone, setPhone] = useState("010390665452"); //TODO: test code
  const passwordRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    register("newPassword", {
      required: true,
    });
    register("newPasswordCheck", {
      required: true,
    });
  }, [register]);

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const clickAuthButton = () => {
    setPass(true); //TODO: test code
  };

  const onValid = ({ newPassword, newPasswordCheck }) => {
    //TODO: 연동
    console.log(newPassword, newPasswordCheck);
    // if (newPassword === newPasswordCheck) {
    //   if (checkPassword(newPassword)) {
    //     axios({
    //       url: SERVER + "/users/password",
    //       method: "POST",
    //       header: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json;charset=UTP-8",
    //       },
    //       withCredentials: true,
    //       data: { phone, password: newPassword },
    //     }).then(async ({ data }) => {
    //       const { result, msg } = data;
    //       if (result) {
    //         Toast.show({
    //           type: "error",
    //           text1: "비밀번호가 변경 되었습니다.",
    //         });
    //         navigation.navigate("SignIn", {
    //           reset: true,
    //         });
    //       } else {
    //         Toast.show({
    //           type: "error",
    //           text1: msg,
    //         });
    //       }
    //     });
    //   } else {
    //     Toast.show({
    //       type: "error",
    //       text1: "비밀번호가 조건에 맞지 않습니다.",
    //     });
    //   }
    // } else {
    //   Toast.show({
    //     type: "error",
    //     text1: "비밀번호가 일치하지 않습니다.",
    //   });
    // }
  };

  return (
    <DefaultLayout>
      <TitleText>비밀번호 재설정</TitleText>

      {!pass ? (
        <AuthContainer>
          <PlainButton text="본인 인증하기" onPress={clickAuthButton} />
          <PlainText style={{ fontSize: 19 }}>
            본인 인증 후 비밀번호 초기화가 가능합니다.
          </PlainText>
        </AuthContainer>
      ) : (
        <PassWordContainer>
          <Wrapper>
            <ColumnInputItem title="새 비밀번호">
              <TextInput
                returnKeyType="next"
                onSubmitEditing={() => onNext(passwordRef)}
                secureTextEntry={true}
                onChangeText={(text) => setValue("newPassword", text)}
              />
            </ColumnInputItem>
            <ColumnInputItem title="새 비밀번호 확인">
              <TextInput
                ref={passwordRef}
                returnKeyType="done"
                secureTextEntry={true}
                onChangeText={(text) => setValue("newPasswordCheck", text)}
              />
            </ColumnInputItem>
            <PlainText style={{ fontSize: 20 }}>
              * 영문, 숫자를 포함한 8자 이상의 문자열
            </PlainText>
          </Wrapper>
          <SubmitButton
            text="비밀번호 재설정"
            onPress={handleSubmit(onValid)}
            disabled={!(watch("newPassword") && watch("newPasswordCheck"))}
          />
        </PassWordContainer>
      )}
    </DefaultLayout>
  );
}

SetPassword.propTypes = {};
export default SetPassword;
