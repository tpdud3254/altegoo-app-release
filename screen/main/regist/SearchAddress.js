import React, { useContext, useEffect } from "react";
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
            data: index,
            addressArr: route?.params?.addressArr || ["", ""],
        });
    };

    const onNextStep = ({ detailAddress1, detailAddress2 }) => {
        if (registInfo.upDown === "양사") {
            if (
                route?.params?.addressArr[0] === "" ||
                !detailAddress1 ||
                detailAddress1 === "" ||
                route?.params?.addressArr[1] === "" ||
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

            const Address1 =
                route?.params?.addressArr[0] + " " + detailAddress1;

            const Address2 =
                route?.params?.addressArr[1] + " " + detailAddress2;

            setRegistInfo({
                Address: Address1,
                otherAddress: Address2,
                ...registInfo,
            });
        } else {
            if (
                route?.params?.addressArr[0] === "" ||
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

            const Address1 =
                route?.params?.addressArr[0] + " " + detailAddress1;

            setRegistInfo({
                Address: Address1,
                otherAddress: null,
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

    return (
        <MainLayout>
            <Container>
                <InputAddress>
                    <Help
                        number="1"
                        text={`'${getHelpText(
                            registInfo.upDown
                        )}' 주소 검색하기`}
                    />
                    <InputAddWrapper>
                        <Search onPress={() => searchAddress(0)}>
                            {route?.params?.addressArr &&
                            route?.params?.addressArr[0] !== "" ? (
                                <PlainText>
                                    {route?.params?.addressArr[0]}
                                </PlainText>
                            ) : (
                                <PlainText style={{ color: "#777777" }}>
                                    주소 입력하기
                                </PlainText>
                            )}
                        </Search>
                        <DetailAddress
                            placeholder="상세주소 입력하기"
                            onChangeText={(text) =>
                                setValue("detailAddress1", text)
                            }
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
                                {route?.params?.addressArr &&
                                route?.params?.addressArr[1] !== "" ? (
                                    <PlainText>
                                        {route?.params?.addressArr[1]}
                                    </PlainText>
                                ) : (
                                    <PlainText style={{ color: "#777777" }}>
                                        주소 입력하기
                                    </PlainText>
                                )}
                            </Search>
                            <DetailAddress
                                placeholder="상세주소 입력하기"
                                onChangeText={(text) =>
                                    setValue("detailAddress2", text)
                                }
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
