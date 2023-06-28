import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { color } from "../../../styles";
import { COMPANY, DRIVER, NORMAL, SIGNUP_NAV } from "../../../constant";
import AuthLayout from "../../../component/layout/AuthLayout";
import RegularText from "../../../component/text/RegularText";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import MediumText from "../../../component/text/MediumText";
import TextInput from "../../../component/input/TextInput";
import { Image, TouchableOpacity, View } from "react-native";
import { shadowProps } from "../../../component/Shadow";

const Container = styled.View`
    margin-top: 25px;
`;
const Wrapper = styled.View`
    margin-bottom: 20px;
`;
const CheckBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;
const Info = styled.View`
    flex-direction: row;
    align-items: flex-start;
`;

const SelectPopup = styled.View`
    width: 100%;
    position: absolute;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    top: 80px;
    z-index: 100;
    padding: 15px 18px;
    border-radius: 12px;
    background-color: white;
`;

const SelectPopupText = styled.View`
    width: 55%;
    justify-content: space-between;
    flex-direction: row;
`;
const PopupButton = styled.TouchableOpacity`
    width: 60px;
    height: 40px;
    border: 1px solid ${color["input-focus-border"]};
    border-radius: 8px;
    align-items: center;
    justify-content: center;
`;

function RecomendedMember() {
    const navigation = useNavigation();
    const { info, setInfo } = useContext(UserContext);
    const [test, setTest] = useState("");
    const [show, setShow] = useState(false);

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
        const curNavIndex =
            SIGNUP_NAV[info.userType].indexOf("RecomendedMember");
        navigation.navigate(SIGNUP_NAV[info.userType][curNavIndex + 1]);
    };

    const reset = () => {
        setTest("");
    };

    return (
        <AuthLayout
            bottomButtonProps={{
                title: "회원가입 완료",
                onPress: onNext,
                disabled: true,
            }}
        >
            <Container>
                <Wrapper>
                    <TextInput
                        title="추천인 연락처"
                        placeholder="추천할 회원님의 연락처를 입력하세요."
                        returnKeyType="next"
                        // onSubmitEditing={() => onNext(passwordRef)}
                        onChangeText={(text) =>
                            // setValue("phone", text)
                            setTest(text)
                        }
                        onReset={reset}
                        value={test}
                    />
                    <RegularText
                        style={{
                            fontSize: 16,
                            color: color["page-grey-text"],
                            marginTop: 8,
                        }}
                    >
                        - 제외하고 번호만 입력하세요
                    </RegularText>
                </Wrapper>
                {show ? (
                    <SelectPopup style={shadowProps}>
                        <SelectPopupText>
                            <MediumText
                                style={{ color: color["page-black-text"] }}
                            >
                                01012345678
                            </MediumText>
                            <MediumText
                                style={{ color: color["page-black-text"] }}
                            >
                                홍길동
                            </MediumText>
                        </SelectPopupText>
                        <PopupButton>
                            <MediumText
                                style={{
                                    color: color["page-color-text"],
                                    fontSize: 14,
                                }}
                            >
                                선택
                            </MediumText>
                        </PopupButton>
                    </SelectPopup>
                ) : null}

                <Wrapper>
                    <CheckBox>
                        <Image
                            style={{ width: 23, height: 23 }}
                            source={require("../../../assets/images/icons/Check_OFF.png")}
                        />
                        <RegularText
                            style={{
                                color: color["page-black-text"],
                                marginLeft: 5,
                            }}
                        >
                            추천할 회원이 없어요.
                        </RegularText>
                    </CheckBox>
                </Wrapper>
                <Wrapper>
                    <Info>
                        <Image
                            style={{ width: 18, height: 18 }}
                            source={require("../../../assets/images/icons/icon_info2.png")}
                        />
                        <RegularText
                            style={{
                                fontSize: 16,
                                marginLeft: 5,
                                color: color["page-color-text"],
                            }}
                        >
                            추천할 회원이 없으면 자동으로 알테구의 계정이{"\n"}
                            추천인으로 등록됩니다.
                        </RegularText>
                    </Info>
                </Wrapper>
            </Container>
        </AuthLayout>
    );
}

export default RecomendedMember;
