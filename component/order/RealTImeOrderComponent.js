import React from "react";
import { Image, View } from "react-native";
import styled from "styled-components/native";
import LightText from "../text/LightText";
import { GetDate, GetDayOfWeek, GetTime, numberWithComma } from "../../utils";
import MediumText from "../text/MediumText";
import RegularText from "../text/RegularText";
import { color } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import BoldText from "../text/BoldText";

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
        const Badge = ({ status }) => {
            let text = "";
            let textColor = "";
            let backgroundColor = "";

            switch (status) {
                case 1:
                    text = "요청중";
                    textColor = color["page-color-text"];
                    backgroundColor = color["box-color-background"];
                    break;
                case 5:
                    text = "작업 완료";
                    textColor = color["page-black-text"];
                    backgroundColor = color["image-area-background"];
                    break;
                case 6:
                    text = "작업 완료";
                    textColor = color["page-black-text"];
                    backgroundColor = color["image-area-background"];
                    break;
                default:
                    text = "예약 완료";
                    textColor = color.blue;
                    backgroundColor = color.lightblue;
                    break;
            }
            return (
                <View
                    style={{
                        backgroundColor: backgroundColor,
                        paddingTop: status === 1 ? 6 : 7,
                        paddingBottom: status === 1 ? 6 : 7,
                        paddingLeft: 15,
                        paddingRight: 15,
                        borderRadius: 16,
                        ...(status !== 1 || {
                            borderWidth: 1,
                            borderColor: color.main,
                        }),
                    }}
                >
                    <MediumText style={{ fontSize: 15, color: textColor }}>
                        {text}
                    </MediumText>
                </View>
            );
        };

        const goToOrderDetail = () => {
            navigation.navigate("OrderDetail", { order: data });
        };

        return (
            <View style={{ marginBottom: 20 }}>
                <ItemContainer
                    onPress={goToOrderDetail}
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
                <Button>
                    <MediumText style={{ color: "white" }}>
                        {data.emergency ? "긴급 예약하기" : "예약하기"}
                    </MediumText>
                </Button>
            </View>
        );
    },
};
