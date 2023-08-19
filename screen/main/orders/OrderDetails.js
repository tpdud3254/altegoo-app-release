import React, { useEffect, useRef, useState } from "react";
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
import WebView from "react-native-webview";
import { PopupWithButtons } from "../../../component/PopupWithButtons";

const Wrapper = styled.View`
    margin-bottom: 10px;
`;

const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 15px;
    align-items: center;
`;

const Box = styled.View`
    width: ${(props) => (props.width ? props.width : "100%")};
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid ${color["image-area-background"]};
    border-radius: 10px;
    padding: 20px;
`;

const EmergencyBox = styled(Box)`
    border: 1px solid ${color.main};
    flex-direction: row;
    align-items: flex-end;
`;

const ItemContainer = styled.View``;
const ItemButton = styled.TouchableOpacity`
    border: 1px solid ${color.main};
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 44px;
    border-radius: 10px;
`;

const BottomButtonContainer = styled.View`
    background-color: ${color["page-bluegrey-text"]};
    height: 60px;
    align-items: center;
    justify-content: center;
`;
function OrderDetails({ navigation, route }) {
    const webViewRef = useRef();
    const [progress, setProgress] = useState(0.0);

    const [isPopupShown, setIsPopupShown] = useState(false);

    const sendMessage = (data) => {
        webViewRef.current.postMessage(data);
    };

    useEffect(() => {
        console.log(route?.params?.order);
    });

    const showPopup = () => {
        setIsPopupShown(true);
    };

    const hidePopup = () => {
        setIsPopupShown(false);
    };

    const Map = () => (
        <View
            style={{
                alignItems: "center",
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
                                address: route?.params?.order?.address1,
                            })
                        )
                    }
                    onLoadProgress={(event) => {
                        setProgress(event.nativeEvent.progress);
                    }}
                />
            </View>
        </View>
    );

    const Emergency = () => (
        <EmergencyBox>
            <Image
                source={require("../../../assets/images/icons/icon_emerg.png")}
                style={{ width: 24, height: 24 }}
            />
            <RegularText
                style={{ color: "#EB1D36", marginLeft: 7, fontSize: 19 }}
            >
                긴급
            </RegularText>
        </EmergencyBox>
    );

    const BoxItem = ({ title, value, width }) => (
        <Box width={width}>
            <RegularText
                style={{
                    fontSize: 15,
                    color: color["page-grey-text"],
                    marginBottom: 7,
                }}
            >
                {title}
            </RegularText>
            <RegularText
                style={{
                    fontSize: 19,
                }}
            >
                {value}
            </RegularText>
        </Box>
    );

    const Item = ({ title, value, button }) => (
        <ItemContainer>
            <Row>
                <View>
                    <RegularText
                        style={{
                            fontSize: 15,
                            color: color["page-grey-text"],
                            marginBottom: 10,
                        }}
                    >
                        {title}
                    </RegularText>
                    <RegularText
                        style={{
                            fontSize: 19,
                        }}
                    >
                        {value}
                    </RegularText>
                </View>
                {button ? button : null}
            </Row>
            <Line />
        </ItemContainer>
    );

    const Line = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: color["image-area-background"],
                    marginTop: 5,
                    marginBottom: 18,
                }}
            />
        );
    };

    const BottomButton = () => {
        return (
            <BottomButtonContainer>
                <MediumText style={{ color: "white" }}>완료된 작업</MediumText>
            </BottomButtonContainer>
        );
    };

    return (
        <Layout
            touchableElement={Map}
            bottomButtonProps={{
                onPress: showPopup,
                title: route?.params?.order.emergency
                    ? "긴급 예약 하기"
                    : "예약하기",
                customButton:
                    route?.params?.order.orderStatusId > 4 ? (
                        <BottomButton />
                    ) : null,
            }}
        >
            <Wrapper>
                {route?.params?.order.emergency ? (
                    <Row>
                        <Emergency />
                    </Row>
                ) : null}
                <Row>
                    <BoxItem
                        title="차량 종류"
                        value={route?.params?.order?.type}
                        width="48%"
                    />
                    <BoxItem
                        title="작업 종류"
                        value={route?.params?.order?.type}
                        width="48%"
                    />
                </Row>
                <Row>
                    <BoxItem
                        title="작업 높이"
                        value={route?.params?.order?.type}
                        width="48%"
                    />
                    <BoxItem
                        title="무게"
                        value={route?.params?.order?.type}
                        width="48%"
                    />
                </Row>
                <Row>
                    <BoxItem
                        title="작업 시간"
                        value={route?.params?.order?.type}
                    />
                </Row>
            </Wrapper>
            <Wrapper>
                <Item title="작업 일시" value="23년 5월 25일 (수) 오전 10:00" />
                <Item
                    title="주소"
                    value="경기도 고양시 고양이로 21-16"
                    button={
                        <ItemButton>
                            <Image
                                source={require(`../../../assets/images/icons/icon_location.png`)}
                                style={{ width: 26, height: 26 }}
                            />
                        </ItemButton>
                    }
                />
                <Item
                    title="고객 연락처"
                    value="010-1323-1212"
                    button={
                        <ItemButton>
                            <Image
                                source={require(`../../../assets/images/icons/icon_phone.png`)}
                                style={{ width: 26, height: 26 }}
                            />
                        </ItemButton>
                    }
                />
                <Item
                    title="현장 연락처"
                    value="010-1323-1212"
                    button={
                        <ItemButton>
                            <Image
                                source={require(`../../../assets/images/icons/icon_phone.png`)}
                                style={{ width: 26, height: 26 }}
                            />
                        </ItemButton>
                    }
                />
                <Item title="특이사항" value="블라블라" />
                <Item
                    title="작업 비용"
                    value={
                        <RegularText>
                            150,000{" "}
                            <RegularText
                                style={{
                                    fontSize: 14,
                                }}
                            >
                                AP
                            </RegularText>
                        </RegularText>
                    }
                />
                <Item
                    title="적립 포인트"
                    value={
                        <RegularText>
                            50,000{" "}
                            <RegularText
                                style={{
                                    fontSize: 14,
                                }}
                            >
                                AP
                            </RegularText>
                        </RegularText>
                    }
                />
            </Wrapper>
            <PopupWithButtons
                visible={isPopupShown}
                onTouchOutside={hidePopup}
                onClick={hidePopup}
                negativeButtonLabel="취소"
            >
                <RegularText
                    style={{
                        fontSize: 22,
                        textAlign: "center",
                        lineHeight: 33,
                        paddingTop: 15,
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 15,
                    }}
                >
                    예약을 진행하시겠습니까?{"\n"}예약 후{" "}
                    <RegularText
                        style={{
                            fontSize: 22,
                            textDecorationLine: "underline",
                            color: color.main,
                        }}
                    >
                        내 작업
                    </RegularText>{" "}
                    메뉴에서{"\n"}
                    확인할 수 있습니다.
                </RegularText>
            </PopupWithButtons>
        </Layout>
    );
}

OrderDetails.propTypes = {};
export default OrderDetails;
