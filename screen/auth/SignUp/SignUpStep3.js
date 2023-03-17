import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import DefaultLayout from "../../../component/layout/DefaultLayout";
import TitleText from "../../../component/text/TitleText";
import SubmitButton from "../../../component/button/SubmitButton";
import Checkbox from "expo-checkbox";
import PlainText from "../../../component/text/PlainText";
import { theme } from "../../../styles";
import * as Location from "expo-location";
import LoadingLayout from "../../../component/layout/LoadingLayout";
import { COMPANY, ORDINARY, PERSON, SPECIAL, VALID } from "../../../constant";
import axios from "axios";
import { SERVER } from "../../../server";
import { setAsyncStorageToken, showError } from "../../../utils";
import LoginContext from "../../../context/LoginContext";

const termsTexts = [
    "만 14세 이상입니다.",
    "서비스 이용약관",
    "개인정보 수집 및 이용 동의",
    "위치 서비스 이용 동의",
    "이벤트 및 할인 혜택 안내 동의",
];

const Container = styled.View`
    flex: 1;
`;
const Title = styled.View`
    margin-bottom: 15px;
`;

const Wrapper = styled.View`
    padding: 10px 10px 0px 10px;
`;

const Terms = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const TermsButton = styled.TouchableOpacity``;

const ButtonContainer = styled.View``;

function SignUpStep3() {
    const [checkArr, setCheckArr] = useState([
        false,
        false,
        false,
        false,
        false,
    ]);
    const [isAllChecked, setAllChecked] = useState(false);
    const [blockAllChecked, setBlockAllChecked] = useState(false);
    const [isAgree, setIsAgree] = useState(true);
    const [loading, setLoading] = useState(false);
    const { info, setInfo } = useContext(UserContext);
    const navigation = useNavigation();
    const { setIsLoggedIn, setFirstLogin } = useContext(LoginContext);

    console.log("step3 info : ", info);

    const clickAllCheckButton = (value) => {
        if (value) {
            setAllChecked(true);
            setIsAgree(false);
            const newCheckArr = [true, true, true, true, true];

            setCheckArr(newCheckArr);
            setBlockAllChecked(false);
        } else {
            setAllChecked(false);
            setIsAgree(true);

            if (!blockAllChecked) {
                const newCheckArr = [false, false, false, false, false];

                setCheckArr(newCheckArr);
            } else {
                setBlockAllChecked(false);
            }
        }
    };

    const clickCheckButton = (value, index) => {
        const newCheckArr = [...checkArr];

        newCheckArr[index] = value;

        setCheckArr(newCheckArr);

        const uncheckedArr = newCheckArr.filter((value) => value === false);

        if (uncheckedArr.length < 1) {
            setAllChecked(true);
            setIsAgree(false);
        } else {
            setBlockAllChecked(true);
            setAllChecked(false);

            if (
                uncheckedArr.length === 1 &&
                !newCheckArr[newCheckArr.length - 1]
            ) {
                setIsAgree(false);
            } else {
                setIsAgree(true);
            }
        }
    };

    const getUserCode = () => {
        if (info.userType === ORDINARY) return "P";
        else if (info.userDetailType === PERSON) return "S";
        else {
            switch (info.workCategory) {
                case 1:
                    return "C";
                case 2:
                    return "F";
                case 3:
                    return "E";
                case 4:
                    return "H";
                case 5:
                    return "M";
                case 6:
                    return "G";
                default:
                    break;
            }
        }
    };

    const getUserType = (code) => {
        switch (code) {
            case "C":
                return 1;
            case "F":
                return 2;
            case "E":
                return 3;
            case "H":
                return 4;
            case "M":
                return 5;
            case "G":
                return 6;
            case "P":
                return 7;
            case "S":
                return 8;
            default:
                break;
        }
    };

    const ValidateVehicleList = () => {
        return info.vehicle[0].type === -1 ||
            info.vehicle[0].weight === -1 ||
            info.vehicle[0].number
            ? true
            : false;
    };

    const uploadLicense = (fileName) => {
        const localUri = fileName;
        const filename = localUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename ?? "");
        const type = match ? `image/${match[1]}` : `image`;
        const formData = new FormData();
        console.log(filename, type);
        formData.append("file", { uri: localUri, name: filename, type });

        axios
            .post(
                SERVER + "/users/license",
                {
                    formData,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    transformRequest: [
                        function () {
                            return formData;
                        },
                    ],
                }
            )
            .then(({ data }) => {
                const {
                    data: { location },
                    result,
                } = data;
                if (result === VALID) {
                    if (
                        info.vehiclePermission &&
                        info.vehiclePermission !== ""
                    ) {
                        uploadVehiclePermission(
                            info.vehiclePermission,
                            location
                        );
                    } else {
                        createAccount(location);
                    }
                }
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {});
    };

    const uploadVehiclePermission = (fileName, licenseLocation) => {
        const localUri = fileName;
        const filename = localUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename ?? "");
        const type = match ? `image/${match[1]}` : `image`;
        const formData = new FormData();
        console.log(filename, type);
        formData.append("file", { uri: localUri, name: filename, type });

        axios
            .post(
                SERVER + "/users/permission",
                {
                    formData,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    transformRequest: [
                        function () {
                            return formData;
                        },
                    ],
                }
            )
            .then(({ data }) => {
                const {
                    data: { location },
                    result,
                } = data;
                if (result === VALID) {
                    createAccount(licenseLocation, location);
                }
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {});
    };

    let accessedRegion = "조회 실패";

    const createAccount = async (licenseLocation, permissionLocation) => {
        const {
            coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({
            accuracy: 5,
        });

        try {
            //TODO: 연동 부분 이렇게 바꾸기
            const response = await axios.get(
                `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
                {
                    headers: {
                        Authorization:
                            "KakaoAK 86e0df46fbae745bb4c658276b280088",
                    },
                }
            );

            console.log(response.data);
            const {
                data: {
                    documents,
                    meta: { total_count },
                },
            } = response;

            if (total_count > 0)
                accessedRegion = `${documents[0].road_address.region_1depth_name}>${documents[0].road_address.region_2depth_name}`;
        } catch (error) {
            console.log(error);
        }

        const userCode = getUserCode();
        const userType = getUserType(userCode);

        //공통
        let sendingData = {
            userCode: userCode,
            userType: userType,
            userName: info.userName,
            name: info.name,
            password: info.password,
            phone: info.phone,
            birth: info.birth,
            gender: info.gender,
            status: "정상",
            accessedRegion,
            sms: checkArr[4],
            grade: 1,
        };

        if (info.userType === SPECIAL) {
            //기사회원, 기업회원 공통
            sendingData = {
                license: licenseLocation || null,
                workRegion: info.workRegion,
                vehiclePermission: permissionLocation || null,
                vehicle:
                    info.userDetailType === COMPANY && ValidateVehicleList()
                        ? null
                        : info.vehicle,
                recommendUserId: info.recommendUserId,
                ...sendingData,
            };

            if (info.userDetailType === COMPANY) {
                sendingData = {
                    workCategory: info.workCategory,
                    ...sendingData,
                };
            }
        }

        console.log("sendingData : ", sendingData);
        axios
            .post(SERVER + "/users/create", {
                ...sendingData,
            })
            .then(({ data }) => {
                console.log(data);
                const {
                    result,
                    data: { user },
                } = data;

                if (result === VALID) {
                    signIn(info.phone, info.password);
                    setInfo({ ...sendingData });
                    // navigation.navigate("SignUpStep4");
                }
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const signIn = (phone, password) => {
        axios
            .post(SERVER + "/users/login", {
                phone,
                password,
            })
            .then(async ({ data }) => {
                const {
                    result,
                    data: { token, user },
                    msg,
                } = data;

                if (result === VALID) {
                    setFirstLogin(true);
                    setInfo(user);
                    await setAsyncStorageToken(token);
                    setIsLoggedIn(true);
                }
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {});
    };

    const onNextStep = async () => {
        setLoading(true);

        if (info.userType !== ORDINARY) uploadLicense(info.license);
        else createAccount();
    };

    const ShowDetailTerms = (index) => {
        navigation.navigate("DetailTerms", {
            index,
            title: termsTexts[index],
        });
    };
    return (
        <>
            {loading ? (
                <LoadingLayout />
            ) : (
                <DefaultLayout>
                    <Container>
                        <Title>
                            <TitleText>약관동의</TitleText>
                        </Title>
                        <Wrapper>
                            <Terms>
                                <PlainText style={{ fontSize: 22 }}>
                                    전체 동의합니다.
                                </PlainText>
                                <Checkbox
                                    style={{ width: 30, height: 30 }}
                                    value={isAllChecked}
                                    onValueChange={clickAllCheckButton}
                                    color={
                                        isAllChecked
                                            ? theme.btnPointColor
                                            : undefined
                                    }
                                />
                            </Terms>
                            {termsTexts.map((text, index) => (
                                <Terms key={index}>
                                    <TermsButton
                                        disabled={
                                            index === 0 || index === 4
                                                ? true
                                                : false
                                        }
                                        onPress={() => ShowDetailTerms(index)}
                                    >
                                        <PlainText
                                            style={{
                                                fontSIze: 20,
                                                textDecorationLine:
                                                    index === 0 || index === 4
                                                        ? "none"
                                                        : "underline",
                                                color: theme.darkFontColor,
                                            }}
                                        >
                                            {text}
                                            {index < 4 ? " (필수)" : ""}
                                        </PlainText>
                                    </TermsButton>
                                    <Checkbox
                                        style={{ width: 30, height: 30 }}
                                        value={checkArr[index]}
                                        onValueChange={(value) => {
                                            clickCheckButton(value, index);
                                        }}
                                        color={
                                            checkArr[index]
                                                ? theme.btnPointColor
                                                : undefined
                                        }
                                    />
                                </Terms>
                            ))}
                        </Wrapper>
                        <PlainText
                            style={{
                                fontSize: 18,
                                color: theme.darkFontColor,
                                bottom: 10,
                                position: "absolute",
                            }}
                        >
                            각 항목 클릭 시 상세 내용을 보실 수 있습니다.
                        </PlainText>
                    </Container>
                    <ButtonContainer>
                        <SubmitButton
                            text="동의하기"
                            onPress={onNextStep}
                            disabled={isAgree}
                        />
                    </ButtonContainer>
                </DefaultLayout>
            )}
        </>
    );
}

export default SignUpStep3;
