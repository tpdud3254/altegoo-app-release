import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import PropTypes, { number } from "prop-types";
import { Text, View } from "react-native";
import PlainText from "../../../../component/text/PlainText";
import { numberWithComma } from "../../../../utils";
import SubmitButton from "../../../../component/button/SubmitButton";
import { TextInput } from "react-native-paper";
import axios from "axios";
import { SERVER } from "../../../../server";
import { VALID } from "../../../../constant";

function WithdrawalPoint({ route, navigation }) {
    const [account, setAccount] = useState({});
    const [withdrawalPoint, setWithdrawalPoint] = useState(0);

    useEffect(() => {
        setAccount(route?.params?.account);
    }, []);
    const onWithdrawal = () => {
        console.log(withdrawalPoint);
        if (withdrawalPoint > account.curPoint) {
            return;
        }
        setPoint();
    };
    const setPoint = async (parsed) => {
        try {
            const response = await axios.patch(SERVER + "/admin/points", {
                pointId: account.id,
                points: account.curPoint - withdrawalPoint,
            });

            const {
                data: {
                    data: { points },
                    result,
                },
            } = response;

            console.log(points);

            if (result === VALID) {
                // navigation.navigate("TabsNavigator", {
                //     screen: "SettingNavigator",
                //     params: {
                //         screen: "PointNavigator",
                //         params: {
                //             screen: "PointMain",
                //         },
                //     },
                // });
                navigation.goBack();
            } else console.log(msg);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <PlainText>은행명 : {account.bank}</PlainText>
            <PlainText>계좌번호 : {account.accountNumber}</PlainText>
            <PlainText>예금주 : {account.accountName}</PlainText>
            <PlainText>
                총 포인트 : {numberWithComma(account.curPoint || 0)}AP
            </PlainText>
            <PlainText>출금 포인트 : </PlainText>
            <TextInput
                placeholder="금액을 적어주세요."
                keyboardType="number-pad"
                onChangeText={(text) => setWithdrawalPoint(text)}
                style={{ backgroundColor: "white" }}
            />
            <PlainText>출금 수수료 : 1,000AP</PlainText>
            <SubmitButton text="포인트 출금" onPress={onWithdrawal} />
        </View>
    );
}

WithdrawalPoint.propTypes = {};
export default WithdrawalPoint;
