import React, { useContext, useEffect, useState } from "react";
import {
    ScrollView,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import styled from "styled-components/native";
import MainLayout from "../../../component/layout/MainLayout";
import PlainText from "../../../component/text/PlainText";
import RegistContext from "../../../context/RegistContext";
import UserContext from "../../../context/UserContext";
import { theme } from "../../../styles";
import { numberWithComma } from "../../../utils";
import Checkbox from "expo-checkbox";
import { useForm } from "react-hook-form";
import { REGIST_NAV } from "../../../constant";

const Container = styled.View``;
const SRow = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`;
const STitle = styled.View`
    width: 25%;
    align-items: center;
`;

const SContent = styled.View`
    width: 75%;
    border: ${(props) =>
            props.borderLine || props.inputBorderLine ? "0px" : "1px"}
        solid ${theme.boxColor};
    padding: 5px;
    background-color: ${(props) => (props.background ? "white" : "")};
`;

const Emergency = styled.View`
    align-items: center;
    margin-top: -5px;
`;

const ButtonContainer = styled.View`
    align-items: center;
`;
const Button = styled.TouchableOpacity`
    background-color: ${theme.sub.blue};
    width: 100px;
    align-items: center;
    border-radius: 5px;
    margin-top: 15px;
    margin-bottom: 10px;
    padding: 10px;
`;
function AddOtherData({ navigation }) {
    const { registInfo, setRegistInfo } = useContext(RegistContext);
    const { info } = useContext(UserContext);
    const [price, setPrice] = useState(66000);
    const [emergencyOrder, setEmergencyOrder] = useState(false);
    const [isDirectPhone, setIsDirectPhone] = useState(false);
    const { setValue, register, handleSubmit } = useForm();
    console.log("registInfo : ", registInfo);

    useEffect(() => {
        register("directPhone");
        register("memo");
    }, []);

    useEffect(() => {
        if (isDirectPhone) {
            setValue("directPhone", info.phone);
        } else {
            setValue("directPhone", null);
        }
    }, [isDirectPhone]);

    useEffect(() => {
        setPrice(60000);
        if (emergencyOrder) {
            setPrice((prev) => prev + prev * 0.2);
        }
    }, [emergencyOrder]);

    const getWorkType = () => {
        const info = registInfo;

        let text = "";
        if (info.upDown !== "양사") {
            text = `${info.vehicleType} / ${info.upDown}`;
        } else {
            text = `${info.vehicleType} / ${info.upDown} (${
                info.bothType === 1 ? "내림 > 올림" : "올림 > 내림"
            })`;
        }

        return text;
    };

    const getWorkTime = () => {
        const getDay = (index) => {
            switch (index) {
                case 0:
                    return "일";
                case 1:
                    return "월";
                case 2:
                    return "화";
                case 3:
                    return "수";
                case 4:
                    return "목";
                case 5:
                    return "금";
                case 6:
                    return "토";

                default:
                    break;
            }
        };
        const info = registInfo;
        const workTime = new Date(info.dateTime);
        let text = `${workTime.getFullYear()}년 ${
            workTime.getMonth() + 1 < 10
                ? "0" + (workTime.getMonth() + 1)
                : workTime.getMonth() + 1
        }월 ${
            workTime.getDate() < 10
                ? "0" + workTime.getDate()
                : workTime.getDate()
        }일 (${getDay(workTime.getDay())}) ${
            workTime.getHours() < 10
                ? "0" + workTime.getHours()
                : workTime.getHours()
        }:${
            workTime.getMinutes() < 10
                ? "0" + workTime.getMinutes()
                : workTime.getMinutes()
        }`;

        return text;
    };

    const getWorkFloor = () => {
        const info = registInfo;

        let text = "";

        if (info.upDown === "양사") {
            text = `${info.floor}층(${
                info.bothType === 1 ? "내림" : "올림"
            }) > ${info.otherFloor}층(${
                info.bothType === 1 ? "올림" : "내림"
            })`;
        } else {
            text = `${info.floor}층`;
        }

        return text;
    };

    const getPrice = () => {
        //TODO: 작업비용
        return `${numberWithComma(price)} AP`;
    };

    const getPoint = () => {
        return `${numberWithComma(price * 0.15)} AP`;
    };

    const onNextStep = ({ directPhone, memo }) => {
        const point = price * 0.15;

        setRegistInfo({
            price,
            point,
            memo: memo || null,
            directPhone: directPhone || info.phone,
            emergency: emergencyOrder,
            ...registInfo,
        });

        navigation.navigate(REGIST_NAV[6]);
    };

    const Row = ({ title, content }) => (
        <SRow>
            <STitle>
                <PlainText style={{ fontSize: 18 }}>{title}</PlainText>
            </STitle>
            <SContent>
                <PlainText style={{ fontSize: 18 }}>{content}</PlainText>
            </SContent>
        </SRow>
    );

    const InputRow = ({ title, placeholder, checkBox, defaultValue, type }) => (
        <SRow>
            <STitle>
                <PlainText style={{ fontSize: 18 }}>{title}</PlainText>
            </STitle>
            <SContent
                inputBorderLine={!checkBox}
                borderLine={checkBox}
                background={!checkBox}
            >
                {checkBox ? (
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: -5,
                            marginBottom: -5,
                        }}
                    >
                        <Checkbox
                            style={{
                                width: 28,
                                height: 28,
                                marginRight: 5,
                            }}
                            value={isDirectPhone}
                            onValueChange={setIsDirectPhone}
                            color="#777"
                        />
                        <PlainText style={{ fontSize: 18 }}>
                            핸드폰 번호 동일
                        </PlainText>
                    </View>
                ) : (
                    <TextInput
                        style={{ fontSize: 18 }}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        onChangeText={(text) => setValue(type, text)}
                        keyboardType={
                            type === "memo" ? "default" : "number-pad"
                        }
                    />
                )}
            </SContent>
        </SRow>
    );
    return (
        <MainLayout>
            <ScrollView>
                <TouchableWithoutFeedback>
                    <View>
                        <Container>
                            <Row title="작업 종류" content={getWorkType()} />
                            <Row title="작업 일시" content={getWorkTime()} />
                            {registInfo.upDown === "양사" ? (
                                <>
                                    <Row
                                        title={
                                            (registInfo.bothType === 1
                                                ? "내림"
                                                : "올림") + " 주소"
                                        }
                                        content={registInfo.address}
                                    />
                                    <Row
                                        title={
                                            (registInfo.bothType === 1
                                                ? "올림"
                                                : "내림") + " 주소"
                                        }
                                        content={registInfo.otherAddress}
                                    />
                                </>
                            ) : (
                                <Row
                                    title="작업 주소"
                                    content={registInfo.address}
                                />
                            )}
                            <Row title="작업 높이" content={getWorkFloor()} />

                            {registInfo.volumeType === "quantity" ? (
                                <Row
                                    title="작업 물량"
                                    content={registInfo.quantity}
                                />
                            ) : (
                                <Row
                                    title="작업 시간"
                                    content={registInfo.time}
                                />
                            )}

                            <Row title="휴대 전화" content={info.phone} />
                            <InputRow
                                title="현장 연락처"
                                placeholder="현장에서 연락 가능한 번호 입력"
                                defaultValue={isDirectPhone ? info.phone : null}
                                type="directPhone"
                            />
                            <InputRow title="" checkBox />

                            <Row title="작업 비용" content={getPrice()} />
                            <Row title="적립 포인트" content={getPoint()} />
                            <SRow>
                                <STitle>
                                    <PlainText style={{ fontSize: 18 }}>
                                        긴급 오더
                                    </PlainText>
                                </STitle>
                                <Checkbox
                                    style={{ width: 28, height: 28 }}
                                    value={emergencyOrder}
                                    onValueChange={setEmergencyOrder}
                                    color={theme.btnPointColor}
                                />
                            </SRow>
                            {emergencyOrder ? (
                                <Emergency>
                                    <PlainText
                                        style={{
                                            fontSize: 18,
                                            color: theme.main,
                                            marginBottom: 5,
                                        }}
                                    >
                                        긴급 오더 선택 시 작업 비용이 20%
                                        증가하며
                                        {"\n"}
                                        모든 기사님에게 알림이 전송됩니다.
                                    </PlainText>
                                </Emergency>
                            ) : null}
                            <InputRow
                                title="특이 사항"
                                placeholder="특이사항을 입력해주세요."
                                type="memo"
                            />
                        </Container>
                        <ButtonContainer>
                            <Button onPress={handleSubmit(onNextStep)}>
                                <PlainText>확인</PlainText>
                            </Button>
                        </ButtonContainer>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </MainLayout>
    );
}

export default AddOtherData;
