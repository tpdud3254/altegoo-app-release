import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, View } from "react-native";
import PlainButton from "../../../../component/button/PlainButton";
import PlainText from "../../../../component/text/PlainText";
import { theme } from "../../../../styles";
import SubTitleText from "../../../../component/text/SubTitleText";

function ChargePoint({ navigation }) {
    const onPay = (price) => {
        console.log(price);
        navigation.navigate("Payment", {
            callBackPage: "PointMain",
            price,
        });
    };
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <TouchableOpacity
                style={{ backgroundColor: theme.lightFontColor }}
                onPress={() => onPay(99000)}
            >
                <PlainText>99,000 충전</PlainText>
                <PlainText>(VAT 포함)</PlainText>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ backgroundColor: theme.lightFontColor }}
                onPress={() => onPay(33000)}
            >
                <PlainText>33,000 충전</PlainText>
                <PlainText>(VAT 포함)</PlainText>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ backgroundColor: theme.lightFontColor }}
                onPress={() => onPay(55000)}
            >
                <PlainText>55,000 충전</PlainText>
                <PlainText>(VAT 포함)</PlainText>
            </TouchableOpacity>

            <SubTitleText>
                포인트 충전 후 알테구 혜택을 심플하고 이쁘고 멋지게...
            </SubTitleText>
        </View>
    );
}

ChargePoint.propTypes = {};
export default ChargePoint;
