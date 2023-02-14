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
import Loading from "../../../component/Loading";

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

    console.log("step e info : ", info);

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

    const onNextStep = async () => {
        setLoading(true);

        // const {
        //     coords: { latitude, longitude },
        // } = await Location.getCurrentPositionAsync({
        //     accuracy: 5,
        // });

        // const location = await Location.reverseGeocodeAsync(
        //     { latitude, longitude },
        //     { useGoogleMaps: false }
        // );

        // const accessedRegion = `${
        //     location[0].city ? location[0].city : location[0].region
        // }>${
        //     location[0].subregion ? location[0].subregion : location[0].district
        // }`;

        // const workCategory = [1];
        // const sendingData = {
        //     workCategory,
        //     sms: checkArr[4],
        //     accessedRegion,
        // };

        // setInfo({ ...sendingData, ...info, license: info.licenseUrl });

        // axios({
        //     url: SERVER + `/users/sign-up`,
        //     method: "POST",
        //     header: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json;charset=UTP-8",
        //     },
        //     withCredentials: true,
        //     data: { license: info.licenseUrl, ...sendingData, ...info },
        // })
        //     .then(async ({ data }) => {
        //         const { result, userData } = data;

        //         if (result) {
        //             console.log("userData : ", userData);
        //             // saveLicense(info.licenseUrl, userData.id); //TODO:file 저장
        //             setLoading(false);
        //             navigation.navigate("SignUpStep5");
        //         }
        //     })
        //     .catch((e) => {
        //         console.error(e);
        //     })
        //     .then(() => {});
    };

    const saveLicense = async (url, userId) => {
        //TODO: 이미지저장
        const formData = new FormData();

        const file = {
            uri: url,
            type: "image/jpeg",
            name: () => {
                const uriArr = url.split("/");

                return uriArr[uriArr.length - 1];
            },
        };

        formData.append("file", file);
        formData.append("userId", userId);

        const response = await axios.post(SERVER + `/users/license`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
            },
            transformRequest: (data, headers) => {
                return data;
            },
        });
    };

    const ShowDetailTerms = (index) => {
        navigation.navigate("DetailTerms", {
            index,
            title: termsTexts[index],
        });
    };
    return (
        <>
            {loading ? <Loading /> : null}
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
        </>
    );
}

export default SignUpStep3;
