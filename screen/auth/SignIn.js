import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import FormLayout from "../../component/layout/FormLayout";
import TitleText from "../../component/text/TitleText";
import SubTitleText from "../../component/text/SubTitleText";

import TitleInputItem from "../../component/item/TitleInputItem";

import MediumText from "../../component/text/MediumText";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import axios from "axios";
import { VALID } from "../../constant";
import UserContext from "../../context/UserContext";
import LoginContext from "../../context/LoginContext";
import { SERVER } from "../../constant";
import { setAsyncStorageToken, showError } from "../../utils";
import { color } from "../../styles";
import Button from "../../component/button/Button";
import AuthLayout from "../../component/layout/AuthLayout";
import TextInput from "../../component/input/TextInput";
import RegularText from "../../component/text/RegularText";

const InputContainer = styled.View`
    /* margin-top: 30px; */
    /* margin-bottom: 10px; */
`;
const InputWrapper = styled.View`
    margin-bottom: 30px;
`;

const FindPassword = styled.View`
    align-items: center;
`;
function SignIn() {
    const [textSecure, setTextSecure] = useState(true);
    const { register, handleSubmit, setValue, watch, getValues } = useForm();
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

    const reset = () => {
        setValue("phone", "");
    };

    return (
        <AuthLayout
            bottomButtonProps={{
                title: "로그인",
                // onPress: onNext,
                disabled: true,
            }}
        >
            <MediumText
                style={{
                    fontSize: 16,
                    textAlign: "center",
                    color: color["page-grey-text"],
                    marginTop: 15,
                    marginBottom: 25,
                }}
            >
                안녕하세요. 환영합니다.
            </MediumText>
            <InputContainer>
                <InputWrapper>
                    <TextInput
                        title="휴대폰 번호"
                        placeholder="- 제외하고 번호만 입력해주세요."
                        returnKeyType="next"
                        // onSubmitEditing={() => onNext(passwordRef)}
                        onChangeText={(text) => setValue("phone", text)}
                        onReset={reset}
                        // value={getValues("phone")}
                    />
                </InputWrapper>
                <InputWrapper>
                    <TextInput
                        type="password"
                        title="비밀번호"
                        placeholder="비밀번호 (8자리 이상)"
                        returnKeyType="next"
                        // onSubmitEditing={() => onNext(passwordRef)}
                        // onChangeText={(text) =>
                        // setValue("phone", text)
                        // setTest(text)
                        // }
                        // value={test}
                    />
                </InputWrapper>
            </InputContainer>
            <FindPassword>
                <TouchableOpacity onPress={ResetPassword}>
                    <RegularText
                        style={{
                            fontSize: 16,
                            color: color["page-color-text"],
                            textDecorationLine: "underline",
                        }}
                    >
                        비밀번호 찾기
                    </RegularText>
                </TouchableOpacity>
            </FindPassword>
            {/* <Title>
                    <TitleText>로그인</TitleText>
                    <SubTitleText
                        style={{ color: color.textDark, marginTop: 10 }}
                    >
                        안녕하세요. 환영합니다.
                    </SubTitleText>
                </Title>
                <Wrapper>
                    <View>
                        <TitleInputItem>
                            <TextInput
                                placeholder="휴대폰번호"
                                keyboardType="number-pad"
                                returnKeyType="next"
                                onSubmitEditing={() => onNext(passwordRef)}
                                onChangeText={(text) => setValue("phone", text)}
                            />
                        </TitleInputItem>
                        <TitleInputItem>
                            <Password>
                                <TextInput
                                    ref={passwordRef}
                                    placeholder="비밀번호"
                                    secureTextEntry={textSecure}
                                    returnKeyType="done"
                                    onChangeText={(text) =>
                                        setValue("password", text)
                                    }
                                    width="87%"
                                />
                                <TouchableOpacity onPress={ShowPassword}>
                                    <MediumText>보기</MediumText>
                                </TouchableOpacity>
                            </Password>
                        </TitleInputItem>
                    </View>
                    <Buttons>
                        <Button
                            text="로그인"
                            type="accent"
                            onPress={handleSubmit(onValid)}
                            disabled={!(watch("phone") && watch("password"))}
                        />
                        <TouchableOpacity>
                            <MediumText
                                style={{
                                    color: color.textDark,
                                    textAlign: "center",
                                    marginTop: 15,
                                }}
                                onPress={ResetPassword}
                            >
                                비밀번호 재설정
                            </MediumText>
                        </TouchableOpacity>
                    </Buttons>
                </Wrapper> */}
        </AuthLayout>
    );
}

export default SignIn;
