import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import UserContext, { UserConsumer } from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import {
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import FormLayout from "../../../component/layout/FormLayout";
import TitleText from "../../../component/text/TitleText";
import TitleInputItem from "../../../component/item/TitleInputItem";

import SubTitleText from "../../../component/text/SubTitleText";
import VerticalDivider from "../../../component/divider/VerticalDivider";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { COMPANY, PERSON } from "../../../constant";
import PlainText from "../../../component/text/PlainText";
import { TextInput } from "../../../component/input/TextInput";
import PlainButton from "../../../component/button/PlainButton";
import SubmitButton from "../../../component/button/SubmitButton";
import { theme } from "../../../styles";
import Toast from "react-native-toast-message";

const test1Arr = ["사다리", "스카이"]; //TODO: test code 변수명, value 변경
const test2Arr = ["1톤", "2톤", "3톤", "4톤"];

const ButtonContainer = styled.View`
    margin-bottom: 10px;
`;

const ButtonWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    height: 60px;
`;

const SelectButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 48%;
    height: 100%;
    background-color: ${(props) =>
        props.checked ? theme.btnPointColor + "66" : "white"};
`;

const Selected = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid ${(props) => props.color};
`;

const buttonProps = {
    fontSize: 22,
    color: "#555555",
};

const Password = styled.View`
    flex-direction: row;
    align-items: center;
`;

const LicenseContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
`;

const RowContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const Icon = styled.View`
    justify-content: center;
    align-items: center;
    width: 20%;
`;

const PickerContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
function SpecialSignUp({ route }) {
    const [detailType, setDetailType] = useState("");
    const [textSecure, setTextSecure] = useState(true);
    const { register, handleSubmit, setValue, getValues, watch } = useForm();
    const [checked, setChecked] = useState(false);
    const [checkUser, setCheckUser] = useState(false); //유저 유효성검사
    const [phoneAuth, setPhoneAuth] = useState(false);
    const [test1, setTest1] = useState(); //TODO: test code
    const [test2, setTest2] = useState(); //TODO: test code
    const [recommendUserId, setRecommendUserId] = useState(null);
    const { info, setInfo } = useContext(UserContext);
    const navigation = useNavigation();

    const passwordRef = useRef();
    const phoneRef = useRef();
    const pickerRef = useRef();

    useEffect(() => {
        console.log(info);

        register("name", {
            required: true,
        });
        register("password", {
            required: true,
        });
        register("phone", { required: true });
        register("vehicleNumber");
        register("recommendUserPhone");
    }, [register]);

    const SelectDetailType = (type) => {
        setDetailType(type);
    };

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };

    const showPassword = () => {
        setTextSecure((prev) => !prev);
    };

    const takePicture = () => {
        navigation.navigate("TakePhoto");
    };

    const getPhoneAuth = () => {
        console.log("본인인증");
        setPhoneAuth(true); //TODO:test code
    };
    const onNextStep = (data) => {
        const { name, password, vehicleNumber } = data;

        const newData = {
            name,
            password,
            vehicleNumber,
            recommendUserId,
            userDetailType: detailType,
        };
        setInfo({ ...newData, ...info });
        navigation.navigate("SignUpStep2");
    };
    const onValid = (data) => {
        if (detailType === "") {
            Toast.show({
                type: "errorToast",
                props: "사업 종류를 선택해주세요.",
            });
            return;
        }

        if (data.name.length < 2) {
            Toast.show({
                type: "errorToast",
                props: "이름을 2자리 이상 입력해주세요.",
            });
            return;
        }

        if (data.password.length < 8) {
            Toast.show({
                type: "errorToast",
                props: "비밀번호를 8자리 이상 입력해주세요.",
            });

            return;
        }

        if (!checkPassword(data.password)) {
            Toast.show({
                type: "errorToast",
                props: "비밀번호가 조건에 맞지 않습니다.",
            });

            return;
        }

        if (!phoneAuth) {
            //TODO:PHONE
            Toast.show({
                type: "errorToast",
                props: "본인 인증을 진행해주세요.",
            });
        }

        if (!info.licenseUrl || info.licenseUrl === "") {
            Toast.show({
                type: "errorToast",
                props: "사업자 등록증을 등록해주세요.",
            });

            return;
        }

        if (!data.vehicleNumber || data.vehicleNumber === "") {
            //TODO: 정책 결정 후 수정 -> 결정됨 수정하기
            Toast.show({
                type: "errorToast",
                props: "차량 번호를 등록해주세요.",
            });

            return;
        }

        //TODO: 가입된 회원인지 check

        onNextStep(data);
    };

    const checkRecommnedUser = async (phone) => {
        if (phone.length > 10) {
            console.log(phone);
            setChecked(true);

            // axios({
            //     url: SERVER + `/users/check?phone=${phone}`,
            //     method: "GET",
            //     header: {
            //         Accept: "application/json",
            //         "Content-Type": "application/json;charset=UTP-8",
            //     },
            //     withCredentials: true,
            // })
            //     .then(async ({ data }) => {
            //         const { result, userId } = data;

            //         if (result) {
            //             setRecommendUserId(userId);
            //         }

            //         setCheckUser(result);
            //     })
            //     .catch((e) => {
            //         console.error(e);
            //     })
            //     .then(() => {});
        }
    };

    return (
        <FormLayout>
            <TitleText>회원가입</TitleText>
            <ScrollView>
                <TouchableWithoutFeedback>
                    <View style={{ marginBottom: 20 }}>
                        <ButtonContainer>
                            <ButtonWrapper>
                                <SelectButton
                                    onPress={() => {
                                        SelectDetailType(PERSON);
                                    }}
                                    checked={
                                        detailType === PERSON ? true : false
                                    }
                                >
                                    <SubTitleText style={buttonProps}>
                                        기사회원
                                    </SubTitleText>
                                </SelectButton>
                                <VerticalDivider color="#cccccc" />
                                <SelectButton
                                    onPress={() => {
                                        SelectDetailType(COMPANY);
                                    }}
                                    checked={
                                        detailType === COMPANY ? true : false
                                    }
                                >
                                    <SubTitleText style={buttonProps}>
                                        기업회원
                                    </SubTitleText>
                                </SelectButton>
                            </ButtonWrapper>
                            <Selected
                                color={
                                    detailType !== ""
                                        ? theme.btnPointColor
                                        : theme.textBoxColor
                                }
                            >
                                <Ionicons
                                    name={"checkmark-circle"}
                                    size={30}
                                    color={"rgba(1,1,1,0.0)"}
                                />
                                <SubTitleText style={{ fontSize: 18 }}>
                                    사업 종류 선택
                                </SubTitleText>
                                <Ionicons
                                    name={"checkmark-circle"}
                                    size={30}
                                    color={
                                        detailType !== ""
                                            ? theme.btnPointColor
                                            : theme.textBoxColor
                                    }
                                />
                            </Selected>
                        </ButtonContainer>
                        <TitleInputItem title="이름/상호명">
                            <TextInput
                                placeholder="이름/상호명 (2자리 이상)"
                                returnKeyType="next"
                                onSubmitEditing={() => onNext(passwordRef)}
                                onChangeText={(text) => setValue("name", text)}
                            />
                        </TitleInputItem>
                        <TitleInputItem title="비밀번호">
                            <Password>
                                <TextInput
                                    ref={passwordRef}
                                    placeholder="비밀번호 (8자리 이상)"
                                    secureTextEntry={textSecure}
                                    returnKeyType="next"
                                    onSubmitEditing={() => onNext(phoneRef)}
                                    onChangeText={(text) =>
                                        setValue("password", text)
                                    }
                                    width="87%"
                                />
                                <TouchableOpacity onPress={showPassword}>
                                    <PlainText>보기</PlainText>
                                </TouchableOpacity>
                            </Password>
                        </TitleInputItem>
                        <PlainText
                            style={{
                                fontSize: 20,
                                marginTop: -8,
                                color: theme.darkFontColor,
                                marginBottom: 5,
                            }}
                        >
                            * 영문, 숫자를 포함한 8자 이상의 문자열
                        </PlainText>
                        <TitleInputItem title="휴대폰번호">
                            {/* TODO: 휴대폰 API 리턴값 따라 달라질 수 있음 */}
                            <TextInput
                                ref={phoneRef}
                                onChangeText={(text) => setValue("phone", text)}
                                placeholder="숫자만 적어주세요"
                                keyboardType="number-pad"
                                returnKeyType="done"
                            />
                        </TitleInputItem>
                        <PlainButton
                            text="본인인증하기"
                            onPress={getPhoneAuth}
                        />
                        {/* TODO: 본인인증 완료 텍스트 추가 */}
                        <LicenseContainer>
                            <TitleInputItem title="사업자 등록증" width="75%">
                                {/* TODO: 휴대폰 API 리턴값 따라 달라질 수 있음 */}
                                <PlainText
                                    style={{
                                        fontSize: 20,
                                        padding: 10,
                                    }}
                                    numberOfLines={1}
                                >
                                    <UserConsumer>
                                        {(data) => {
                                            if (data?.info?.licenseUrl) {
                                                const uri =
                                                    data.info.licenseUrl;

                                                const uriArr = uri.split("/");

                                                return uriArr[
                                                    uriArr.length - 1
                                                ];
                                            }
                                            return "사진을 등록해주세요.";
                                        }}
                                    </UserConsumer>
                                </PlainText>
                            </TitleInputItem>
                            <PlainButton
                                text="촬영"
                                onPress={takePicture}
                                style={{
                                    width: "23%",
                                    marginBottom: 7,
                                    height: 46,
                                }}
                            />
                        </LicenseContainer>
                        <TitleInputItem title="차량번호">
                            <TextInput
                                placeholder="작업 진행을 원하실 경우 기재해주세요."
                                returnKeyType="done"
                                onChangeText={(text) =>
                                    setValue("vehicleNumber", text)
                                }
                            />
                        </TitleInputItem>
                        {detailType === PERSON ? (
                            // TODO: 추후 수정 (필수입력도 수정)
                            <PickerContainer>
                                <Picker //TODO: Picker style
                                    ref={pickerRef}
                                    selectedValue={test1}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setTest1(itemValue)
                                    }
                                    style={{ width: "49%" }}
                                >
                                    {test1Arr.map((value, index) => (
                                        <Picker.Item
                                            key={index}
                                            label={value}
                                            value={value}
                                            style={{ fontSize: 20 }}
                                        />
                                    ))}
                                </Picker>
                                <Picker //TODO: Picker style
                                    ref={pickerRef}
                                    selectedValue={test2}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setTest2(itemValue)
                                    }
                                    style={{ width: "49%" }}
                                >
                                    {test2Arr.map((value, index) => (
                                        <Picker.Item
                                            key={index}
                                            label={value}
                                            value={value}
                                            style={{ fontSize: 20 }}
                                        />
                                    ))}
                                </Picker>
                            </PickerContainer>
                        ) : null}
                        <TitleInputItem title="추천회원님 정보">
                            <RowContainer>
                                <TextInput
                                    placeholder="휴대폰 번호"
                                    returnKeyType="next"
                                    width="80%"
                                    onChangeText={(text) => {
                                        setValue("recommendUserPhone", text);
                                        checkRecommnedUser(text);
                                    }}
                                    keyboardType="number-pad"
                                />
                                <Icon>
                                    {checked ? (
                                        checkUser ? (
                                            <Ionicons
                                                name={"checkmark-circle"}
                                                size={40}
                                                color={"#33aa11"}
                                            />
                                        ) : (
                                            <Ionicons
                                                name={"close-circle"}
                                                size={41}
                                                color={"#cc2222"}
                                            />
                                        )
                                    ) : (
                                        <Ionicons
                                            name={"checkmark-circle"}
                                            size={40}
                                            color={"#33aa1155"}
                                        />
                                    )}
                                </Icon>
                            </RowContainer>
                        </TitleInputItem>
                        <SubmitButton
                            text="다음으로"
                            disabled={
                                !(
                                    watch("name") &&
                                    watch("password") &&
                                    watch("phone")
                                )
                            }
                            onPress={handleSubmit(onValid)}
                            style={{ marginTop: 30 }}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </FormLayout>
    );
}

SpecialSignUp.propTypes = {
    file: PropTypes.string,
};

export default SpecialSignUp;
