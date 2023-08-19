import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import styled from "styled-components/native";
import BoldText from "../../../component/text/BoldText";
import RegularText from "../../../component/text/RegularText";
import MediumText from "../../../component/text/MediumText";
import { color } from "../../../styles";
import Layout from "../../../component/layout/Layout";
import { shadowProps } from "../../../component/Shadow";
import RefreshBtn from "../../../assets/images/icons/btn_Refresh.png";
import Car from "../../../assets/images/icons/Procress_car.png";
import Button from "../../../component/button/Button";
import {
    GetDate,
    GetPhoneNumberWithDash,
    GetTime,
    numberWithComma,
} from "../../../utils";

const Refresh = styled.View`
    flex-direction: row;
    align-items: center;
    margin-right: 15px;
`;

const Progress = styled.View`
    margin-bottom: 30px;
`;

const ProgressBar = styled.View`
    background-color: ${color["image-area-background"]};
    height: 10px;
    border-radius: 6px;
`;
const InProgressBar = styled.View`
    width: ${(props) => props.progress}%;
    background-color: ${color["main"]};
    height: 10px;
    border-radius: 6px;
`;

const Dots = styled.View`
    width: 100%;
    position: absolute;
    flex-direction: row;
    z-index: 100;
    justify-content: space-evenly;
`;
const Dot = styled.View`
    background-color: ${(props) =>
        props.done ? "#B14300" : color["box-border"]};
    width: 10px;
    height: 10px;
    border-radius: 5px;
`;

const Items = styled.View`
    width: 100%;
    margin-top: 25px;
    background-color: white;
    padding: 20px 16px;
    border-radius: 14px;
`;

const SItem = styled.View`
    align-items: ${(props) => (props.center ? "center" : "flex-start")};
`;

const Wrapper = styled.View`
    margin-top: 20px;
`;

const Box = styled.View`
    background-color: ${color["box-color-background"]};
    border-radius: 18px;
    padding: 20px 15px;
    border: 1px ${color.main} solid;
    margin-top: 20px;
`;

const Row = styled.View`
    flex-direction: row;
    justify-content: ${(props) =>
        props.around ? "space-around" : "space-between"};
`;

const Results = styled.View`
    justify-content: flex-end;
    flex-direction: row;
`;

const ResultTitle = styled.View`
    padding-left: 30px;
    padding-right: 15px;
    border-bottom-width: 1px;
    border-bottom-color: ${color["image-area-background"]};
`;

const ResultValue = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: ${color["image-area-background"]};
`;

const Total = styled.View`
    justify-content: flex-end;
    flex-direction: row;
    align-items: center;
    padding: 10px 0px;
`;

const PointContainer = styled.View`
    align-items: flex-end;
`;

const Point = styled.View`
    background-color: ${color.blue};
    padding: 10px 20px;
    border-radius: 20px;
`;

const DriverTitle = styled.View`
    align-items: center;
`;
const orderData = {
    acceptUser: 55,
    address: "",
    address1: "서울 관악구 신림동 1623-3",
    address2: null,
    bothType: null,
    createdAt: "2023-05-12T07:56:39.900Z",
    detailAddress1: null,
    detailAddress2: null,
    directPhone: "01032655452",
    emergency: false,
    floor: 8,
    id: 119,
    memo: null,
    orderReservation: [],
    orderStatusId: 3,
    otherAddress: null,
    otherFloor: null,
    phone: "01032655452",
    point: 9000,
    price: 60000,
    pushStatus: null,
    quantity: null,
    regionId: 1,
    registUser: { id: 56 },
    simpleAddress1: "서울 관악구",
    simpleAddress2: null,
    time: "하루",
    type: "올림",
    userId: 56,
    vehicleType: "스카이",
    volumeType: "time",
    workDateTime: "2023-05-13T08:00:00.000Z",
};

const STEP = [
    { title: "오더요청", progress: 20 },
    { title: "예약완료", progress: 40 },
    { title: "작업시작", progress: 60 },
    { title: "작업완료", progress: 100 },
];
function OrderProgress({ navigation, route }) {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState(4);

    useEffect(() => {
        setProgress(STEP[status - 1].progress);
    }, [status]);

    useEffect(() => {
        console.log(route?.params?.order);
        navigation.setOptions({
            headerRight: () => (
                <Refresh>
                    <MediumText
                        style={{
                            fontSize: 15,
                            color: color.blue,
                            marginRight: 3,
                        }}
                    >
                        새로고침
                    </MediumText>
                    <Image
                        source={RefreshBtn}
                        resizeMode="contain"
                        style={{ width: 27, height: 27 }}
                    />
                </Refresh>
            ),
        });
    });

    const Item = ({ title, value, center }) => (
        <SItem center={center}>
            <RegularText
                style={{
                    fontSize: 16,
                    color: color["page-grey-text"],
                    marginBottom: 5,
                }}
            >
                {title}
            </RegularText>
            <RegularText>{value}</RegularText>
        </SItem>
    );

    const Line = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: color["image-area-background"],
                    marginTop: 18,
                    marginBottom: 18,
                }}
            />
        );
    };

    const Title = ({ children }) => {
        return (
            <RegularText
                style={{
                    fontSize: 16,
                    textAlign: "right",
                    marginBottom: 10,
                }}
            >
                {children}
            </RegularText>
        );
    };
    const Price = ({ price }) => {
        return (
            <RegularText
                style={{ fontSize: 16, textAlign: "right", marginBottom: 10 }}
            >
                {price}{" "}
                <RegularText style={{ fontSize: 12, textAlign: "right" }}>
                    AP
                </RegularText>
            </RegularText>
        );
    };
    return (
        <Layout>
            <Progress>
                <Image
                    source={Car}
                    style={{
                        width: 40,
                        height: 33.22,
                        marginBottom: 10,
                        left: `${progress - 5}%`,
                    }}
                    resizeMode="contain"
                />
                <ProgressBar>
                    <Dots>
                        {STEP.map((value, index) => (
                            <View
                                key={index}
                                style={{
                                    alignItems: "center",
                                }}
                            >
                                <Dot done={value.progress <= progress} />
                                <BoldText
                                    style={{
                                        fontSize: 14,
                                        marginTop: 10,
                                        color:
                                            value.progress <= progress
                                                ? color.main
                                                : color["page-lightgrey-text"],
                                    }}
                                >
                                    {value.title}
                                </BoldText>
                            </View>
                        ))}
                    </Dots>
                    <InProgressBar progress={progress} />
                </ProgressBar>
            </Progress>
            {status === 4 ? null : (
                <Box>
                    <BoldText style={{ lineHeight: 25 }}>
                        {status === 1
                            ? "기사님들의 응답을\n기다리고 있습니다…"
                            : null}
                        {status === 2
                            ? "기사님이 고객님의 오더를\n예약하였습니다."
                            : null}
                        {status === 3
                            ? "기사님이 작업을 시작하였습니다."
                            : null}
                        {/* TODO: status에 따라 문구 바뀜 */}
                    </BoldText>
                    {status === 1 ? (
                        <RegularText
                            style={{
                                color: color["page-grey-text"],
                                fontSize: 14,
                                marginTop: 10,
                            }}
                        >
                            매칭이 완료될 때까지 시간이 걸릴 수 있습니다.
                        </RegularText>
                    ) : null}
                </Box>
            )}
            {status === 1 || status === 2 ? (
                <Button
                    onPress={() => console.log("cancel")}
                    type="accent"
                    text="요청 취소"
                    style={{ marginTop: 20 }}
                />
            ) : null}
            {status === 4 ? (
                <Items style={shadowProps}>
                    <View style={{ alignItems: "center", paddingTop: 20 }}>
                        <BoldText>기사님이 작업을 완료했습니다.</BoldText>
                        <Image
                            source={RefreshBtn}
                            resizeMode="contain"
                            style={{
                                width: 120,
                                height: 120,
                                marginTop: 30,
                                marginBottom: 30,
                            }}
                        />
                        <RegularText
                            style={{
                                fontSize: 20,
                                textAlign: "center",
                                lineHeight: 27,
                            }}
                        >
                            작업 내역을 확인하시고{"\n"}작업에 이상이 없을 시
                            {"\n"}
                            아래{" "}
                            <RegularText
                                style={{
                                    fontSize: 20,
                                    color: "#EB1D36",
                                    textDecorationLine: "underline",
                                }}
                            >
                                작업 완료 확인 버튼
                            </RegularText>
                            을{"\n"}꼭! 눌러주세요
                        </RegularText>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 30 }}>
                        <Image
                            source={require("../../../assets/images/icons/icon_info2.png")}
                            style={{
                                width: 17,
                                height: 17,
                                marginRight: 5,
                                marginTop: 2,
                            }}
                            resizeMode="contain"
                        />
                        <RegularText
                            style={{
                                fontSize: 16,
                                color: color.main,
                                lineHeight: 23,
                            }}
                        >
                            작업에 문제가 있나요?{"\n"}아래 카톡 상담 버튼을
                            눌러주세요.
                        </RegularText>
                    </View>
                </Items>
            ) : null}

            {status === 2 || status === 3 ? (
                <Items style={shadowProps}>
                    <DriverTitle>
                        <Image
                            source={RefreshBtn}
                            resizeMode="contain"
                            style={{ width: 60, height: 60 }}
                        />
                        <MediumText style={{ marginTop: 10, marginBottom: 25 }}>
                            기사님 정보
                        </MediumText>
                    </DriverTitle>
                    <Row around={true}>
                        <Item
                            title="기사님 성함"
                            value="나백진"
                            center={true}
                        />
                        <Item
                            title="연락처"
                            value={GetPhoneNumberWithDash(
                                orderData.directPhone
                            )}
                            center={true}
                        />
                    </Row>
                    <Line />
                    <Row around={true}>
                        <Item
                            title="차량 번호"
                            value="12가 1234"
                            center={true}
                        />
                        <Item
                            title="차량정보"
                            value="사다리차 / 5t"
                            center={true}
                        />
                    </Row>
                    <Line />
                </Items>
            ) : null}

            <Items style={shadowProps}>
                <MediumText>오더 내역</MediumText>
                <Wrapper>
                    <Row>
                        <Item
                            title="작업 일시"
                            value={
                                GetDate(orderData.workDateTime) +
                                " " +
                                GetTime(orderData.workDateTime)
                            }
                        />
                    </Row>
                    <Line />
                    <Row>
                        <Item
                            title="주소"
                            value={
                                orderData.address1 +
                                (orderData.address2
                                    ? " " + orderData.address2
                                    : "")
                            }
                        />
                    </Row>
                    <Line />
                    <Row>
                        <Item
                            title="차량 종류"
                            value={orderData.vehicleType + "차"}
                            center={true}
                        />
                        <Item
                            title="작업 종류"
                            value={orderData.type}
                            center={true}
                        />
                        <Item
                            title="작업 높이"
                            value={orderData.floor + "층"}
                            center={true}
                        />
                        <Item
                            title="작업 종류"
                            value={orderData.time}
                            center={true}
                        />
                    </Row>
                    <Line />
                    <Row around={true}>
                        <Item
                            title="연락처"
                            value={GetPhoneNumberWithDash(orderData.phone)}
                            center={true}
                        />
                        <Item
                            title="현장 연락처"
                            value={GetPhoneNumberWithDash(
                                orderData.directPhone
                            )}
                            center={true}
                        />
                    </Row>
                    <Line />
                    <Row>
                        <Item
                            title="특이사항"
                            value={orderData.memo || "없음"}
                        />
                    </Row>
                    <Line />

                    <Results>
                        <ResultTitle>
                            <Title>알테구 이용비</Title>
                            <Title>포인트 사용</Title>
                            <Title>
                                긴급 오더{" "}
                                <RegularText
                                    style={{
                                        fontSize: 16,
                                        color: "#EB1D36",
                                    }}
                                >
                                    (25%)
                                </RegularText>
                            </Title>
                        </ResultTitle>
                        <ResultValue>
                            <Price price={numberWithComma(orderData.price)} />
                            <Price price={"- " + numberWithComma(0)} />
                            <Price
                                price={
                                    orderData.emergency
                                        ? numberWithComma(
                                              orderData.price * 0.25
                                          )
                                        : 0
                                }
                            />
                        </ResultValue>
                    </Results>
                    <Total>
                        <RegularText
                            style={{
                                fontSize: 16,
                            }}
                        >
                            총 결제 금액
                        </RegularText>
                        <BoldText
                            style={{
                                fontSize: 20,
                                color: color.main,
                                marginLeft: 30,
                            }}
                        >
                            {numberWithComma(orderData.price)}
                            <BoldText
                                style={{
                                    fontSize: 14,
                                    color: color.main,
                                }}
                            >
                                {" "}
                                AP
                            </BoldText>
                        </BoldText>
                    </Total>
                    <PointContainer>
                        <Point>
                            <RegularText
                                style={{
                                    fontSize: 14,
                                    color: "white",
                                }}
                            >
                                적립 예정 포인트{"    "}
                                <BoldText
                                    style={{
                                        fontSize: 16,
                                        color: "white",
                                    }}
                                >
                                    {numberWithComma(orderData.price * 0.1)}
                                    <BoldText
                                        style={{
                                            fontSize: 12,
                                            color: "white",
                                        }}
                                    >
                                        {" "}
                                        AP
                                    </BoldText>
                                </BoldText>
                            </RegularText>
                        </Point>
                    </PointContainer>
                </Wrapper>
            </Items>
        </Layout>
    );
}

OrderProgress.propTypes = {};
export default OrderProgress;
