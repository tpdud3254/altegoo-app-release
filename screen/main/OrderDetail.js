import React, { useContext, useEffect, useRef, useState } from "react";
import {
    ScrollView,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import styled from "styled-components/native";
import MainLayout from "../../component/layout/MainLayout";
import PlainText from "../../component/text/PlainText";
import UserContext from "../../context/UserContext";
import { theme } from "../../styles";
import { getAsyncStorageToken, numberWithComma } from "../../utils";
import Checkbox from "expo-checkbox";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SERVER } from "../../utils";
import { VALID } from "../../constant";
import WebView from "react-native-webview";

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

const ButtonContainer = styled.View`
    align-items: center;
`;
const Button = styled.TouchableOpacity`
    background-color: ${theme.sub.blue};
    width: 120px;
    align-items: center;
    border-radius: 5px;
    margin-top: 15px;
    margin-bottom: 10px;
    padding: 10px;
`;
function OrderDetail({ route, navigation }) {
    const webViewRef1 = useRef();
    const webViewRef2 = useRef();
    const { info } = useContext(UserContext);
    const [order, setOrder] = useState({});
    const [showMap1, setShowMap1] = useState(false);
    const [showMap2, setShowMap2] = useState(false);
    const [progress, setProgress] = useState(0.0);

    console.log(route?.params?.orderData);
    useEffect(() => {
        setOrder(route?.params?.orderData);
    }, []);

    const sendMessage = (index, data) => {
        if (index === 1) {
            webViewRef1.current.postMessage(data);
        } else {
            webViewRef2.current.postMessage(data);
        }
    };

    const toggleMap = (index) => {
        if (index === 1) {
            setShowMap1((prev) => !prev);
        } else {
            setShowMap2((prev) => !prev);
        }
    };

    const getWorkType = () => {
        let text = "";
        if (order.type !== "양사") {
            text = `${order.vehicleType} / ${order.type}`;
        } else {
            text = `${order.vehicleType} / ${order.type} (${
                order.bothType === 1 ? "내림 > 올림" : "올림 > 내림"
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

        const workTime = new Date(order.workDateTime);
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
        let text = "";

        if (order.type === "양사") {
            text = `${order.floor}층(${
                order.bothType === 1 ? "내림" : "올림"
            }) > ${order.otherFloor}층(${
                order.bothType === 1 ? "올림" : "내림"
            })`;
        } else {
            text = `${order.floor}층`;
        }

        return text;
    };

    const getPrice = () => {
        return `${numberWithComma(order.price || 0)} AP`;
    };

    const getPoint = () => {
        return `${numberWithComma(order.point || 0)} AP`;
    };

    const onNextStep = ({ directPhone, memo }) => {};

    const onClose = () => {
        navigation.goBack();
    };

    const setAcceptOrder = async (orderId) => {
        try {
            const response = await axios.patch(
                SERVER + "/works/status",
                {
                    status: 2, //1: 작업 요청, 2: 작업 예약, 3: 작업 중, 4: 작업 완료
                    id: orderId,
                },
                {
                    headers: {
                        auth: await getAsyncStorageToken(),
                    },
                }
            );

            const {
                data: { result },
            } = response;

            if (result === VALID) {
                const {
                    data: {
                        data: { list },
                    },
                } = response;

                list.map((resultOrder, index) => {
                    if (resultOrder.id === order.id) {
                        setOrder(resultOrder);
                    }
                });
                //TODO: 나중에 효율적으로 바꾸기
            } else {
                const {
                    data: { msg },
                } = response;

                console.log(msg);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const setCancleOrder = async (orderId) => {
        axios
            .patch(
                SERVER + "/works/status",
                {
                    status: 1, //1: 작업 요청, 2: 작업 예약, 3: 작업 중, 4: 작업 완료
                    id: orderId,
                },
                {
                    headers: {
                        auth: await getAsyncStorageToken(),
                    },
                }
            )
            .then(({ data }) => {
                const {
                    result,
                    data: { list },
                } = data;
                console.log("result: ", result);
                list.map((resultOrder, index) => {
                    if (resultOrder.id === order.id) {
                        setOrder(resultOrder);
                    }
                });
                //TODO: 나중에 효율적으로 바꾸기
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {});
    };
    const setReserveOrder = async (orderId) => {
        axios
            .post(
                SERVER + "/works/reservation",
                {
                    orderId,
                },
                {
                    headers: {
                        auth: await getAsyncStorageToken(),
                    },
                }
            )
            .then(({ data }) => {
                const {
                    result,
                    data: { list },
                } = data;
                list.map((resultOrder, index) => {
                    if (resultOrder.id === order.id) {
                        setOrder(resultOrder);
                    }
                });
                //TODO: 나중에 효율적으로 바꾸기
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {});
    };
    const setCancleReservation = async (orderId) => {
        axios
            .delete(SERVER + "/works/reservation", {
                data: { orderId },
                headers: {
                    auth: await getAsyncStorageToken(),
                },
            })
            .then(({ data }) => {
                const {
                    result,
                    data: { list },
                } = data;
                list.map((resultOrder, index) => {
                    if (resultOrder.id === order.id) {
                        setOrder(resultOrder);
                    }
                });
                //TODO: 나중에 효율적으로 바꾸기
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {});
    };

    const AcceptButton = ({ orderId }) => (
        <Button
            color={theme.btnPointColor}
            onPress={() => setAcceptOrder(orderId)}
        >
            <PlainText style={{ fontSize: 19, color: "white" }}>
                예약하기
            </PlainText>
        </Button>
    );

    const ReserveButton = ({ orderId }) => (
        <Button color={theme.sub.blue} onPress={() => setReserveOrder(orderId)}>
            <PlainText style={{ fontSize: 19, color: "white" }}>
                예약대기
            </PlainText>
        </Button>
    );

    const CancleButton = ({ orderId }) => (
        <Button color="#777" onPress={() => setCancleOrder(orderId)}>
            <PlainText style={{ fontSize: 19, color: "white" }}>
                예약취소
            </PlainText>
        </Button>
    );

    const CancleReserveButton = ({ orderId }) => (
        <Button
            color={theme.sub.green}
            onPress={() => setCancleReservation(orderId)}
        >
            <PlainText style={{ fontSize: 19, color: "white" }}>
                예약대기 취소
            </PlainText>
        </Button>
    );

    const DefaultButton = () => (
        <Button onPress={() => onClose()}>
            <PlainText style={{ fontSize: 19, color: "white" }}>확인</PlainText>
        </Button>
    );

    const SetStatusButton = ({ order }) => {
        if (order.userId === info.id) return <DefaultButton />;
        if (order.orderStatusId === 1)
            //작업 요청
            return <AcceptButton orderId={order.id} />;
        else if (order.orderStatusId === 2) {
            //예약 완료

            //내가 예약한 오더인 경우
            if (order.acceptUser === info.id)
                return <CancleButton orderId={order.id} />;

            //내가 예약하지 않은 오더인 경우
            if (order.orderReservation && order.orderReservation.length > 0) {
                let exist = false;
                order.orderReservation.map((value, index) => {
                    exist = value.userId === info.id;
                });

                //예약대기 목록에 내가 존재할 경우
                if (exist) return <CancleReserveButton orderId={order.id} />;
            }

            return <ReserveButton orderId={order.id} />;
        }
    };

    const Row = ({ title, content, button }) => (
        <SRow>
            <STitle>
                <PlainText style={{ fontSize: 18 }}>{title}</PlainText>
            </STitle>
            {button ? (
                <View style={{ width: "75%", alignItems: "flex-end" }}>
                    <TouchableOpacity onPress={() => toggleMap(button)}>
                        <PlainText>거리뷰 보기</PlainText>
                    </TouchableOpacity>
                </View>
            ) : (
                <SContent>
                    <PlainText style={{ fontSize: 18 }}>{content}</PlainText>
                </SContent>
            )}
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
                            {order.type === "양사" ? (
                                <>
                                    <Row
                                        title={
                                            (order.bothType === 1
                                                ? "내림"
                                                : "올림") + " 주소"
                                        }
                                        content={
                                            order.address1 +
                                            " " +
                                            order.detailAddress1
                                        }
                                    />
                                    <Row title="" button={1} />
                                    {showMap1 ? (
                                        <View
                                            style={{
                                                alignItems: "center",
                                                marginBottom: 20,
                                            }}
                                        >
                                            <View style={{ height: 350 }}>
                                                <WebView
                                                    ref={webViewRef1}
                                                    containerStyle={{
                                                        width: 350,
                                                        height: 350,
                                                    }}
                                                    source={{
                                                        uri: "https://master.d1p7wg3e032x9j.amplifyapp.com/map",
                                                        // uri: "https://dd79-211-59-182-118.jp.ngrok.io/map",
                                                    }}
                                                    onLoad={() =>
                                                        sendMessage(
                                                            1,
                                                            JSON.stringify({
                                                                address:
                                                                    order.address1,
                                                            })
                                                        )
                                                    }
                                                    onLoadProgress={(event) => {
                                                        setProgress(
                                                            event.nativeEvent
                                                                .progress
                                                        );
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    ) : null}
                                    <Row
                                        title={
                                            (order.bothType === 1
                                                ? "올림"
                                                : "내림") + " 주소"
                                        }
                                        content={
                                            order.address2 +
                                            " " +
                                            order.detailAddress2
                                        }
                                    />
                                    <Row title="" button={2} />
                                    {showMap2 ? (
                                        <View
                                            style={{
                                                alignItems: "center",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    height: 350,
                                                    marginBottom: 20,
                                                }}
                                            >
                                                <WebView
                                                    ref={webViewRef2}
                                                    containerStyle={{
                                                        width: 350,
                                                        height: 350,
                                                    }}
                                                    source={{
                                                        uri: "https://master.d1p7wg3e032x9j.amplifyapp.com/map2",
                                                        // uri: "https://dd79-211-59-182-118.jp.ngrok.io/map2",
                                                    }}
                                                    onLoad={() =>
                                                        sendMessage(
                                                            2,
                                                            JSON.stringify({
                                                                address:
                                                                    order.address2,
                                                            })
                                                        )
                                                    }
                                                    onLoadProgress={(event) => {
                                                        setProgress(
                                                            event.nativeEvent
                                                                .progress
                                                        );
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    ) : null}
                                </>
                            ) : (
                                <>
                                    <Row
                                        title="작업 주소"
                                        content={
                                            order.address1 +
                                            " " +
                                            order.detailAddress1
                                        }
                                    />
                                    <Row title="" button={1} />
                                    {showMap1 ? (
                                        <View
                                            style={{
                                                alignItems: "center",
                                                marginBottom: 20,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    height: 350,
                                                }}
                                            >
                                                <WebView
                                                    ref={webViewRef1}
                                                    containerStyle={{
                                                        width: 350,
                                                        height: 350,
                                                    }}
                                                    source={{
                                                        uri: "https://master.d1p7wg3e032x9j.amplifyapp.com/map",
                                                        // uri: "https://dd79-211-59-182-118.jp.ngrok.io/map",
                                                    }}
                                                    onLoad={() =>
                                                        sendMessage(
                                                            1,
                                                            JSON.stringify({
                                                                address:
                                                                    order.address1,
                                                            })
                                                        )
                                                    }
                                                    onLoadProgress={(event) => {
                                                        setProgress(
                                                            event.nativeEvent
                                                                .progress
                                                        );
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    ) : null}
                                </>
                            )}
                            <Row title="작업 높이" content={getWorkFloor()} />

                            {order.volumeType === "quantity" ? (
                                <Row
                                    title="작업 물량"
                                    content={order.quantity}
                                />
                            ) : (
                                <Row title="작업 시간" content={order.time} />
                            )}

                            <Row title="휴대 전화" content={order.phone} />
                            <Row
                                title="현장 연락처"
                                content={order.directPhone}
                            />

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
                                    value={order.emergency}
                                    color={theme.btnPointColor}
                                />
                            </SRow>
                            <Row
                                title="특이 사항"
                                content={order.memo || "없음"}
                            />
                        </Container>

                        <View style={{ alignItems: "center" }}>
                            <SetStatusButton order={order} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </MainLayout>
    );
}

export default OrderDetail;
