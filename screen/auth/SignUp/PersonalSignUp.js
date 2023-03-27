import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styled from "styled-components/native";
import PlainButton from "../../../component/button/PlainButton";
import { TextInput } from "../../../component/input/TextInput";
import TitleInputItem from "../../../component/item/TitleInputItem";
import FormLayout from "../../../component/layout/FormLayout";
import Rule from "../../../component/Rule";
import PlainText from "../../../component/text/PlainText";
import UserContext, { UserConsumer } from "../../../context/UserContext";
import {
  getAsyncStorageToken,
  onNext,
  SERVER,
  showError,
} from "../../../utils";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { VALID } from "../../../constant";

const Password = styled.View`
  flex-direction: row;
  align-items: center;
`;

const License = styled(Password)`
  justify-content: space-between;
`;

const LicenseContainer = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
`;

const LicenseWrapper = styled.View`
  flex: 1;
  margin-right: 10px;
`;

const LicenseExample = styled.View`
  align-items: center;
  background-color: #dddddd;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Icon = styled.View`
  justify-content: center;
  align-items: center;
`;

function PersonalSignUp() {
  const { info, setInfo } = useContext(UserContext);
  const { register, handleSubmit, setValue, getValues, watch } = useForm();

  const [textSecure, setTextSecure] = useState(true);
  const [isCheckedUser, setIsCheckedUser] = useState(false);
  const [isSavedLicense, setIsSavedLicense] = useState(false);
  const [recommendUserId, setRecommendUserId] = useState(0);
  const [showNameRule, setShowNameRule] = useState(false);
  const [showPasswordRule, setShowPasswordRule] = useState(false);
  const [showPhoneRule, setShowPhoneRule] = useState(false);
  const [showRecommendRule, setShowRecommendRule] = useState(false);

  const passwordRef = useRef();
  const phoneRef = useRef();
  const recommendUserRef = useRef();

  useEffect(() => {
    register("name", {
      required: true,
    });
    register("password", {
      required: true,
    });
    register("phone", {
      required: true,
    });
    register("recommendUserPhone");
    register("vehicleNum");
  }, [register]);

  const checkRecommnedUser = async (phone) => {
    axios
      .get(SERVER + "/users/search", {
        params: {
          phone,
        },
        headers: {
          token: getAsyncStorageToken(),
        },
      })
      .then(({ data }) => {
        const { result, userId } = data;

        if (result === VALID) {
          setRecommendUserId(userId);
        } else {
          setRecommendUserId(0);
        }
      })
      .catch((error) => {
        console.log(error);
        setRecommendUserId(0);
      })
      .finally(() => {
        setIsCheckedUser(true);
      });
  };

  return (
    <FormLayout>
      <ScrollView>
        <TouchableWithoutFeedback>
          <View style={{ marginBottom: 10 }}>
            <TitleInputItem>
              <TextInput
                placeholder="이름/상호명"
                returnKeyType="next"
                onSubmitEditing={() => onNext(passwordRef)}
                onChangeText={(text) => setValue("name", text)}
                onFocus={() => setShowNameRule(true)}
                onBlur={() => setShowNameRule(false)}
              />
            </TitleInputItem>
            {showNameRule ? <Rule text="2자리 이상 입력해 주세요" /> : null}
            <TitleInputItem>
              <Password>
                <TextInput
                  ref={passwordRef}
                  placeholder="비밀번호"
                  secureTextEntry={textSecure}
                  returnKeyType="next"
                  onChangeText={(text) => setValue("password", text)}
                  onSubmitEditing={() => onNext(phoneRef)}
                  width="87%"
                  onFocus={() => setShowPasswordRule(true)}
                  onBlur={() => setShowPasswordRule(false)}
                />
                <TouchableOpacity
                  onPress={() => setTextSecure((prev) => !prev)}
                >
                  <PlainText>보기</PlainText>
                </TouchableOpacity>
              </Password>
            </TitleInputItem>
            {showPasswordRule ? (
              <Rule text="영문, 숫자 포함 8자리 이상 입력해주세요" />
            ) : null}
            <TitleInputItem>
              {/* TODO: 휴대폰 API 리턴값 따라 달라질 수 있음  */}
              <TextInput
                ref={phoneRef}
                onChangeText={(text) => setValue("phone", text)}
                placeholder="휴대폰번호"
                keyboardType="number-pad"
                returnKeyType="next"
                onSubmitEditing={() => onNext(phoneRef)}
                onFocus={() => setShowPhoneRule(true)}
                onBlur={() => setShowPhoneRule(false)}
              />
            </TitleInputItem>
            {showPhoneRule ? <Rule text="숫자만 입력해 주세요" /> : null}
            <TitleInputItem>
              <RowContainer>
                <TextInput
                  ref={recommendUserRef}
                  placeholder="추천인 입력"
                  returnKeyType="done"
                  onChangeText={(text) => {
                    setValue("recommendUserPhone", text);
                    text.length > 10 ? checkRecommnedUser(text) : null;
                  }}
                  width="80%"
                  keyboardType="number-pad"
                  onFocus={() => setShowRecommendRule(true)}
                  onBlur={() => setShowRecommendRule(false)}
                />
                <Icon>
                  {isCheckedUser ? (
                    recommendUserId !== 0 ? (
                      <Ionicons
                        name={"checkmark-circle"}
                        size={40}
                        color={"#33aa11"}
                      />
                    ) : (
                      <Ionicons
                        name={"close-circle"}
                        size={40}
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
            {showRecommendRule ? (
              <Rule
                text={
                  isCheckedUser
                    ? recommendUserId !== 0
                      ? "추천인 조회에 성공했습니다"
                      : "추천인 조회에 실패했습니다"
                    : "추천인 휴대폰번호를 입력해주세요"
                }
              />
            ) : null}
            <TitleInputItem>
              <License>
                <PlainText
                  style={{
                    fontSize: 20,
                    padding: 10,
                    color: "#999999",
                  }}
                  numberOfLines={1}
                >
                  <UserConsumer>
                    {(data) => {
                      if (data?.info?.licenseUrl) {
                        const uri = data.info.licenseUrl;

                        const uriArr = uri.split("/");

                        setIsSavedLicense(true);
                        return uriArr[uriArr.length - 1];
                      }
                      setIsSavedLicense(false);
                      return "사업자 등록증";
                    }}
                  </UserConsumer>
                </PlainText>
                <TouchableOpacity
                // onPress={() => takePicture("license")}
                >
                  {isSavedLicense ? (
                    <Ionicons
                      name={"checkmark-circle"}
                      size={40}
                      color={"#33aa1155"}
                    />
                  ) : (
                    <PlainText style={{ marginRight: 10 }}>등록하기</PlainText>
                  )}
                </TouchableOpacity>
              </License>
            </TitleInputItem>
            <LicenseContainer>
              <LicenseWrapper>
                <TitleInputItem>
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
                          const uri = data.info.licenseUrl;

                          const uriArr = uri.split("/");

                          return uriArr[uriArr.length - 1];
                        }
                        return "사업자 등록증을 등록해주세요.";
                      }}
                    </UserConsumer>
                  </PlainText>
                </TitleInputItem>
                <PlainButton
                  text="촬영"
                  // onPress={() => takePicture("license")}
                />
              </LicenseWrapper>
              <LicenseExample>
                <Image
                  style={{
                    resizeMode: "contain",
                    width: 120,
                    height: 130,
                    borderColor: "#dddddd",
                    borderWidth: 1,
                  }}
                  source={require(`../../../assets/images/license.png`)}
                />
                <PlainText style={{ fontSize: 15 }}>예시</PlainText>
              </LicenseExample>
            </LicenseContainer>
          </View>
          {/* TODO: 본인인증 */}
        </TouchableWithoutFeedback>
      </ScrollView>
    </FormLayout>
  );
}

export default PersonalSignUp;
