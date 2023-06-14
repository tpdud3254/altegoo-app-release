import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import SubTitleText from "../../../../component/text/SubTitleText";
import MediumText from "../../../../component/text/MediumText";
import SubmitButton from "../../../../component/button/SubmitButton";
import UserContext from "../../../../context/UserContext";
import { getAsyncStorageToken, numberWithComma } from "../../../../utils";
import PlainButton from "../../../../component/button/PlainButton";
import axios from "axios";
import { SERVER } from "../../../../constant";
import { VALID } from "../../../../constant";
import { useIsFocused } from "@react-navigation/native";

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
    const [account, setAccount] = useState({});
    const [createAccountVisible, setCreateAccountVisible] = useState(false);
    const { info } = useContext(UserContext);
    const isFocused = useIsFocused();

    useEffect(() => {
        getMyPoint();
    }, [isFocused]);
    const goToPage = (page, data) => {
        navigation.navigate(page, data);
    };

    console.log(info);

    const getMyPoint = async () => {
        try {
            const response = await axios.get(SERVER + "/points/my", {
                headers: {
                    auth: await getAsyncStorageToken(),
                },
            });

            console.log(response.data);

            const {
                data: { result },
            } = response;

            if (result === VALID) {
                const {
                    data: {
                        data: { points },
                    },
                } = response;
                console.log("point info : ", points);
                setAccount(points);
                if (points.accountNumber) {
                    setCreateAccountVisible(false);
                } else {
                    setCreateAccountVisible(true);
                }
            } else {
                const {
                    data: { msg },
                } = response;

                console.log(msg);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {createAccountVisible ? (
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

                    <MediumText>
                        본인 및 예금주 성명이 일치하여야{"\n"}계좌등록이
                        가능합니다.
                    </MediumText>

                    <SubmitButton
                        text="계좌등록 하러가기"
                        onPress={() =>
                            goToPage("RegistPointAccount", { account: account })
                        }
                    />
                </View>
            ) : (
                <View>
                    <SubTitleText>{info.name}님의 포인트</SubTitleText>
                    <SubTitleText>
                        {numberWithComma(account.curPoint || 0)} AP
                    </SubTitleText>
                    <MediumText>
                        포인트 출금을 위해 정확한 계좌번호를 입력해주세요.
                    </MediumText>
                    <MediumText>
                        잘못된 계좌입력으로 정상출금이 되지 않을 경우 책임을
                        지지 않습니다.
                    </MediumText>
                    <PlainButton
                        text="계좌수정하기"
                        onPress={() =>
                            goToPage("ModifyPointAccount", { account: account })
                        }
                    />

                    <PlainButton
                        text="포인트 충전"
                        onPress={() =>
                            goToPage("ChargePoint", { account: account })
                        }
                    />

                    <PlainButton
                        text="포인트 출금"
                        onPress={() =>
                            goToPage("WithdrawalPoint", { account: account })
                        }
                    />

                    <PlainButton
                        text="포인트 사용내역"
                        // onPress={() => goToPage("PointBreakdown")}
                    />
                </View>
            )}
        </>
    );
}

PointMain.propTypes = {};
export default PointMain;
