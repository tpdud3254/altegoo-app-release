import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import DefaultLayout from "../../../component/layout/DefaultLayout";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import FormLayout from "../../../component/layout/FormLayout";
import TitleText from "../../../component/text/TitleText";
import ColumnInputItem from "../../../component/item/ColumnInputItem";
import { theme } from "../../../styles";
import SubTitleText from "../../../component/text/SubTitleText";
import VerticalDivider from "../../../component/divider/VerticalDivider";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { COMPANY, PERSON } from "../../../constant";
import PlainText from "../../../component/text/PlainText";
import { TextInput } from "../../../component/input/TextInput";
import PlainButton from "../../../component/button/PlainButton";
import SubmitButton from "../../../component/button/SubmitButton";

const Container = styled.View`
    flex: 1;
`;

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

const License = styled.View`
    border: 1px solid ${theme.textBoxColor};
    justify-content: center;
    align-items: center;
    height: 52px;
`;

const LicenseText = styled.Text`
    width: 95%;
    font-size: 18px;
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

function SpecialSignUp({ route }) {
    const [detailType, setDetailType] = useState("");
    const [textSecure, setTextSecure] = useState(true);
    const { register, handleSubmit, setValue, getValues, watch } = useForm();
    const [checked, setChecked] = useState(false);
    const [checkUser, setCheckUser] = useState(false); //유저 유효성검사
    const [recommendUserId, setRecommendUserId] = useState(null);
    const { setInfo } = useContext(UserContext);
    const navigation = useNavigation();

    const onPress = (data) => {
        // setInfo({ userType: data });
        // navigation.navigate("SpecialSignUp");
    };

    const SelectDetailType = (type) => {
        setDetailType(type);
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
                        <ColumnInputItem title="이름/상호명">
                            <TextInput
                                placeholder="이름 (2자리 이상)"
                                returnKeyType="next"
                                // onSubmitEditing={() => onNext(passwordRef)}
                                // onChangeText={(text) => setValue("name", text)}
                            />
                        </ColumnInputItem>
                        <ColumnInputItem title="비밀번호">
                            <Password>
                                <TextInput
                                    // ref={passwordRef}
                                    placeholder="비밀번호 (8자리 이상)"
                                    // secureTextEntry={textSecure}
                                    returnKeyType="next"
                                    // onSubmitEditing={() => onNext(phoneRef)}
                                    // onChangeText={(text) => setValue("password", text)}
                                    width="87%"
                                />
                                <TouchableOpacity
                                // onPress={showPassword}
                                >
                                    <PlainText>보기</PlainText>
                                </TouchableOpacity>
                            </Password>
                        </ColumnInputItem>
                        <PlainText style={{ fontSize: 20, marginTop: -5 }}>
                            * 영문, 숫자를 포함한 8자 이상의 문자열
                        </PlainText>
                        <ColumnInputItem title="휴대폰번호">
                            {/* TODO: 휴대폰 API 리턴값 따라 달라질 수 있음 */}
                            <TextInput
                                // ref={phoneRef}
                                // onChangeText={(text) => setValue("phone", text)}
                                placeholder="숫자만 적어주세요"
                                keyboardType="number-pad"
                                returnKeyType="done"
                            />
                        </ColumnInputItem>
                        <PlainButton
                            text="본인인증하기"
                            // onPress={getPhoneAuth}
                        />
                        {/* TODO: 본인인증 완료 텍스트 추가 */}
                        <LicenseContainer>
                            <ColumnInputItem title="사업자 등록증" width="75%">
                                {/* TODO: 휴대폰 API 리턴값 따라 달라질 수 있음 */}
                                <PlainText
                                    style={{
                                        fontSize: 20,
                                        padding: 10,
                                    }}
                                    numberOfLines={1}
                                >
                                    사진을 등록해주세요.
                                    {/* <SignUpConsumer>
                                            {(data) => {
                                                if (data?.info?.licenseUrl) {
                                                    const uri =
                                                        data.info.licenseUrl;

                                                    const uriArr =
                                                        uri.split("/");

                                                    return uriArr[
                                                        uriArr.length - 1
                                                    ];
                                                }
                                                return "사진을 등록해주세요.";
                                            }}
                                        </SignUpConsumer> */}
                                </PlainText>
                            </ColumnInputItem>
                            <PlainButton
                                text="촬영"
                                // onPress={ takePicture}
                                style={{ width: "23%", marginBottom: 7 }}
                            />
                        </LicenseContainer>
                        <ColumnInputItem title="차량번호">
                            <TextInput
                                placeholder="123가 4567"
                                returnKeyType="next"
                                // onSubmitEditing={() => onNext(passwordRef)}
                                // onChangeText={(text) => setValue("name", text)}
                            />
                        </ColumnInputItem>
                        {detailType === PERSON ? (
                            <Ionicons name={"shield"} size={40} color={"red"} />
                        ) : null}
                        <ColumnInputItem title="추천회원님 정보">
                            <RowContainer>
                                <TextInput
                                    // ref={recommendUserPhoneRef}
                                    placeholder="휴대폰 번호"
                                    returnKeyType="next"
                                    width="80%"
                                    // onChangeText={(text) => {
                                    //     setValue("recommendUserPhone", text);
                                    //     checkRecommnedUser(text);
                                    // }}
                                    // onSubmitEditing={() =>
                                    //     onNext(vehicleNumberRef)
                                    // }
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
                        </ColumnInputItem>
                        <SubmitButton
                            text="다음으로"
                            // disabled={!(watch("name") && watch("password") && watch("phone"))}
                            // onPress={handleSubmit(onValid)}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </FormLayout>
    );
}

export default SpecialSignUp;
