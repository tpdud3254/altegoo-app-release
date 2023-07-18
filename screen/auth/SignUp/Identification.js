import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { SERVER, SIGNUP_NAV, VALID } from "../../../constant";
import AuthLayout from "../../../component/layout/AuthLayout";
import TextInput from "../../../component/input/TextInput";
import Button from "../../../component/button/Button";
import { useForm } from "react-hook-form";
import { CheckValidation, showError, showErrorMessage } from "../../../utils";
import axios from "axios";

const InputContainer = styled.View`
    margin-top: 30px;
    margin-bottom: 10px;
`;
const InputWrapper = styled.View`
    margin-bottom: 30px;
`;

function Identification() {
    const navigation = useNavigation();
    const { info, setInfo } = useContext(UserContext);
    const { register, setValue, watch, getValues, handleSubmit } = useForm();

    const [validation, setValidation] = useState(false);

    const phoneRef = useRef();

    useEffect(() => {
        console.log("info : ", info);
        register("name");
        register("phone");
    }, []);

    useEffect(() => {
        if (CheckValidation(getValues())) {
            setValidation(true);
        }
    }, [getValues()]);

    const Authenticating = async (data) => {
        console.log(data);

        const { name, phone } = data;

        try {
            const response = await axios.get(SERVER + "/users/search", {
                params: {
                    phone,
                },
            });

            const {
                data: { result },
            } = response;

            if (result === VALID) {
                showErrorMessage("이미 존재하는 사용자입니다.");
            } else {
                //TODO: 본인인증 진행 (각 필드 예외처리도 추가하기,)
                const data = {
                    name,
                    phone,
                    gender: "남", //TODO: 테스트 코드
                    birth: "580820", //TODO: 테스트 코드
                };
                //TODO: 본인인증 진행 후 실명으로 저장

                setInfo({ ...info, ...data });

                const curNavIndex =
                    SIGNUP_NAV[info.userType].indexOf("Identification");
                navigation.navigate(SIGNUP_NAV[info.userType][curNavIndex + 1]);
            }
        } catch (error) {
            console.log(error);
            showError(error);
        }
    };

    return (
        <AuthLayout>
            <InputContainer>
                <InputWrapper>
                    <TextInput
                        title="이름"
                        placeholder="실명입력"
                        value={watch("name")}
                        onChangeText={(text) => setValue("name", text)}
                        onReset={() => setValue("name", "")}
                        returnKeyType="next"
                        onSubmitEditing={() => phoneRef.current.setFocus()}
                    />
                </InputWrapper>
                <InputWrapper>
                    <TextInput
                        ref={phoneRef}
                        title="휴대폰 번호"
                        placeholder="- 없이 숫자만 입력해주세요."
                        keyboardType="number-pad"
                        value={watch("phone")}
                        onChangeText={(text) => setValue("phone", text)}
                        onReset={() => setValue("phone", "")}
                        returnKeyType="done"
                    />
                </InputWrapper>
            </InputContainer>
            <Button
                onPress={handleSubmit(Authenticating)}
                type="accent"
                text="본인 인증하기"
                disabled={!validation}
            />
        </AuthLayout>
    );
}

export default Identification;
