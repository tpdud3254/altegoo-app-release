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
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import BorderBox from "../../../component/box/BorderBox";
import { color } from "../../../styles";
import { theme } from "../../../styles";
import { Dialog, Portal, Provider } from "react-native-paper";
import Button from "../../../component/button/Button";

const Password = styled.View`
  flex-direction: row;
  align-items: center;
`;

const License = styled(Password)`
  justify-content: space-between;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Icon = styled.View`
  justify-content: center;
  align-items: center;
`;

const Vehicle = styled.View`
  /* margin-top: 10px; */
`;

const VehicleContainer = styled.View`
  border: 1px solid ${color.lightGrey};
  margin: 10px 5px;
  padding: 5px 10px;
  border-radius: 5px;
  flex: 1;
`;

const VehicleWrapper = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: ${(props) => (props.center ? "center" : "space-evenly")};
  flex: 1;
  /* padding: 3px 0px; */
`;

const VehicleType = styled.View`
  /* margin-bottom: -10px; */
`;
const VehicleWeight = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.selected ? color.btnAccentColor : color.btnDefaultColor};
  width: 80px;
  align-items: center;
  border-radius: 5px;
  padding: 7px 0px;
`;

const RadioContainer = styled.View`
  flex-direction: row;
  width: 250px;
  justify-content: space-around;
`;
const Radio = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AddButtonContainer = styled.View`
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const AddButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border: 2px solid ${color.btnDisableColor};
  border-radius: 50px;
  padding: 7px 13px 7px 10px;
  justify-content: space-between;
`;

const vehicleWeightArr = ["1t", "2.5t", "3.5t", "5t"];

function PersonalSignUp() {
  const navigation = useNavigation();
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
  const [vehicleList, setVehicleList] = useState([]);
  const [vehicleDialogVisible, setVehicleDialogVisible] = useState(false);
  const [vehicleIndex, setVehicleIndex] = useState(0);

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

  const showVehicleDialog = (index) => {
    setVehicleIndex(index);
    setVehicleDialogVisible(true);
  };

  const hideVehicleDialog = () => {
    setVehicleIndex(-1);
    setVehicleDialogVisible(false);
  };

  const addVehicleList = () => {
    const obj = { type: -1, weight: -1, number: "" };

    setVehicleList((prev) => [...prev, obj]);
  };

  const deleteVehicleList = (index) => {
    const newList = vehicleList;

    newList.splice(index, 1);

    setVehicleList([...newList]);
  };

  const setVehicleType = (value, index) => {
    const newList = vehicleList;

    newList[index].type = value;

    setVehicleList([...newList]);
  };

  const setVehicleWeight = (value, index) => {
    const newList = vehicleList;

    newList[index].weight = value;

    setVehicleList([...newList]);
  };

  const setVehicleNumber = (value, index) => {
    const newList = vehicleList;

    newList[index].number = value;

    setVehicleList([...newList]);
  };

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

  const takePicture = (type) => {
    navigation.navigate("TakePhoto", { type });
  };

  const VehicleDialog = () => (
    <Portal>
      <Dialog
        visible={vehicleDialogVisible}
        onDismiss={hideVehicleDialog}
        style={{ backgroundColor: "white" }}
      >
        <Dialog.Title>차량등록하기</Dialog.Title>
        <Dialog.Content>
          {/* <TitleInputItem>
        
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
          <VehicleWrapper>
            <VehicleType>
              <RadioButton.Group
                onValueChange={(newValue) =>
                  setVehicleType(newValue, vehicleIndex)
                }
                value={vehicleList[vehicleIndex].type}
              >
                <RadioContainer>
                  <Radio>
                    <RadioButton value={1} color={color.main} />
                    <PlainText>사다리</PlainText>
                  </Radio>
                  <Radio>
                    <RadioButton value={2} color={color.main} />
                    <PlainText>스카이</PlainText>
                  </Radio>
                </RadioContainer>
              </RadioButton.Group>
            </VehicleType>
          </VehicleWrapper>
          <VehicleWrapper>
            {vehicleWeightArr.map((value, weightIndex) => (
              <VehicleWeight
                key={weightIndex}
                onPress={() => {
                //   setVehicleWeight(weightIndex, vehicleIndex);
                }}
                // selected={vehicleList[vehicleIndex].weight === weightIndex}
              >
                <PlainText>{value}</PlainText>
              </VehicleWeight>
            ))}
          </VehicleWrapper>
          <VehicleWrapper center={true}>
            <PlainText
              style={{
                marginRight: 10,
              }}
            >
              차량번호
            </PlainText>
            <BorderBox>
              <TextInput
                placeholder="123아 0124"
                onChangeText={(text) => {
                  setVehicleNumber(text, vehicleIndex);
                }}
                width="255px"
              />
            </BorderBox>
          </VehicleWrapper> */}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideVehicleDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );

  return (
    <FormLayout>
      <ScrollView>
        <TouchableWithoutFeedback>
          <Provider>
            <VehicleDialog />
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
                <License>
                  <PlainText
                    style={{
                      fontSize: 20,
                      padding: 10,
                      color: isSavedLicense ? "black" : "#999999",
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
                  <TouchableOpacity onPress={() => takePicture("license")}>
                    {isSavedLicense ? (
                      <Ionicons
                        name={"checkmark-circle"}
                        size={40}
                        color={"#33aa11"}
                      />
                    ) : (
                      <PlainText style={{ marginRight: 10 }}>
                        등록하기
                      </PlainText>
                    )}
                  </TouchableOpacity>
                </License>
              </TitleInputItem>
              <TitleInputItem>
                <Row>
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
                </Row>
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
              <Vehicle>
                {vehicleList.length === 0 ? (
                  <VehicleContainer>
                    <PlainText style={{ textAlign: "center" }}>
                      등록된 차량이 없습니다.
                    </PlainText>
                    <PlainText style={{ textAlign: "center" }}>
                      차량추가 버튼을 눌러 등록해주세요.
                    </PlainText>
                    <AddButtonContainer>
                      <AddButton onPress={() => showVehicleDialog(index)}>
                        <Ionicons name="add" size={35} color={color.main} />
                        <PlainText>차량추가</PlainText>
                      </AddButton>
                    </AddButtonContainer>
                  </VehicleContainer>
                ) : (
                  vehicleList.map((value, index) => (
                    <VehicleContainer key={index}>
                      <TitleInputItem>
                        <TouchableOpacity
                          onPress={() => showVehicleDialog(index)}
                        >
                          <PlainText
                            style={{
                              fontSize: 20,
                              padding: 10,
                              color: isSavedLicense ? "black" : "#999999",
                            }}
                            numberOfLines={1}
                          >
                            차량번호
                          </PlainText>
                        </TouchableOpacity>
                      </TitleInputItem>
                      <VehicleWrapper></VehicleWrapper>
                      <VehicleWrapper>
                        <VehicleType>
                          <RadioButton.Group
                            onValueChange={(newValue) =>
                              setVehicleType(newValue, index)
                            }
                            value={vehicleList[index].type}
                          >
                            <RadioContainer>
                              <Radio>
                                <RadioButton value={1} color={color.main} />
                                <PlainText>사다리</PlainText>
                              </Radio>
                              <Radio>
                                <RadioButton value={2} color={color.main} />
                                <PlainText>스카이</PlainText>
                              </Radio>
                            </RadioContainer>
                          </RadioButton.Group>
                        </VehicleType>
                      </VehicleWrapper>
                      <VehicleWrapper>
                        {vehicleWeightArr.map((value, weightIndex) => (
                          <VehicleWeight
                            key={weightIndex}
                            onPress={() => {
                              setVehicleWeight(weightIndex, index);
                            }}
                            selected={vehicleList[index].weight === weightIndex}
                          >
                            <PlainText>{value}</PlainText>
                          </VehicleWeight>
                        ))}
                      </VehicleWrapper>

                      {index > 0 ? (
                        <VehicleWrapper>
                          <PlainButton
                            text="삭제"
                            onPress={() => deleteVehicleList(index)}
                            style={{
                              width: 70,
                              height: 40,
                            }}
                          />
                        </VehicleWrapper>
                      ) : null}
                    </VehicleContainer>
                  ))
                )}
              </Vehicle>

              <AddButtonContainer>
                <AddButton onPress={addVehicleList}>
                  <Ionicons name="add" size={35} color={color.main} />
                  <PlainText>차량추가</PlainText>
                </AddButton>
              </AddButtonContainer>
            </View>
          </Provider>
          {/* TODO: 본인인증 */}
        </TouchableWithoutFeedback>
      </ScrollView>
    </FormLayout>
  );
}

export default PersonalSignUp;
