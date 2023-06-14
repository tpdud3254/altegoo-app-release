import React, { useContext } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, View } from "react-native";
import PlainButton from "../../../../component/button/PlainButton";
import MediumText from "../../../../component/text/MediumText";
import { color } from "../../../../styles";
import SubTitleText from "../../../../component/text/SubTitleText";
import UserContext from "../../../../context/UserContext";
import { PAYMENT_APP_ID } from "@env";

function ChargePoint({ route, navigation }) {
    const { info } = useContext(UserContext);
    const onPay = (price) => {
        console.log(price);
        const data = {
            application_id: PAYMENT_APP_ID,
            price: price,
            order_name: "포인트 충전",
            order_id: info.userId + "_" + Date.now(),
            user: {
                username: info.userName,
                phone: info.phone,
            },
            pointId: route?.params?.account?.id,
            curPoint: route?.params?.account?.curPoint,
        };
        navigation.navigate("Charge", { data });
    };
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <View style={{ height: 300, justifyContent: "space-between" }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: color.textLight,
                        padding: 10,
                    }}
                    onPress={() => onPay(99000)}
                >
                    <MediumText>99,000 충전</MediumText>
                    <MediumText>(VAT 포함)</MediumText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: color.textLight,
                        padding: 10,
                    }}
                    onPress={() => onPay(33000)}
                >
                    <MediumText>33,000 충전</MediumText>
                    <MediumText>(VAT 포함)</MediumText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: color.textLight,
                        padding: 10,
                    }}
                    onPress={() => onPay(55000)}
                >
                    <MediumText>55,000 충전</MediumText>
                    <MediumText>(VAT 포함)</MediumText>
                </TouchableOpacity>
            </View>
        </View>
    );
}

ChargePoint.propTypes = {};
export default ChargePoint;
