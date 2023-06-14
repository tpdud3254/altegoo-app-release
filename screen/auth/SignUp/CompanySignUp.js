import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
    ScrollView,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import { TextInput } from "../../../component/input/TextInput";
import TitleInputItem from "../../../component/item/TitleInputItem";
import FormLayout from "../../../component/layout/FormLayout";
import Rule from "../../../component/Rule";
import MediumText from "../../../component/text/MediumText";
import UserContext, { UserConsumer } from "../../../context/UserContext";
import { checkPassword, getAsyncStorageToken, onNext } from "../../../utils";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { SERVER, VALID } from "../../../constant";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { color } from "../../../styles";
import { Dialog, Portal, Provider } from "react-native-paper";
import Button, { BottomButton } from "../../../component/button/Button";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import SubTitleText from "../../../component/text/SubTitleText";
import HorizontalDivider from "../../../component/divider/HorizontalDivider";

const WorkTypeButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid ${(props) => props.color};
`;

const SelectWorkType = styled.View`
    background-color: ${color.btnDefaultColor + "77"};
    margin-top: 5px;
`;

const SelectWorkTypeBtn = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px 0px 10px 0px;
`;

const Password = styled.View`
    flex-direction: row;
    align-items: center;
`;

const License = styled(Password)`
    justify-content: space-between;
    margin-right: 10px;
`;

const VehicleCotent = styled(License)``;

const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const Icon = styled.View`
    justify-content: center;
    align-items: center;
    margin-right: 10px;
`;

const Vehicle = styled.View``;

const VehicleContainer = styled.View`
    border: 1px solid ${color.lightGrey};
    margin: 10px 5px;
    padding: 10px 10px;
    border-radius: 5px;
`;

const VehicleWrapper = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: space-evenly;
`;

const VehicleType = styled.View`
    align-items: center;
    margin-bottom: 20px;
    margin-top: 15px;
`;
const VehicleWeight = styled.TouchableOpacity`
    background-color: ${(props) =>
        props.selected ? color.btnAccentColor : color.btnDefaultColor};
    width: 60px;
    height: 60px;
    align-items: center;
    border-radius: 30px;
    padding: 7px 0px;
    justify-content: center;
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
    margin-bottom: 5px;
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
const workCategoryArr = [
    "건설 계열",
    "가구 계열",
    "가전 계열",
    "청소 / 인력 계열",
    "이사 계열",
    "기타",
];

function CompanySignUp() {
    const navigation = useNavigation();
    const { info, setInfo } = useContext(UserContext);
    const { register, handleSubmit, setValue, getValues, watch } = useForm();

    const [textSecure, setTextSecure] = useState(true);
    const [isCheckedUser, setIsCheckedUser] = useState(false);
    const [isSavedLicense, setIsSavedLicense] = useState(false);
    const [isSavedVehiclePermission, setIsSavedVehiclePermission] =
        useState(false);
    const [recommendUserId, setRecommendUserId] = useState(0);
    const [showNameRule, setShowNameRule] = useState(false);
    const [showPasswordRule, setShowPasswordRule] = useState(false);
    const [showPhoneRule, setShowPhoneRule] = useState(false);
    const [showRecommendRule, setShowRecommendRule] = useState(false);
    const [vehicleList, setVehicleList] = useState([]);
    const [vehicleDialogVisible, setVehicleDialogVisible] = useState(false);
    const [vehicleType, setVehicleType] = useState(-1);
    const [vehicleWeight, setVehicleWeight] = useState(-1);
    const [workCategoryVisible, setWorkCategoryVisible] = useState(false);
    const [workCategory, setWorkCategory] = useState(-1);

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

    useEffect(() => {
        closeWorkTypeMenu();
    }, [workCategory]);

    const showVehicleDialog = () => {
        setVehicleDialogVisible(true);
    };

    const hideVehicleDialog = () => {
        setValue("vehicleNum", "");
        setVehicleType(-1);
        setVehicleWeight(-1);
        setVehicleDialogVisible(false);
    };

    const openWorkTypeMenu = () => setWorkCategoryVisible(true);

    const closeWorkTypeMenu = () => setWorkCategoryVisible(false);

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

    const addVehicleList = (obj) => {
        setVehicleList((prev) => [...prev, obj]);
    };

    const deleteVehicleList = (index) => {
        const newList = vehicleList;

        newList.splice(index, 1);

        setVehicleList([...newList]);
    };

    const SaveVehicleInfo = () => {
        const vehicleNum = getValues("vehicleNum");

        if (!vehicleNum || vehicleNum.length < 1) {
            //TODO: 토스트 디자인 변경
            Toast.show({
                type: "errorToast",
                props: "차량 번호를 입력해주세요.",
            });
            return;
        }

        if (vehicleType === -1 || vehicleWeight === -1) {
            Toast.show({
                type: "errorToast",
                props: "차량 정보를 선택해주세요.",
            });
            return;
        }

        const newObj = {
            number: vehicleNum,
            type: vehicleType,
            weight: vehicleWeight + 1,
        };

        addVehicleList(newObj);
        hideVehicleDialog();
    };

    const getPhoneAuth = (phone) => {
        /* TODO: 본인인증 */

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
                const { result } = data;

                if (result === VALID) {
                    Toast.show({
                        type: "errorToast",
                        props: "이미 존재하는 사용자입니다.",
                    });
                } else {
                    console.log("사용자 검증 완료");
                    navigation.navigate("SignUpStep2");
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    const onValid = (data) => {
        if (workCategory < 0) {
            Toast.show({
                type: "errorToast",
                props: "사업 종류를 선택해주세요.",
            });

            setWorkCategoryVisible(true);
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

        if (data.phone.length < 1) {
            Toast.show({
                type: "errorToast",
                props: "휴대폰번호를 입력해주세요.",
            });

            return;
        }

        if (!info.licenseUrl || info.licenseUrl === "") {
            Toast.show({
                type: "errorToast",
                props: "사업자 등록증을 등록해주세요.",
            });

            return;
        }

        if (isCheckedUser) {
            if (recommendUserId === 0) {
                Toast.show({
                    type: "errorToast",
                    props: "올바른 추천 회원을 입력해주세요.",
                });

                return;
            }
        }

        if (vehicleList.length > 0) {
            if (
                !info.vehiclePermissionUrl ||
                info.vehiclePermissionUrl === ""
            ) {
                Toast.show({
                    type: "errorToast",
                    props: "화물자동차 운송사업 허가증을 등록해주세요.",
                });

                return;
            }
        }

        onNextStep(data);
    };

    const onNextStep = (data) => {
        const { name, password, phone } = data;

        const authData = {
            //TODO:: test code
            userName: "아무개",
            gender: "남",
            birth: "950124",
        };

        const sendingData = {
            name,
            password,
            phone,
            license: info.licenseUrl,
            vehicle: vehicleList,
            vehiclePermission: info.vehiclePermissionUrl || null,
            recommendUserId: recommendUserId === 0 ? null : recommendUserId,
            workCategory: workCategory + 1,
            ...authData,
        };

        setInfo({ ...info, ...sendingData });
        getPhoneAuth(phone);
    };

    const VehicleDialog = () => (
        <Portal>
            <Dialog
                visible={vehicleDialogVisible}
                onDismiss={hideVehicleDialog}
                style={{ backgroundColor: "white" }}
            >
                <Dialog.Title>차량등록하기</Dialog.Title>
                <Dialog.Content style={{ marginTop: 30, marginBottom: 30 }}>
                    <TitleInputItem>
                        <TextInput
                            onChangeText={(text) =>
                                setValue("vehicleNum", text)
                            }
                            placeholder="차량번호 (000가 0000)"
                            returnKeyType="done"
                            defaultValue={getValues("vehicleNum")}
                        />
                    </TitleInputItem>
                    <VehicleType>
                        <RadioButton.Group
                            onValueChange={(newValue) =>
                                setVehicleType(newValue)
                            }
                            value={vehicleType}
                        >
                            <RadioContainer>
                                <Radio>
                                    <RadioButton value={1} color={color.main} />
                                    <MediumText>사다리</MediumText>
                                </Radio>
                                <Radio>
                                    <RadioButton value={2} color={color.main} />
                                    <MediumText>스카이</MediumText>
                                </Radio>
                            </RadioContainer>
                        </RadioButton.Group>
                    </VehicleType>

                    <VehicleWrapper>
                        {vehicleWeightArr.map((value, weightIndex) => (
                            <VehicleWeight
                                key={weightIndex}
                                onPress={() => {
                                    setVehicleWeight(weightIndex);
                                }}
                                selected={vehicleWeight === weightIndex}
                            >
                                <MediumText
                                    style={{
                                        color:
                                            vehicleWeight === weightIndex
                                                ? "white"
                                                : "black",
                                        fontWeight: "400",
                                    }}
                                >
                                    {value}
                                </MediumText>
                            </VehicleWeight>
                        ))}
                    </VehicleWrapper>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        onPress={SaveVehicleInfo}
                        text="저장"
                        type="accent"
                    ></Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );

    return (
        <Provider>
            <FormLayout>
                <ScrollView>
                    <TouchableWithoutFeedback>
                        <>
                            <VehicleDialog />
                            <View style={{ marginBottom: 10 }}>
                                <WorkTypeButton
                                    onPress={
                                        workCategoryVisible
                                            ? closeWorkTypeMenu
                                            : openWorkTypeMenu
                                    }
                                    color={
                                        workCategory > -1
                                            ? color.main
                                            : color.lightGrey
                                    }
                                >
                                    <Ionicons
                                        name={"checkmark-circle"}
                                        size={30}
                                        color={"rgba(1,1,1,0.0)"}
                                    />
                                    <SubTitleText style={{ fontSize: 18 }}>
                                        {workCategory < 0
                                            ? "사업 종류 선택"
                                            : `사업 종류 : ${workCategoryArr[workCategory]}`}
                                    </SubTitleText>
                                    <Ionicons
                                        name={"checkmark-circle"}
                                        size={30}
                                        color={
                                            workCategory > -1
                                                ? color.main
                                                : color.lightGrey
                                        }
                                    />
                                </WorkTypeButton>
                                {workCategoryVisible ? (
                                    <SelectWorkType>
                                        {workCategoryArr.map((value, index) => (
                                            <View
                                                key={index}
                                                style={{ alignItems: "center" }}
                                            >
                                                <SelectWorkTypeBtn
                                                    onPress={() =>
                                                        setWorkCategory(index)
                                                    }
                                                    style={{ width: "100%" }}
                                                >
                                                    <MediumText>
                                                        {value}
                                                        {index === 0
                                                            ? " (철거, 인테리어, 샷시 등)"
                                                            : null}
                                                    </MediumText>
                                                </SelectWorkTypeBtn>
                                                {index ===
                                                workCategoryArr.length -
                                                    1 ? null : (
                                                    <HorizontalDivider
                                                        color="#dddddd"
                                                        width="98%"
                                                    />
                                                )}
                                            </View>
                                        ))}
                                    </SelectWorkType>
                                ) : null}
                                <TitleInputItem>
                                    <TextInput
                                        placeholder="이름/상호명"
                                        returnKeyType="next"
                                        onSubmitEditing={() =>
                                            onNext(passwordRef)
                                        }
                                        onChangeText={(text) =>
                                            setValue("name", text)
                                        }
                                        onFocus={() => setShowNameRule(true)}
                                        onBlur={() => setShowNameRule(false)}
                                    />
                                </TitleInputItem>
                                {showNameRule ? (
                                    <Rule text="2자리 이상 입력해 주세요" />
                                ) : null}
                                <TitleInputItem>
                                    <Password>
                                        <TextInput
                                            ref={passwordRef}
                                            placeholder="비밀번호"
                                            secureTextEntry={textSecure}
                                            returnKeyType="next"
                                            onChangeText={(text) =>
                                                setValue("password", text)
                                            }
                                            onSubmitEditing={() =>
                                                onNext(phoneRef)
                                            }
                                            width="87%"
                                            onFocus={() =>
                                                setShowPasswordRule(true)
                                            }
                                            onBlur={() =>
                                                setShowPasswordRule(false)
                                            }
                                        />
                                        <TouchableOpacity
                                            onPress={() =>
                                                setTextSecure((prev) => !prev)
                                            }
                                        >
                                            <MediumText>보기</MediumText>
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
                                        onChangeText={(text) =>
                                            setValue("phone", text)
                                        }
                                        placeholder="휴대폰번호"
                                        keyboardType="number-pad"
                                        returnKeyType="next"
                                        onSubmitEditing={() => onNext(phoneRef)}
                                        onFocus={() => setShowPhoneRule(true)}
                                        onBlur={() => setShowPhoneRule(false)}
                                    />
                                </TitleInputItem>
                                {showPhoneRule ? (
                                    <Rule text="숫자만 입력해 주세요" />
                                ) : null}
                                <Pressable>
                                    <TitleInputItem>
                                        <License>
                                            <MediumText
                                                style={{
                                                    fontSize: 20,
                                                    padding: 10,
                                                    color: isSavedLicense
                                                        ? "black"
                                                        : "#999999",
                                                    width: "80%",
                                                }}
                                                numberOfLines={1}
                                            >
                                                <UserConsumer>
                                                    {(data) => {
                                                        if (
                                                            data?.info
                                                                ?.licenseUrl
                                                        ) {
                                                            const uri =
                                                                data.info
                                                                    .licenseUrl;

                                                            const uriArr =
                                                                uri.split("/");

                                                            setIsSavedLicense(
                                                                true
                                                            );
                                                            return uriArr[
                                                                uriArr.length -
                                                                    1
                                                            ];
                                                        }
                                                        setIsSavedLicense(
                                                            false
                                                        );
                                                        return "사업자 등록증";
                                                    }}
                                                </UserConsumer>
                                            </MediumText>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    takePicture("license")
                                                }
                                            >
                                                {isSavedLicense ? (
                                                    <Ionicons
                                                        name={
                                                            "checkmark-circle"
                                                        }
                                                        size={40}
                                                        color={"#33aa11"}
                                                    />
                                                ) : (
                                                    <MediumText>
                                                        등록하기
                                                    </MediumText>
                                                )}
                                            </TouchableOpacity>
                                        </License>
                                    </TitleInputItem>
                                    <TitleInputItem>
                                        <Row>
                                            <TextInput
                                                ref={recommendUserRef}
                                                placeholder="추천인 입력 (선택사항)"
                                                returnKeyType="done"
                                                onChangeText={(text) => {
                                                    setValue(
                                                        "recommendUserPhone",
                                                        text
                                                    );
                                                    text.length > 10
                                                        ? checkRecommnedUser(
                                                              text
                                                          )
                                                        : null;
                                                    text.length === 0
                                                        ? setIsCheckedUser(
                                                              false
                                                          )
                                                        : null;
                                                }}
                                                width="80%"
                                                keyboardType="number-pad"
                                                onFocus={() =>
                                                    setShowRecommendRule(true)
                                                }
                                                onBlur={() =>
                                                    setShowRecommendRule(false)
                                                }
                                            />
                                            <Icon>
                                                {isCheckedUser ? (
                                                    recommendUserId !== 0 ? (
                                                        <Ionicons
                                                            name={
                                                                "checkmark-circle"
                                                            }
                                                            size={40}
                                                            color={"#33aa11"}
                                                        />
                                                    ) : (
                                                        <Ionicons
                                                            name={
                                                                "close-circle"
                                                            }
                                                            size={40}
                                                            color={"#cc2222"}
                                                        />
                                                    )
                                                ) : (
                                                    <Ionicons
                                                        name={
                                                            "checkmark-circle"
                                                        }
                                                        size={40}
                                                        color={"#33aa1155"}
                                                    />
                                                )}
                                            </Icon>
                                        </Row>
                                    </TitleInputItem>
                                </Pressable>
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
                                <Pressable>
                                    <Vehicle>
                                        <VehicleContainer>
                                            {vehicleList.length === 0 ? (
                                                <>
                                                    <MediumText
                                                        style={{
                                                            textAlign: "center",
                                                            fontSize: 22,
                                                            marginBottom: 10,
                                                        }}
                                                    >
                                                        등록된 차량이 없습니다.
                                                    </MediumText>
                                                    <MediumText
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        차량추가 버튼을 눌러
                                                        등록해주세요.
                                                    </MediumText>
                                                    <MediumText
                                                        style={{
                                                            textAlign: "center",
                                                            marginBottom: 10,
                                                            color: color.darkGrey,
                                                        }}
                                                    >
                                                        (선택사항)
                                                    </MediumText>
                                                </>
                                            ) : (
                                                <>
                                                    <MediumText
                                                        style={{
                                                            textAlign: "center",
                                                            fontWeight: "400",
                                                        }}
                                                    >
                                                        등록 차량 목록
                                                    </MediumText>
                                                    {vehicleList.map(
                                                        (value, index) => (
                                                            <TitleInputItem
                                                                key={index}
                                                            >
                                                                <VehicleCotent>
                                                                    <MediumText
                                                                        style={{
                                                                            fontSize: 20,
                                                                            padding: 10,
                                                                        }}
                                                                        numberOfLines={
                                                                            1
                                                                        }
                                                                    >
                                                                        {
                                                                            value.number
                                                                        }{" "}
                                                                        /{" "}
                                                                        {value.type ===
                                                                        1
                                                                            ? "사다리"
                                                                            : "스카이"}{" "}
                                                                        /{" "}
                                                                        {
                                                                            vehicleWeightArr[
                                                                                value.weight -
                                                                                    1
                                                                            ]
                                                                        }
                                                                    </MediumText>
                                                                    <TouchableOpacity
                                                                        onPress={() =>
                                                                            deleteVehicleList(
                                                                                index
                                                                            )
                                                                        }
                                                                    >
                                                                        <MaterialIcons
                                                                            name="cancel"
                                                                            size={
                                                                                35
                                                                            }
                                                                            color="black"
                                                                        />
                                                                    </TouchableOpacity>
                                                                </VehicleCotent>
                                                            </TitleInputItem>
                                                        )
                                                    )}
                                                </>
                                            )}
                                            <AddButtonContainer>
                                                <AddButton
                                                    onPress={showVehicleDialog}
                                                >
                                                    <Ionicons
                                                        name="add"
                                                        size={35}
                                                        color={color.main}
                                                    />
                                                    <MediumText>
                                                        차량추가
                                                    </MediumText>
                                                </AddButton>
                                            </AddButtonContainer>
                                        </VehicleContainer>
                                    </Vehicle>
                                    {vehicleList.length === 0 ? null : (
                                        <TitleInputItem>
                                            <License>
                                                <MediumText
                                                    style={{
                                                        fontSize: 20,
                                                        padding: 10,
                                                        color: isSavedVehiclePermission
                                                            ? "black"
                                                            : "#999999",
                                                        width: "80%",
                                                    }}
                                                    numberOfLines={1}
                                                >
                                                    <UserConsumer>
                                                        {(data) => {
                                                            if (
                                                                data?.info
                                                                    ?.vehiclePermissionUrl
                                                            ) {
                                                                const uri =
                                                                    data.info
                                                                        .vehiclePermissionUrl;

                                                                const uriArr =
                                                                    uri.split(
                                                                        "/"
                                                                    );

                                                                setIsSavedVehiclePermission(
                                                                    true
                                                                );
                                                                return uriArr[
                                                                    uriArr.length -
                                                                        1
                                                                ];
                                                            }
                                                            setIsSavedVehiclePermission(
                                                                false
                                                            );
                                                            return "화물자동차 운송사업 허가증";
                                                        }}
                                                    </UserConsumer>
                                                </MediumText>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        takePicture("vehicle")
                                                    }
                                                >
                                                    {isSavedVehiclePermission ? (
                                                        <Ionicons
                                                            name={
                                                                "checkmark-circle"
                                                            }
                                                            size={40}
                                                            color={"#33aa11"}
                                                        />
                                                    ) : (
                                                        <MediumText>
                                                            등록하기
                                                        </MediumText>
                                                    )}
                                                </TouchableOpacity>
                                            </License>
                                        </TitleInputItem>
                                    )}
                                </Pressable>
                            </View>
                        </>
                    </TouchableWithoutFeedback>
                </ScrollView>
                <BottomButton>
                    <Button
                        text="다음으로"
                        onPress={handleSubmit(onValid)}
                        type="accent"
                        style={{ marginBottom: 10 }}
                        disabled={
                            !(
                                watch("name") &&
                                watch("password") &&
                                watch("phone")
                            )
                        }
                    />
                </BottomButton>
            </FormLayout>
        </Provider>
    );
}

export default CompanySignUp;
