import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { SIGNUP_NAV } from "../../../constant";
import AuthLayout from "../../../component/layout/AuthLayout";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import TextInput from "../../../component/input/TextInput";
import Button from "../../../component/button/Button";

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
    const [test, setTest] = useState("");

    const Authenticating = () => {
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
        const curNavIndex = SIGNUP_NAV[info.userType].indexOf("Identification");
        navigation.navigate(SIGNUP_NAV[info.userType][curNavIndex + 1]);
    };

    const reset = () => {
        setTest("");
    };

    console.log("test : ", test);

    return (
        <AuthLayout>
            <InputContainer>
                <InputWrapper>
                    <TextInput
                        title="이름"
                        placeholder="실명입력"
                        returnKeyType="next"
                        // onSubmitEditing={() => onNext(passwordRef)}
                        onChangeText={(text) =>
                            // setValue("phone", text)
                            setTest(text)
                        }
                        onReset={reset}
                        value={test}
                    />
                </InputWrapper>
                <InputWrapper>
                    <TextInput
                        title="휴대폰 번호"
                        placeholder="- 없이 숫자만 입력해주세요."
                    />
                </InputWrapper>
            </InputContainer>
            <Button
                onPress={Authenticating}
                type="accent"
                text="본인 인증하기"
                disabled={false}
            />
        </AuthLayout>
    );
}

export default Identification;
