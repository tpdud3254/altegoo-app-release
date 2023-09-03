import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import TextInput from "../../component/input/TextInput";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import {
    checkPassword,
    checkValidation,
    reset,
    showError,
    showErrorMessage,
    showMessage,
} from "../../utils";
import axios from "axios";
import { VALID } from "../../constant";
import { SERVER } from "../../constant";
import Button from "../../component/button/Button";
import AuthLayout from "../../component/layout/AuthLayout";
import SelectBox from "../../component/selectBox/SelectBox";
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

const carrierArr = ["SKT", "KT", "LG"];

function SetPassword() {
    const navigation = useNavigation();
    const { register, setValue, watch, getValues } = useForm();

    const [focus, setFocus] = useState("name");
    const [validation, setValidation] = useState(false);
    const [authCompleted, setAuthCompleted] = useState(false);

    useEffect(() => {
        register("name");
        register("phone");
        register("carrier");
        register("password");
        register("verifyPassword");
    }, [register]);

    useEffect(() => {
        if (!authCompleted) {
            setValidation(
                checkValidation({
                    name: watch("name"),
                    phone: watch("phone"),
                    carrier: watch("carrier"),
                })
            );
        } else {
            setValidation(
                checkValidation({
                    password: watch("password"),
                    verifyPassword: watch("verifyPassword"),
                })
            );
        }
    }, [watch()]);

    useEffect(() => {
        if (authCompleted) setFocus("password");
        else setFocus("name");
    }, [authCompleted]);

    const onNext = (value) => {
        setFocus(value);
    };

    const onAuthenticate = () => {
        const { name, phone, carrier } = getValues();

        //TODO: 휴대폰 본인인증 처리

        // setAuthCompleted(true);
        navigation.navigate("Certification");
    };

    const onChangePassword = async () => {
        const { phone, password, verifyPassword } = getValues();

        if (password !== verifyPassword) {
            showErrorMessage("입력하신 비밀번호가 일치하지 않습니다.");
            return;
        }

        if (!checkPassword(password)) {
            showErrorMessage("비밀번호가 조건에 맞지 않습니다.");
            return;
        }

        try {
            const response = await axios.post(SERVER + "/users/password", {
                phone,
                password,
            });

            const {
                data: { result },
            } = response;

            if (result === VALID) {
                showMessage("비밀번호가 변경 되었습니다.");
                goToSignIn();
            }
        } catch (error) {
            console.log(error);
            showError(error);
        }
    };

    const goToSignIn = () => {
        navigation.navigate("SignIn", {
            reset: true,
        });
    };

    return (
        <AuthLayout>
            <Container>
                {!authCompleted ? (
                    <>
                        <InputContainer>
                            <InputWrapper>
                                <TextInput
                                    title="이름"
                                    placeholder="실명입력"
                                    returnKeyType="next"
                                    value={watch("name")}
                                    onSubmitEditing={() => onNext("phone")}
                                    onReset={() => reset(setValue, "name")}
                                    onChangeText={(text) =>
                                        setValue("name", text)
                                    }
                                />
                            </InputWrapper>
                            <RowInputWrapper>
                                <SelectBox
                                    width="25%"
                                    title="통신사"
                                    data={carrierArr}
                                    placeholder="선택"
                                    onSelect={(index) =>
                                        setValue("carrier", carrierArr[index])
                                    }
                                />
                                <TextInput
                                    width="68%"
                                    title="휴대폰 번호"
                                    placeholder="- 없이 숫자만 입력해주세요."
                                    returnKeyType="done"
                                    keyboardType="number-pad"
                                    value={watch("phone")}
                                    onReset={() => reset(setValue, "phone")}
                                    onChangeText={(text) =>
                                        setValue("phone", text)
                                    }
                                />
                            </RowInputWrapper>
                        </InputContainer>
                        <Button
                            onPress={onAuthenticate}
                            type="accent"
                            text="본인 인증하기"
                            // disabled={!validation}
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
                                    value={watch("password")}
                                    onSubmitEditing={() =>
                                        onNext("verifyPassword")
                                    }
                                    onChangeText={(text) =>
                                        setValue("password", text)
                                    }
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
                                    returnKeyType="done"
                                    value={watch("verifyPassword")}
                                    onChangeText={(text) =>
                                        setValue("verifyPassword", text)
                                    }
                                    focus={focus === "verifyPassword"}
                                />
                            </InputWrapper>
                        </InputContainer>
                        <Button
                            onPress={onChangePassword}
                            type="accent"
                            text="비밀번호 재설정"
                            disabled={!validation}
                        />
                    </>
                )}
            </Container>
        </AuthLayout>
    );
}

SetPassword.propTypes = {};
export default SetPassword;
