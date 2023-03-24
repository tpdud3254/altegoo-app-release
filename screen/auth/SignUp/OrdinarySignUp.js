import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import FormLayout from "../../../component/layout/FormLayout";
import TitleInputItem from "../../../component/item/TitleInputItem";
import { TextInput } from "../../../component/input/TextInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import PlainText from "../../../component/text/PlainText";
import { useForm } from "react-hook-form";
import { checkPassword, getAsyncStorageToken, showError } from "../../../utils";
import Toast from "react-native-toast-message";
import axios from "axios";
import { SERVER } from "../../../utils";
import { VALID } from "../../../constant";
import { color } from "../../../styles";
import Button from "../../../component/button/Button";
import { AntDesign } from "@expo/vector-icons";
import LoadingLayout from "../../../component/layout/LoadingLayout";
import Rule from "../../../component/Rule";

const Container = styled.View`
  flex: 1;
`;

const Password = styled.View`
  flex-direction: row;
  align-items: center;
`;

function OrdinarySignUp() {
  const navigation = useNavigation();
  const { info, setInfo } = useContext(UserContext);
  const { register, handleSubmit, setValue, watch, getValues } = useForm();

  const [loading, setLoading] = useState(false);
  const [textSecure, setTextSecure] = useState(true);
  const [showNameRule, setShowNameRule] = useState(false);
  const [showPwdRule, setShowPwdRule] = useState(false);
  const [showPhoneRule, setShowPhoneRule] = useState(false);

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
    setLoading(false);
  };

  const getPhoneAuth = ({ name, password, phone }) => {
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

    setLoading(true);

    axios
      .get(SERVER + "/users/search", {
        params: {
          phone,
        },
        headers: {
          token: getAsyncStorageToken(),
        },
      })
      .then(({ data }) => {
        const { result } = data;

        if (result === VALID) {
          Toast.show({
            type: "errorToast",
            props: "이미 존재하는 사용자입니다.",
          });
          setLoading(false);
        } else {
          onNextStep({ name, password, phone });
        }
      })
      .catch((error) => {
        showError(error);
        setLoading(false);
      })
      .finally(() => {});
  };

  const ExclamationMark = () => (
    <AntDesign
      name="exclamationcircleo"
      size={20}
      color={color.main}
      style={{ marginTop: 2 }}
    />
  );

  return (
    <>
      {loading ? (
        <LoadingLayout />
      ) : (
        <FormLayout>
          <Container>
            <TitleInputItem>
              <TextInput
                placeholder="이름"
                returnKeyType="next"
                onSubmitEditing={() => onNext(passwordRef)}
                onChangeText={(text) => setValue("name", text)}
                onFocus={() => setShowNameRule(true)}
                onBlur={() => setShowNameRule(false)}
                defaultValue={getValues("name")}
              />
            </TitleInputItem>
            {showNameRule ? <Rule text="두 자리 이상 입력해주세요" /> : null}
            <TitleInputItem>
              <Password>
                <TextInput
                  ref={passwordRef}
                  placeholder="비밀번호"
                  secureTextEntry={textSecure}
                  returnKeyType="next"
                  onSubmitEditing={() => onNext(phoneRef)}
                  onChangeText={(text) => setValue("password", text)}
                  width="87%"
                  onFocus={() => setShowPwdRule(true)}
                  onBlur={() => setShowPwdRule(false)}
                  defaultValue={getValues("password")}
                />
                <TouchableOpacity onPress={showPassword}>
                  <PlainText>보기</PlainText>
                </TouchableOpacity>
              </Password>
            </TitleInputItem>
            {showPwdRule ? (
              <Rule text="영문, 숫자 포함 8자리 이상 입력해주세요" />
            ) : null}
            <TitleInputItem>
              {/* TODO: 휴대폰 API 리턴값 따라 달라질 수 있음 */}
              <TextInput
                ref={phoneRef}
                onChangeText={(text) => setValue("phone", text)}
                placeholder="휴대폰번호"
                keyboardType="number-pad"
                returnKeyType="done"
                defaultValue={getValues("phone")}
                onFocus={() => setShowPhoneRule(true)}
                onBlur={() => setShowPhoneRule(false)}
              />
            </TitleInputItem>
            {showPhoneRule ? <Rule text="숫자만 입력해 주세요" /> : null}
          </Container>
          <Button
            type="accent"
            text="본인인증 후 가입하기"
            onPress={handleSubmit(getPhoneAuth)}
            disabled={!(watch("phone") && watch("name") && watch("password"))}
          />
        </FormLayout>
      )}
    </>
  );
}

export default OrdinarySignUp;
