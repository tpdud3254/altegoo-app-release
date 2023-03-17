import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import KakaoButton, {
    ButtonContainer,
} from "../../../component/button/KakaoButton";
import PlainButton from "../../../component/button/PlainButton";
import MainLayout from "../../../component/layout/MainLayout";
import PlainText from "../../../component/text/PlainText";
import RegistContext from "../../../context/RegistContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../../styles";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { REGIST_NAV } from "../../../constant";

const Container = styled.KeyboardAvoidingView`
    flex: 1;
`;

const InputAddress = styled.View`
    background-color: white;
    border-radius: 10px;
    padding: 10px;
`;

const InputOtherAddress = styled(InputAddress)`
    margin-top: 15px;
`;
const HelpWrapper = styled.View`
    flex-direction: row;
`;

const InputAddWrapper = styled.View`
    margin-top: 10px;
`;
const Search = styled.TouchableOpacity`
    border: 1px solid ${theme.boxColor};
    padding: 8px 5px;
`;
const DetailAddress = styled.TextInput`
    border: 1px solid ${theme.boxColor};
    padding: 8px 5px;
    font-size: 20px;
    font-weight: 300;
    margin-top: 8px;
`;
function SearchAddress({ route, navigation }) {
    const { registInfo, setRegistInfo } = useContext(RegistContext);
    const { setValue, register, handleSubmit } = useForm();
    console.log("registInfo : ", registInfo);

    useEffect(() => {
        register("detailAddress1");
        register("detailAddress2");
    }, []);

    console.log("SearchAddress Start: ", route?.params);

    const getHelpText = (upDown) => {
        if (upDown === "양사") {
            if (registInfo.bothType === 1) return "내림";
            else return "올림";
        } else {
            return upDown;
        }
    };

    const searchAddress = (index) => {
        navigation.navigate("Address", {
            ...route?.params,
            addressIndex: index,
        });
    };

    const getRegion = (sido, sigungu) => {
        if (sido.includes("서울")) return 1;
        else if (sido.includes("인천")) return 2;
        else if (sido.includes("경기")) {
            if (
                sigungu.includes("김포") ||
                sigungu.includes("부천") ||
                sigungu.includes("파주") ||
                sigungu.includes("고양") ||
                sigungu.includes("동두천") ||
                sigungu.includes("연천")
            )
                return 3;
            else if (
                sigungu.includes("의정부") ||
                sigungu.includes("양주") ||
                sigungu.includes("구리") ||
                sigungu.includes("남양주") ||
                sigungu.includes("포천") ||
                sigungu.includes("가평")
            )
                return 4;
            else if (
                sigungu.includes("광명") ||
                sigungu.includes("시흥") ||
                sigungu.includes("안산") ||
                sigungu.includes("안양") ||
                sigungu.includes("과천") ||
                sigungu.includes("의왕") ||
                sigungu.includes("군포") ||
                sigungu.includes("수원") ||
                sigungu.includes("오산") ||
                sigungu.includes("화성") ||
                sigungu.includes("평택")
            )
                return 5;
            else if (
                sigungu.includes("성남") ||
                sigungu.includes("하남") ||
                sigungu.includes("광주") ||
                sigungu.includes("용인") ||
                sigungu.includes("안성") ||
                sigungu.includes("이천") ||
                sigungu.includes("여주") ||
                sigungu.includes("양평")
            )
                return 6;
        }
    };
    const onNextStep = ({ detailAddress1, detailAddress2 }) => {
        if (registInfo.upDown === "양사") {
            if (
                !route?.params?.selectAddress1 ||
                route?.params?.selectAddress1 === "" ||
                !detailAddress1 ||
                detailAddress1 === "" ||
                !route?.params?.selectAddress2 ||
                route?.params?.selectAddress2 === "" ||
                !detailAddress2 ||
                detailAddress2 === ""
            ) {
                //TODO: 상세주소 없음 추가
                Toast.show({
                    type: "errorToast",
                    props: "주소를 입력해주세요.",
                });
                return;
            }

            const address1 =
                route?.params?.selectAddress1?.address + " " + detailAddress1;

            const address2 =
                route?.params?.selectAddress2?.address + " " + detailAddress2;

            setRegistInfo({
                address1: route?.params?.selectAddress1?.address,
                simpleAddress1: `${route?.params?.selectAddress1?.sido} ${route?.params?.selectAddress1?.sigungu}`,
                detailAddress1,
                address2: route?.params?.selectAddress2?.address,
                simpleAddress2: `${route?.params?.selectAddress2?.sido} ${route?.params?.selectAddress2?.sigungu}`,
                detailAddress2,
                region: getRegion(
                    route?.params?.selectAddress1?.sido,
                    route?.params?.selectAddress1?.sigungu
                ),
                ...registInfo,
            });
        } else {
            if (
                !route?.params?.selectAddress1 ||
                route?.params?.selectAddress1 === "" ||
                !detailAddress1 ||
                detailAddress1 === ""
            ) {
                //TODO: 상세주소 없음 추가
                Toast.show({
                    type: "errorToast",
                    props: "주소를 입력해주세요.",
                });
                return;
            }

            const address1 =
                route?.params?.selectAddress1?.address + " " + detailAddress1;

            setRegistInfo({
                address1: route?.params?.selectAddress1?.address,
                simpleAddress1: `${route?.params?.selectAddress1?.sido} ${route?.params?.selectAddress1?.sigungu}`,
                detailAddress1,
                address2: null,
                simpleAddress2: null,
                detailAddress2: null,
                region: getRegion(
                    route?.params?.selectAddress1?.sido,
                    route?.params?.selectAddress1?.sigungu
                ),
                ...registInfo,
            });
        }

        navigation.navigate(REGIST_NAV[3]);
    };

    const Help = ({ number, text }) => (
        <HelpWrapper>
            <MaterialCommunityIcons
                name={`numeric-${number}-circle-outline`}
                size={30}
                color="#777777"
            />
            <PlainText style={{ marginLeft: 5, color: "#777777" }}>
                {text}
            </PlainText>
        </HelpWrapper>
    );
    // TODO: 경기도, 인천, 서울 이외에는 막기
    return (
        <MainLayout>
            <Container behavior="position" keyboardVerticalOffset={0}>
                <InputAddress>
                    <Help
                        number="1"
                        text={`'${getHelpText(
                            registInfo.upDown
                        )}' 주소 검색하기`}
                    />
                    <InputAddWrapper>
                        <Search onPress={() => searchAddress(0)}>
                            {route?.params?.selectAddress1?.address &&
                            route?.params?.selectAddress1?.address !== "" ? (
                                <PlainText>
                                    {route?.params?.selectAddress1?.address}
                                </PlainText>
                            ) : (
                                <PlainText style={{ color: "#777777" }}>
                                    주소 입력하기
                                    {/* {registInfo.address1
                                        ? registInfo.address1
                                        : "주소 입력하기"} */}
                                </PlainText>
                            )}
                        </Search>
                        <DetailAddress
                            placeholder="상세주소 입력하기"
                            onChangeText={(text) =>
                                setValue("detailAddress1", text)
                            }
                            // defaultValue={registInfo.detailAddress1}
                        />
                    </InputAddWrapper>
                </InputAddress>

                {registInfo.upDown === "양사" ? (
                    <InputOtherAddress>
                        <Help
                            number="2"
                            text={`'${
                                getHelpText(registInfo.upDown) === "내림"
                                    ? "올림"
                                    : "내림"
                            }' 주소 검색하기`}
                        />
                        <InputAddWrapper>
                            <Search onPress={() => searchAddress(1)}>
                                {route?.params?.selectAddress2?.address &&
                                route?.params?.selectAddress2?.address !==
                                    "" ? (
                                    <PlainText>
                                        {route?.params?.selectAddress2?.address}
                                    </PlainText>
                                ) : (
                                    <PlainText style={{ color: "#777777" }}>
                                        주소 입력하기
                                        {/* {registInfo.address2
                                            ? registInfo.address2
                                            : "주소 입력하기"} */}
                                    </PlainText>
                                )}
                            </Search>
                            <DetailAddress
                                placeholder="상세주소 입력하기"
                                onChangeText={(text) =>
                                    setValue("detailAddress2", text)
                                }
                                // defaultValue={registInfo.detailAddress2}
                            />
                        </InputAddWrapper>
                    </InputOtherAddress>
                ) : null}
            </Container>
            <ButtonContainer>
                <PlainButton
                    text="다음단계"
                    style={{ width: "80%" }}
                    onPress={handleSubmit(onNextStep)}
                />
                <KakaoButton />
            </ButtonContainer>
        </MainLayout>
    );
}

export default SearchAddress;
