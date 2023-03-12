import React, { useState } from "react";
import styled from "styled-components/native";
import PropTypes, { number } from "prop-types";
import { Text, TextInput, View } from "react-native";
import PlainText from "../../../../component/text/PlainText";
import { numberWithComma } from "../../../../utils";
import SubmitButton from "../../../../component/button/SubmitButton";

const point = {
    accountName: "고세영",
    accountNumber: 1002748253518,
    accruedPoint: 0,
    addPoint: 0,
    bank: "우리은행",
    curPoint: 2000000,
    id: 56,
    subtractPoint: 0,
    userId: 56,
    withdrawalPoint: 0,
};

function WithdrawalPoint() {
    const [withdrawalPoint, setWithdrawalPoint] = useState(0);

    const onWithdrawal = () => {
        console.log(withdrawalPoint);
    };
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <PlainText>은행명 : {point.bank}</PlainText>
            <PlainText>계좌번호 : {point.accountNumber}</PlainText>
            <PlainText>예금주 : {point.accountName}</PlainText>
            <PlainText>
                총 포인트 : {numberWithComma(point.curPoint)}AP
            </PlainText>
            <PlainText>출금 포인트 : </PlainText>
            <TextInput
                placeholder="금액을 적어주세요."
                keyboardType="number-pad"
                onChangeText={(text) => setWithdrawalPoint(text)}
            />
            <PlainText>출금 수수료 : 1,000AP</PlainText>
            <SubmitButton text="포인트 출금" onPress={onWithdrawal} />
        </View>
    );
}

WithdrawalPoint.propTypes = {};
export default WithdrawalPoint;
