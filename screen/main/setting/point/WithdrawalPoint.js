import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import PropTypes, { number } from "prop-types";
import { Text, View } from "react-native";
import MediumText from "../../../../component/text/MediumText";
import { numberWithComma } from "../../../../utils";
import SubmitButton from "../../../../component/button/SubmitButton";
import { TextInput } from "react-native-paper";
import axios from "axios";
import { SERVER } from "../../../../constant";
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
            <MediumText>은행명 : {account.bank}</MediumText>
            <MediumText>계좌번호 : {account.accountNumber}</MediumText>
            <MediumText>예금주 : {account.accountName}</MediumText>
            <MediumText>
                총 포인트 : {numberWithComma(account.curPoint || 0)}AP
            </MediumText>
            <MediumText>출금 포인트 : </MediumText>
            <TextInput
                placeholder="금액을 적어주세요."
                keyboardType="number-pad"
                onChangeText={(text) => setWithdrawalPoint(text)}
                style={{ backgroundColor: "white" }}
            />
            <MediumText>출금 수수료 : 1,000AP</MediumText>
            <SubmitButton text="포인트 출금" onPress={onWithdrawal} />
        </View>
    );
}

WithdrawalPoint.propTypes = {};
export default WithdrawalPoint;
