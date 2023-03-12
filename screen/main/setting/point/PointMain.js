import React, { useContext } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import SubTitleText from "../../../../component/text/SubTitleText";
import PlainText from "../../../../component/text/PlainText";
import SubmitButton from "../../../../component/button/SubmitButton";
import UserContext from "../../../../context/UserContext";
import { numberWithComma } from "../../../../utils";
import PlainButton from "../../../../component/button/PlainButton";

const point = {
    accountName: null,
    accountNumber: null,
    accruedPoint: 0,
    addPoint: 0,
    bank: null,
    curPoint: 0,
    id: 56,
    subtractPoint: 0,
    userId: 56,
    withdrawalPoint: 0,
};
function PointMain({ navigation }) {
    const { info } = useContext(UserContext);
    const goToPage = (page, data) => {
        navigation.navigate(page, data);
    };

    console.log(info);
    return (
        <>
            {false ? (
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <SubTitleText>
                        계좌 정보가 등록되지 않았습니다.
                    </SubTitleText>
                    <SubTitleText>
                        본인 명의의 계좌정보를 등록해 주시기 바랍니다.
                    </SubTitleText>

                    <PlainText>
                        본인 및 예금주 성명이 일치하여야{"\n"}계좌등록이
                        가능합니다.
                    </PlainText>

                    <SubmitButton
                        text="계좌등록 하러가기"
                        onPress={() => goToPage("RegistPointAccount")}
                    />
                </View>
            ) : (
                <View>
                    <SubTitleText>{info.name}님의 포인트</SubTitleText>
                    <SubTitleText>
                        {numberWithComma(point.curPoint)} AP
                    </SubTitleText>
                    <PlainText>
                        포인트 출금을 위해 정확한 계좌번호를 입력해주세요.
                    </PlainText>
                    <PlainText>
                        잘못된 계좌입력으로 정상출금이 되지 않을 경우 책임을
                        지지 않습니다.
                    </PlainText>
                    <PlainButton
                        text="계좌수정하기"
                        onPress={() => goToPage("ModifyPointAccount")}
                    />

                    <PlainButton
                        text="포인트 충전"
                        onPress={() => goToPage("ChargePoint")}
                    />

                    <PlainButton
                        text="포인트 출금"
                        onPress={() => goToPage("WithdrawalPoint")}
                    />

                    <PlainButton
                        text="포인트 사용내역"
                        onPress={() => goToPage("PointBreakdown")}
                    />
                </View>
            )}
        </>
    );
}

PointMain.propTypes = {};
export default PointMain;
