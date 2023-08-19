import React, { useState } from "react";
import { Image, View } from "react-native";
import styled from "styled-components/native";
import LightText from "../text/LightText";
import { GetDate, GetDayOfWeek, GetTime, numberWithComma } from "../../utils";
import MediumText from "../text/MediumText";
import RegularText from "../text/RegularText";
import { color } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import BoldText from "../text/BoldText";
import { PopupWithButtons } from "../PopupWithButtons";

const ItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    background-color: ${(props) =>
        props.emergency ? color["box-color-background"] : color.lightblue};
    padding: 15px;
    border-radius: 16px;
    border: ${(props) => (props.emergency ? 1 : 0)}px solid #eb1d36;
    width: 100%;
`;

const Icon = styled.View`
    align-items: center;
    background-color: white;
    height: 60px;
    justify-content: center;
    border-radius: 16px;
    width: 60px;
    margin-right: 15px;
`;
const IconImage = styled.Image`
    width: 10px;
    height: 16px;
`;

const Wrapper = styled.View`
    padding-top: 3px;
    width: 80%;
`;
const Row = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${(props) => (props.lastChild ? 0 : 7)}px;
`;

const PointButton = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Button = styled.TouchableOpacity`
    background-color: ${color.main};
    align-items: center;
    padding: 12px;
    border-radius: 11px;
    margin-top: 5px;
`;
export const Order = {
    Items: ({ children }) => {
        return <View>{children}</View>;
    },
    Item: ({ data }) => {
        const navigation = useNavigation();
        const [isPopupShown, setIsPopupShown] = useState(false);

        const goToOrderProgress = () => {
            if (data.orderStatusId === 1)
                navigation.navigate("OrderDetails", { order: data });
            else navigation.navigate("DriverOrderProgress", { order: data });
        };

        const showPopup = () => {
            setIsPopupShown(true);
        };

        const hidePopup = () => {
            setIsPopupShown(false);
        };

        return (
            <View style={{ marginBottom: 20 }}>
                <ItemContainer
                    onPress={goToOrderProgress}
                    emergency={data.emergency}
                >
                    <Icon>
                        {data.type === "올림" ? (
                            <IconImage
                                source={require("../../assets/images/icons/icon_lift_up_ON.png")}
                            />
                        ) : data.type === "내림" ? (
                            <IconImage
                                source={require("../../assets/images/icons/icon_lift_down_ON.png")}
                            />
                        ) : (
                            <IconImage
                                source={require("../../assets/images/icons/icon_lift_both_ON.png")}
                            />
                        )}
                        <MediumText style={{ fontSize: 14, color: color.main }}>
                            {data.type}
                        </MediumText>
                    </Icon>
                    <Wrapper>
                        <Row>
                            <BoldText>{`${data.vehicleType}차 / ${data.time} / ${data.floor}층`}</BoldText>
                        </Row>
                        <Row>
                            <RegularText
                                style={{
                                    fontSize: 15,
                                }}
                            >
                                {data.address1}
                            </RegularText>
                        </Row>
                        <Row>
                            <RegularText style={{ fontSize: 15 }}>
                                {`${GetDate(
                                    data.workDateTime,
                                    "long"
                                )} (${GetDayOfWeek(
                                    data.workDateTime
                                )}) ${GetTime(data.workDateTime)}`}
                            </RegularText>
                        </Row>
                        <Row
                            style={{
                                justisfyContent: "space-between",
                            }}
                            lastChild={true}
                        >
                            <PointButton>
                                <Image
                                    source={require("../../assets/images/icons/icon_point.png")}
                                    style={{
                                        width: 27,
                                        height: 27,
                                        marginRight: 2,
                                    }}
                                />
                                <BoldText
                                    style={{
                                        fontSize: 15,
                                    }}
                                >
                                    {" " + numberWithComma(data.point || 0)}
                                    <BoldText
                                        style={{
                                            fontSize: 12,
                                        }}
                                    >
                                        {" "}
                                        AP
                                    </BoldText>
                                </BoldText>
                            </PointButton>
                            <RegularText
                                style={{
                                    fontSize: 15,
                                }}
                            >
                                수수료 :
                                <BoldText
                                    style={{
                                        fontSize: 15,
                                    }}
                                >
                                    {" " + numberWithComma(data.point || 0)}
                                    <BoldText
                                        style={{
                                            fontSize: 12,
                                        }}
                                    >
                                        {" "}
                                        AP
                                    </BoldText>
                                </BoldText>
                            </RegularText>
                        </Row>
                    </Wrapper>
                </ItemContainer>
                <Button onPress={showPopup}>
                    <MediumText style={{ color: "white" }}>
                        {data.emergency ? "긴급 예약하기" : "예약하기"}
                    </MediumText>
                </Button>
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
            </View>
        );
    },
};
