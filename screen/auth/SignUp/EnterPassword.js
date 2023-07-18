import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { color } from "../../../styles";
import { NORMAL, SIGNUP_NAV } from "../../../constant";
import AuthLayout from "../../../component/layout/AuthLayout";
import RegularText from "../../../component/text/RegularText";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import TextInput from "../../../component/input/TextInput";

const InputContainer = styled.View`
    margin-top: 30px;
    margin-bottom: 10px;
`;

const InputWrapper = styled.View`
    margin-bottom: 30px;
`;

function EnterPassword() {
    const navigation = useNavigation();
    const { info, setInfo } = useContext(UserContext);
    const [test, setTest] = useState("");

    console.log(info);
    const onNext = () => {
        // if (type === "") {
        //     Toast.show({
        //         type: "errorToast",
        //         props: "회원 유형을 선택해 주세요.",
        //     });
        //     return;
        // }
        // const data = {
        //     userType: type,
        // };
        // setInfo(data);
        // navigation.navigate("SignUpStep1");
        const curNavIndex = SIGNUP_NAV[info.userType].indexOf("EnterPassword");
        navigation.navigate(SIGNUP_NAV[info.userType][curNavIndex + 1]);
    };

    return (
        <AuthLayout
            bottomButtonProps={{
                title: info.userType === NORMAL ? "회원가입 완료" : "다음으로",
                onPress: onNext,
                disabled: true,
            }}
        >
            <InputContainer>
                <InputWrapper>
                    <TextInput
                        type="password"
                        title="비밀번호 입력"
                        placeholder="비밀번호 (8자리 이상)"
                        returnKeyType="next"
                        // onSubmitEditing={() => onNext(passwordRef)}
                        onChangeText={(text) =>
                            // setValue("phone", text)
                            setTest(text)
                        }
                        value={test}
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
                        type="password"
                        title="비밀번호 확인"
                        placeholder="비밀번호 (8자리 이상)"
                        returnKeyType="next"
                        // onSubmitEditing={() => onNext(passwordRef)}
                        onChangeText={(text) =>
                            // setValue("phone", text)
                            setTest(text)
                        }
                        value={test}
                    />
                </InputWrapper>
            </InputContainer>
        </AuthLayout>
    );
}

export default EnterPassword;
