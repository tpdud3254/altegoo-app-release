import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import DefaultLayout from "../../component/layout/DefaultLayout";
import TitleInputItem from "../../component/item/TitleInputItem";
import { TextInput } from "../../component/input/TextInput";
import PlainText from "../../component/text/PlainText";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { checkPassword, showError } from "../../utils";
import axios from "axios";
import { VALID } from "../../constant";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { SERVER } from "../../constant";
import Button from "../../component/button/Button";

const Container = styled.View`
    flex: 1;
    justify-content: space-between;
`;

const Wrapper = styled.View`
    margin-top: 15px;
`;
function SetPassword() {
    const { register, handleSubmit, setValue, watch } = useForm();
    const [phone, setPhone] = useState("01090665452"); //TODO: test code
    const password1Ref = useRef();
    const password2Ref = useRef();
    const navigation = useNavigation();

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
        <DefaultLayout>
            <Container>
                <Wrapper>
                    <TitleInputItem>
                        <TextInput
                            returnKeyType="next"
                            onSubmitEditing={() => onNext(password1Ref)}
                            secureTextEntry={true}
                            onChangeText={(text) => setValue("phone", text)}
                            placeholder="휴대폰번호"
                        />
                    </TitleInputItem>
                    <TitleInputItem>
                        <TextInput
                            ref={password1Ref}
                            returnKeyType="next"
                            onSubmitEditing={() => onNext(password2Ref)}
                            secureTextEntry={true}
                            onChangeText={(text) =>
                                setValue("newPassword", text)
                            }
                            placeholder="새 비밀번호"
                        />
                    </TitleInputItem>
                    <TitleInputItem>
                        <TextInput
                            ref={password2Ref}
                            returnKeyType="done"
                            secureTextEntry={true}
                            onChangeText={(text) =>
                                setValue("newPasswordCheck", text)
                            }
                            placeholder="새 비밀번호 확인"
                        />
                    </TitleInputItem>
                    <PlainText style={{ fontSize: 18 }}>
                        * 영문, 숫자를 포함한 8자 이상의 문자열
                    </PlainText>
                </Wrapper>
            </Container>
            <Button
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
            />
        </DefaultLayout>
    );
}

SetPassword.propTypes = {};
export default SetPassword;
