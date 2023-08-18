import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import LightText from "../text/LightText";
import { GetDate, GetTime } from "../../utils";
import MediumText from "../text/MediumText";
import RegularText from "../text/RegularText";
import { color } from "../../styles";
import { useNavigation } from "@react-navigation/native";

const ItemContainer = styled.TouchableOpacity``;
const Row = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${(props) => (props.lastChild ? 0 : 11)}px;
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

        const goToOrderDetail = () => {
            navigation.navigate("OrderDetail", { order: data });
        };
        return (
            <ItemContainer onPress={goToOrderDetail}>
                <Row>
                    <LightText style={{ marginBottom: 5 }}>
                        {GetDate(data.workDateTime)}
                        {"   "}
                        <LightText>{GetTime(data.workDateTime)}</LightText>
                    </LightText>
                </Row>
                <Row>
                    <MediumText>{`${data.vehicleType}차 / ${data.type} / ${data.time}`}</MediumText>
                    <MediumText>
                        {data.price}{" "}
                        <MediumText
                            style={{
                                fontSize: 14,
                            }}
                        >
                            AP
                        </MediumText>
                    </MediumText>
                </Row>
                <Row>
                    <RegularText style={{ color: color["page-grey-text"] }}>
                        {data.address1}
                    </RegularText>
                </Row>
                <Row lastChild={true}>
                    <Badge status={data.orderStatusId} />
                </Row>
                <Line />
            </ItemContainer>
        );
    },
};
