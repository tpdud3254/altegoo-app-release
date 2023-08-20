import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useForm } from "react-hook-form";
import {
    CheckValidation,
    checkPassword,
    showErrorMessage,
} from "../../../utils";
import Layout from "../../../component/layout/Layout";
import TextInput from "../../../component/input/TextInput";
import RegularText from "../../../component/text/RegularText";
import { color } from "../../../styles";
import Button from "../../../component/button/Button";

const InputContainer = styled.View`
    margin-top: 30px;
`;

const InputWrapper = styled.View`
    margin-bottom: 30px;
`;

function ChangePassword() {
    const { info, setInfo } = useContext(UserContext);
    const { register, setValue, watch, getValues, handleSubmit } = useForm();

    const [validation, setValidation] = useState(false);

    const verifyPasswordRef = useRef();

    useEffect(() => {
        console.log(info);
        register("password");
        register("verifyPassword");
    }, []);

    useEffect(() => {
        if (CheckValidation(getValues())) {
            setValidation(true);
        } else {
            setValidation(false);
        }
    }, [getValues()]);

    const onNext = (data) => {
        const { password, verifyPassword } = data;

        if (password !== verifyPassword) {
            showErrorMessage("입력하신 비밀번호가 일치하지 않습니다.");
            return;
        }

        if (!checkPassword(password)) {
            showErrorMessage("비밀번호가 조건에 맞지 않습니다.");
            return;
        }
    };

    return (
        <Layout scroll={false}>
            <InputContainer>
                <InputWrapper>
                    <TextInput
                        type="password"
                        title="현재 비밀번호"
                        placeholder="비밀번호 (8자리 이상)"
                        returnKeyType="next"
                        value={watch("password")}
                        onChangeText={(text) => setValue("password", text)}
                        onReset={() => setValue("password", "")}
                        onSubmitEditing={() =>
                            verifyPasswordRef.current.setFocus()
                        }
                    />
                </InputWrapper>
                <InputWrapper>
                    <TextInput
                        type="password"
                        title="새 비밀번호"
                        placeholder="비밀번호 (8자리 이상)"
                        returnKeyType="next"
                        value={watch("password")}
                        onChangeText={(text) => setValue("password", text)}
                        onReset={() => setValue("password", "")}
                        onSubmitEditing={() =>
                            verifyPasswordRef.current.setFocus()
                        }
                    />
                    <RegularText
                        style={{
                            fontSize: 16,
                            color: color["page-grey-text"],
                            marginTop: 8,
                        }}
                    >
                        영문, 숫자를 포함한 8자 이상의 문자를 입력하세요.
                    </RegularText>
                </InputWrapper>
                <InputWrapper>
                    <TextInput
                        ref={verifyPasswordRef}
                        type="password"
                        title="새 비밀번호 확인"
                        placeholder="비밀번호 (8자리 이상)"
                        returnKeyType="done"
                        value={watch("verifyPassword")}
                        onChangeText={(text) =>
                            setValue("verifyPassword", text)
                        }
                        onReset={() => setValue("verifyPassword", "")}
                    />
                </InputWrapper>
            </InputContainer>
            <Button
                onPress={() => console.log("asdf")}
                type="accent"
                text="비밀번호 변경"
            />
        </Layout>
    );
}

export default ChangePassword;
