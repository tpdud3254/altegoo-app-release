import React, { useEffect, useRef, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import BoldText from "../../../component/text/BoldText";
import RegularText from "../../../component/text/RegularText";
import MediumText from "../../../component/text/MediumText";
import { color } from "../../../styles";
import Layout, { LAYOUT_PADDING_X } from "../../../component/layout/Layout";
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
import WebView from "react-native-webview";

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
    justify-content: space-around;
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
    background-color: ${(props) =>
        props.status === 2 || props.status === 3
            ? color.lightblue
            : color["box-color-background"]};
    border-radius: 18px;
    padding: 20px 15px;
    border: 1px
        ${(props) =>
            props.status === 2 || props.status === 3 ? color.blue : color.main}
        solid;
    margin-top: 20px;
`;

const Row = styled.View`
    flex-direction: row;
    justify-content: ${(props) =>
        props.around ? "space-around" : "space-between"};
    align-items: center;
    width: 100%;
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

const Commission = styled(Total)`
    padding: 0px;
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

const ItemButton = styled.TouchableOpacity`
    border: 1px solid ${color.main};
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 44px;
    border-radius: 10px;
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
    { title: "예약완료", progress: 20 },
    { title: "작업시작", progress: 50 },
    { title: "작업완료", progress: 100 },
];
function DriverOrderProgress({ navigation, route }) {
    const webViewRef = useRef();

    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState(3);
    const [maoProgress, setMapProgress] = useState(0.0);

    const sendMessage = (data) => {
        webViewRef.current.postMessage(data);
    };

    useEffect(() => {
        if (status === 4) {
            setProgress(100);
            return;
        }
        setProgress(STEP[status - 1].progress);
    }, [status]);

    useEffect(() => {
        console.log(route?.params?.order);
    });

    const Item = ({ title, value, center, onClick }) => (
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
            {onClick ? (
                <TouchableOpacity>
                    <RegularText
                        style={{
                            color: color.main,
                            textDecorationLine: "underline",
                        }}
                    >
                        {value}
                    </RegularText>
                </TouchableOpacity>
            ) : (
                <RegularText>{value}</RegularText>
            )}
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
        <Layout
            scroll={status === 4 ? false : true}
            kakaoBtnShown={status === 4 ? true : false}
            bottomButtonProps={status === 4 ? { title: "홈으로" } : null}
            touchableElement={() => (
                <View>
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
                                        <Dot
                                            done={value.progress <= progress}
                                        />
                                        <BoldText
                                            style={{
                                                fontSize: 14,
                                                marginTop: 10,
                                                color:
                                                    value.progress <= progress
                                                        ? color.main
                                                        : color[
                                                              "page-lightgrey-text"
                                                          ],
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
                        <Box status={status}>
                            <BoldText style={{ lineHeight: 25 }}>
                                {status === 1 ? "예약이 완료되었습니다." : null}
                                {status === 2
                                    ? "작업이 시작될 시간입니다.\n현장에 도착하셨나요?"
                                    : null}
                                {status === 3
                                    ? "현재 작업이 진행중입니다."
                                    : null}
                                {/* TODO: status에 따라 문구 바뀜 */}
                            </BoldText>
                            {status === 1 ? (
                                <RegularText
                                    style={{
                                        color: color["page-grey-text"],
                                        fontSize: 15,
                                        marginTop: 10,
                                    }}
                                >
                                    작업이 시작하기 전까지 예약을 취소할 수
                                    있습니다.
                                    {"\n"}신중히 생각해주세요.
                                </RegularText>
                            ) : null}
                            {status === 2 ? (
                                <RegularText
                                    style={{
                                        color: color["page-grey-text"],
                                        fontSize: 15,
                                        marginTop: 10,
                                    }}
                                >
                                    작업시작 버튼을 반드시 눌러주세요.{"\n"}
                                    고객에게 작업 시작을 알립니다.
                                </RegularText>
                            ) : null}
                            {status === 3 ? (
                                <RegularText
                                    style={{
                                        color: color["page-grey-text"],
                                        fontSize: 15,
                                        marginTop: 10,
                                    }}
                                >
                                    작업이 완료되면 작업 완료 버튼을 반드시
                                    눌러주세요.{"\n"}고객이 확인 후 비용이
                                    지급됩니다.
                                </RegularText>
                            ) : null}
                        </Box>
                    )}
                    {status === 1 ? (
                        <Button
                            onPress={() => console.log("cancel")}
                            type="accent"
                            text="예약 취소"
                            style={{ marginTop: 20 }}
                        />
                    ) : null}
                    {status === 2 ? (
                        <Button
                            onPress={() => console.log("cancel")}
                            type="accent"
                            text="작업 시작"
                            style={{
                                marginTop: 20,
                                backgroundColor: color.blue,
                            }}
                        />
                    ) : null}
                    {status === 3 ? (
                        <Button
                            onPress={() => console.log("cancel")}
                            type="accent"
                            text="작업 완료"
                            style={{
                                marginTop: 20,
                                backgroundColor: color.blue,
                            }}
                        />
                    ) : null}
                    {status === 4 ? null : (
                        <View
                            style={{
                                alignItems: "center",
                                marginTop: 20,
                                marginBottom: 20,
                            }}
                        >
                            <View style={{ height: 350 }}>
                                <WebView
                                    ref={webViewRef}
                                    containerStyle={{
                                        width: 400,
                                        height: 350,
                                    }}
                                    source={{
                                        uri: "https://master.d1p7wg3e032x9j.amplifyapp.com/map",
                                    }}
                                    onLoad={() =>
                                        sendMessage(
                                            JSON.stringify({
                                                address:
                                                    route?.params?.order
                                                        ?.address1,
                                            })
                                        )
                                    }
                                    onLoadProgress={(event) => {
                                        setMapProgress(
                                            event.nativeEvent.progress
                                        );
                                    }}
                                />
                            </View>
                        </View>
                    )}
                </View>
            )}
        >
            {status === 4 ? (
                <View style={{ marginTop: 20 }}>
                    <Items style={shadowProps}>
                        <View style={{ alignItems: "center", paddingTop: 20 }}>
                            <BoldText
                                style={{ textAlign: "center", lineHeight: 30 }}
                            >
                                수고하셨습니다.{"\n"}작업이 완료되었습니다.
                            </BoldText>
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
                                고객과 문제가 있나요?{"\n"}아래 카톡 상담 버튼을
                                눌러주세요.
                            </RegularText>
                        </View>
                    </Items>
                </View>
            ) : (
                <>
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
                            <View>
                                <RegularText
                                    style={{
                                        fontSize: 16,
                                        color: color["page-grey-text"],
                                        marginBottom: 5,
                                    }}
                                >
                                    주소
                                </RegularText>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        width: "100%",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <RegularText>
                                        {orderData.address1 +
                                            (orderData.address2
                                                ? " " + orderData.address2
                                                : "")}
                                    </RegularText>
                                    <ItemButton>
                                        <Image
                                            source={require(`../../../assets/images/icons/icon_location.png`)}
                                            style={{ width: 26, height: 26 }}
                                        />
                                    </ItemButton>
                                </View>
                            </View>
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
                                    value={GetPhoneNumberWithDash(
                                        orderData.phone
                                    )}
                                    center={true}
                                    onClick={() => console.log("click")}
                                />
                                <Item
                                    title="현장 연락처"
                                    value={GetPhoneNumberWithDash(
                                        orderData.directPhone
                                    )}
                                    center={true}
                                    onClick={() => console.log("click")}
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
                                    <Price
                                        price={numberWithComma(orderData.price)}
                                    />

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
                                    총 수입 금액
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
                            <Commission>
                                <RegularText
                                    style={{
                                        fontSize: 16,
                                        color: color["page-grey-text"],
                                    }}
                                >
                                    수수료
                                </RegularText>
                                <BoldText
                                    style={{
                                        fontSize: 17,
                                        marginLeft: 12,
                                    }}
                                >
                                    {numberWithComma(orderData.price)}
                                    <BoldText
                                        style={{
                                            fontSize: 13,
                                        }}
                                    >
                                        {" "}
                                        AP
                                    </BoldText>
                                </BoldText>
                            </Commission>
                        </Wrapper>
                    </Items>
                </>
            )}
        </Layout>
    );
}

DriverOrderProgress.propTypes = {};
export default DriverOrderProgress;
