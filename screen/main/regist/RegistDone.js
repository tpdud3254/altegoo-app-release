import React, { useContext, useEffect, useState } from "react";
import { ScrollView, TouchableWithoutFeedback, View } from "react-native";
import styled from "styled-components/native";
import MainLayout from "../../../component/layout/MainLayout";
import PlainText from "../../../component/text/PlainText";
import RegistContext from "../../../context/RegistContext";
import UserContext from "../../../context/UserContext";
import { theme } from "../../../styles";
import {
    getAsyncStorageToken,
    numberWithComma,
    showError,
} from "../../../utils";
import { REGIST_NAV, VALID } from "../../../constant";
import VerticalDivider from "../../../component/divider/VerticalDivider";
import SubTitleText from "../../../component/text/SubTitleText";
import { SERVER } from "../../../server";
import axios from "axios";
import { PAYMENT_APP_ID } from "@env";

const Container = styled.View`
    flex: 1;
    background-color: white;
    padding: 10px;
`;
const SRow = styled.View`
    margin-bottom: 4px;
    flex-direction: row;
    width: 90%;
`;
const ButtonContainer = styled.View`
    flex-direction: row;
    height: 100px;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 10px;
`;
const Button = styled.TouchableOpacity``;
function RegistDone({ navigation }) {
    const { registInfo } = useContext(RegistContext);
    const { info } = useContext(UserContext);
    console.log("registInfo : ", registInfo);

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

    const onOrderModify = () => {
        navigation.navigate(REGIST_NAV[0]);
        // navigation.popToTop(); //TODO: 저장된 값 입력 추가
    };

    const onPay = async () => {
        let curPoint = 0;
        let pointId = 0;
        try {
            const response = await axios.get(SERVER + "/users/point", {
                headers: {
                    auth: await getAsyncStorageToken(),
                },
            });

            console.log(response.data);

            const {
                data: { result },
            } = response;

            if (result === VALID) {
                const {
                    data: {
                        data: { point },
                    },
                } = response;

                curPoint = point.curPoint;
                pointId = point.id;
            } else {
                const {
                    data: { msg },
                } = response;

                console.log(msg);
            }
        } catch (error) {
            console.log(error);
        }

        let price = registInfo.price;
        if (curPoint >= registInfo.price) {
            //포인트 >= 결제금액
            //작업 등록
            const sendingData = {
                workDateTime: registInfo.dateTime,
                type: registInfo.upDown,
                bothType: registInfo.bothType || null,
                address1: registInfo.address1,
                simpleAddress1: registInfo.simpleAddress1,
                address2: registInfo.address2,
                simpleAddress2: registInfo.simpleAddress2,
                regionId: registInfo.region,
                floor: registInfo.floor,
                otherFloor: registInfo.otherFloor || null,
                phone: info.phone,
                directPhone: registInfo.directPhone,
                price: registInfo.price,
                point: registInfo.point,
                volumeType: registInfo.volumeType,
                quantity: registInfo.quantity || null,
                time: registInfo.time || null,
                vehicleType: registInfo.vehicleType,
                emergency: registInfo.emergency,
                memo: registInfo.memo || null,
            };

            try {
                const response = await axios.post(
                    SERVER + "/works/upload",
                    { ...sendingData },
                    {
                        headers: {
                            auth: await getAsyncStorageToken(),
                        },
                    }
                );

                console.log(response.data);

                const {
                    data: { result },
                } = response;

                if (result === VALID) {
                    const {
                        data: {
                            data: { order },
                        },
                    } = response;

                    //포인트 차감
                    //TODO: admin 말고 다른거 파서 포인트 내역도 남기기
                    try {
                        const response = await axios.patch(
                            SERVER + "/admin/points",
                            {
                                pointId,
                                points: curPoint - registInfo.price,
                            }
                        );

                        const {
                            data: {
                                data: { points },
                                result,
                            },
                        } = response;

                        console.log(points);

                        if (result === VALID) {
                            navigation.navigate(REGIST_NAV[8], {
                                paymentData: order,
                            });
                        } else console.log(msg);
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    const {
                        data: { msg },
                    } = response;

                    console.log(msg);
                }
            } catch (error) {
                console.log("error : ", error);
            }
        } else {
            //결제하기
            const data = {
                application_id: PAYMENT_APP_ID,
                price: price - curPoint,
                order_name: registInfo.vehicleType + " 이용비 결제",
                order_id: info.userId + "_" + Date.now(),
                user: {
                    username: info.userName,
                    phone: info.phone,
                },
                curPoint,
                pointId,
            };
            navigation.navigate("Payment", { data });
        }
    };

    const onNextStep = async () => {
        //TODO: 첫 결제 시 포인트 지급

        const sendingData = {
            workDateTime: registInfo.dateTime,
            type: registInfo.upDown,
            bothType: registInfo.bothType || null,
            address: registInfo.address,
            otherAddress: registInfo.otherAddress || null,
            floor: registInfo.floor,
            otherFloor: registInfo.otherFloor || null,
            phone: info.phone,
            directPhone: registInfo.directPhone,
            price: registInfo.price,
            point: registInfo.point,
            volumeType: registInfo.volumeType,
            quantity: registInfo.quantity || null,
            time: registInfo.time || null,
            vehicleType: registInfo.vehicleType,
            emergency: registInfo.emergency,
            memo: registInfo.memo || null,
        };

        console.log(sendingData);

        axios
            .post(
                SERVER + "/works/upload",
                {
                    ...sendingData,
                },
                {
                    headers: {
                        auth: await getAsyncStorageToken(),
                    },
                }
            )
            .then(({ data }) => {
                const { result } = data;

                if (result === VALID) {
                    navigation.navigate(REGIST_NAV[8]);
                }
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {});
    };

    const Row = ({ title, content }) => (
        <SRow>
            <PlainText style={{ marginBottom: 3, fontSize: 20 }}>
                {title} : {content}
            </PlainText>
        </SRow>
    );

    return (
        <MainLayout>
            <Container>
                <ScrollView style={{ flex: 1 }}>
                    <TouchableWithoutFeedback>
                        <View>
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
                            <Row
                                title="현장 연락처"
                                content={registInfo.directPhone}
                            />
                            <Row
                                title="작업 비용"
                                content={
                                    numberWithComma(registInfo.price) + "AP"
                                }
                            />
                            <Row
                                title="적립 포인트"
                                content={
                                    numberWithComma(registInfo.point) + "AP"
                                }
                            />
                            <Row
                                title="긴급 오더"
                                content={registInfo.emergency ? "O" : "X"}
                            />
                            <Row title="특이 사항" content={registInfo.memo} />
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </Container>
            <ButtonContainer>
                <Button onPress={onOrderModify}>
                    <SubTitleText style={{ fontSize: 20 }}>
                        작업수정
                    </SubTitleText>
                </Button>
                <VerticalDivider color={theme.textBoxColor} />
                <Button onPress={onPay}>
                    <SubTitleText style={{ fontSize: 20 }}>
                        결제하기
                    </SubTitleText>
                </Button>
            </ButtonContainer>
        </MainLayout>
    );
}

export default RegistDone;
