import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import DefaultLayout from "../../component/layout/DefaultLayout";
import TitleInputItem from "../../component/item/TitleInputItem";
import TextInput from "../../component/input/TextInput";
import MediumText from "../../component/text/MediumText";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { checkPassword, showError } from "../../utils";
import axios from "axios";
import { VALID } from "../../constant";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { SERVER } from "../../constant";
import Button from "../../component/button/Button";
import AuthLayout from "../../component/layout/AuthLayout";
import SelectBox from "../../component/selectBox/SelectBox";
import { useWindowDimensions } from "react-native";
import RegularText from "../../component/text/RegularText";
import { color } from "../../styles";

const Container = styled.View`
    padding-top: 30px;
`;

const InputContainer = styled.View`
    margin-bottom: 10px;
`;

const InputWrapper = styled.View`
    margin-bottom: 30px;
`;

const RowInputWrapper = styled(InputWrapper)`
    flex-direction: row;
    justify-content: space-between;
`;
function SetPassword() {
    const { register, handleSubmit, setValue, watch } = useForm();
    const [phone, setPhone] = useState("01090665452"); //TODO: test code
    const password1Ref = useRef();
    const password2Ref = useRef();
    const navigation = useNavigation();
    const { height: windowHeight } = useWindowDimensions();
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        register("phone", {
            required: true,
        });
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

    const onValid = ({ newPassword, newPasswordCheck }) => {
        console.log(newPassword, newPasswordCheck);

        if (newPassword === newPasswordCheck) {
            if (checkPassword(newPassword)) {
                axios
                    .post(SERVER + "/users/password", {
                        phone,
                        password: newPassword,
                    })
                    .then(({ data }) => {
                        const { result, msg } = data;

                        if (result === VALID) {
                            Toast.show({
                                type: "errorToast",
                                props: "비밀번호가 변경 되었습니다.",
                            });
                            navigation.navigate("SignIn", {
                                reset: true,
                            });
                        }
                    })
                    .catch((error) => {
                        showError(error);
                    })
                    .finally(() => {});
            } else {
                Toast.show({
                    type: "errorToast",
                    props: "비밀번호가 조건에 맞지 않습니다.",
                });
            }
        } else {
            Toast.show({
                type: "errorToast",
                props: "비밀번호가 일치하지 않습니다.",
            });
        }
    };

    return (
        <AuthLayout>
            <Container>
                {!auth ? (
                    <>
                        <InputContainer>
                            <InputWrapper>
                                <TextInput
                                    title="이름"
                                    placeholder="실명입력"
                                    returnKeyType="next"
                                    // onSubmitEditing={() => onNext(passwordRef)}
                                    // onChangeText={(text) => setValue("phone", text)}
                                    // onReset={reset}
                                    // value={getValues("phone")}
                                />
                            </InputWrapper>
                            <RowInputWrapper>
                                <SelectBox
                                    title="통신사"
                                    data={["SKT", "KT", "LG"]}
                                    width="25%"
                                    placeholder="선택"
                                    // onSelect={(index) => setSelected(index)}
                                />
                                <TextInput
                                    title="휴대폰 번호"
                                    placeholder="- 없이 숫자만 입력해주세요."
                                    returnKeyType="next"
                                    width="68%"
                                    // onSubmitEditing={() => onNext(passwordRef)}
                                    // onChangeText={(text) => setValue("phone", text)}
                                    // onReset={reset}
                                    // value={getValues("phone")}
                                />
                            </RowInputWrapper>
                            {/* <TextInput
                            returnKeyType="next"
                            onSubmitEditing={() => onNext(password1Ref)}
                            secureTextEntry={true}
                            onChangeText={(text) => setValue("phone", text)}
                            placeholder="휴대폰번호"
                        /> */}
                            {/* <TextInput
                            ref={password1Ref}
                            returnKeyType="next"
                            onSubmitEditing={() => onNext(password2Ref)}
                            secureTextEntry={true}
                            onChangeText={(text) =>
                                setValue("newPassword", text)
                            }
                            placeholder="새 비밀번호"
                        /> */}
                            {/* <TextInput
                            ref={password2Ref}
                            returnKeyType="done"
                            secureTextEntry={true}
                            onChangeText={(text) =>
                                setValue("newPasswordCheck", text)
                            }
                            placeholder="새 비밀번호 확인"
                        /> */}
                        </InputContainer>
                        <Button
                            onPress={() => setAuth(true)}
                            type="accent"
                            text="본인 인증하기"
                            disabled={false}
                        />
                    </>
                ) : (
                    <>
                        <InputContainer>
                            <InputWrapper>
                                <TextInput
                                    type="password"
                                    title="비밀번호 입력"
                                    placeholder="비밀번호 (8자리 이상)"
                                    returnKeyType="next"
                                    // onSubmitEditing={() => onNext(passwordRef)}
                                    // onChangeText={(text) =>
                                    //     // setValue("phone", text)
                                    //     setTest(text)
                                    // }
                                    // value={test}
                                />
                                <RegularText
                                    style={{
                                        fontSize: 16,
                                        color: color["page-grey-text"],
                                        marginTop: 8,
                                    }}
                                >
                                    영문, 숫자를 포함한 8자 이상의 문자를
                                    입력하세요.
                                </RegularText>
                            </InputWrapper>
                            <InputWrapper>
                                <TextInput
                                    type="password"
                                    title="비밀번호 확인"
                                    placeholder="비밀번호 (8자리 이상)"
                                    returnKeyType="next"
                                    // onSubmitEditing={() => onNext(passwordRef)}
                                    // onChangeText={(text) =>
                                    //     // setValue("phone", text)
                                    //     setTest(text)
                                    // }
                                    // value={test}
                                />
                            </InputWrapper>
                        </InputContainer>
                        <Button
                            onPress={() => setAuth(false)}
                            type="accent"
                            text="비밀번호 재설정"
                            disabled={false}
                        />
                    </>
                )}
            </Container>
            {/* <Button
                text="본인인증 후 재설정"
                type="accent"
                onPress={handleSubmit(onValid)}
                disabled={
                    !(
                        watch("newPassword") &&
                        watch("newPasswordCheck") &&
                        watch("phone")
                    )
                }
            /> */}
        </AuthLayout>
    );
}

SetPassword.propTypes = {};
export default SetPassword;
