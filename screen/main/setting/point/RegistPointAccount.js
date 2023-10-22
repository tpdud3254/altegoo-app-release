import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SERVER } from "../../../../constant";
import {
    CheckValidation,
    getAsyncStorageToken,
    showErrorMessage,
} from "../../../../utils";
import { VALID } from "../../../../constant";
import Layout from "../../../../component/layout/Layout";
import SelectBox from "../../../../component/selectBox/SelectBox";
import TextInput from "../../../../component/input/TextInput";
import Button from "../../../../component/button/Button";

const Container = styled.View`
    margin-top: 30px;
    margin-bottom: 10px;
`;

const Wrapper = styled.View`
    margin-bottom: 25px;
`;

const BANK_LIST = [
    "은행 선택",
    "KB국민은행",
    "신한은행",
    "우리은행",
    "KEB하나은행",
    "SC제일은행",
    "한국씨티은행",
    "케이뱅크은행",
    "카카오뱅크",
    "토스뱅크",
    "NH농협은행",
    "수협은행",
    "기업은행",
    "대구은행",
    "부산은행",
    "경남은행",
    "광주은행",
    "전북은행",
    "제주은행",
    "새마을금고",
    "신협",
    "우체국",
];

function RegistPointAccount({ route, navigation }) {
    const { register, handleSubmit, setValue, watch, getValues } = useForm();

    const [validation, setValidation] = useState(false);

    const nameRef = useRef();
    useEffect(() => {
        register("bank");
        register("accountName");
        register("accountNumber");
    }, []);

    useEffect(() => {
        if (CheckValidation(getValues())) {
            setValidation(true);
        } else {
            setValidation(false);
        }
    }, [getValues()]);

    const onNext = async (data) => {
        const { bank, accountName, accountNumber } = data;

        if (!validation) {
            showErrorMessage("계좌 정보를 입력해주세요.");
            return;
        }

        try {
            const response = await axios.post(
                SERVER + "/points/account/create",
                {
                    bank: BANK_LIST[bank - 1],
                    accountName,
                    accountNumber,
                    pointId: route?.params?.pointId,
                },
                {
                    headers: {
                        auth: await getAsyncStorageToken(),
                    },
                }
            );

            console.log(response.data);

            const {
                data: { result },
            } = response;

            if (result === VALID) {
                const {
                    data: {
                        data: { account },
                    },
                } = response;

                navigation.goBack();
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
        <Layout>
            <Container>
                <Wrapper>
                    <SelectBox
                        title="은행 선택"
                        placeholder="은행을 선택하세요."
                        data={BANK_LIST}
                        onSelect={(index) => setValue("bank", index + 1)}
                    />
                </Wrapper>
                <Wrapper>
                    <TextInput
                        title="계좌 번호"
                        placeholder="- 빼고 숫자만 적어주세요."
                        returnKeyType="next"
                        keyboardType="number-pad"
                        value={watch("accountNumber")}
                        onChangeText={(text) => setValue("accountNumber", text)}
                        onReset={() => setValue("accountNumber", "")}
                        onSubmitEditing={() => nameRef.current.setFocus()}
                    />
                </Wrapper>
                <Wrapper>
                    <TextInput
                        ref={nameRef}
                        title="예금주"
                        placeholder="예금주 이름을 적어주세요."
                        returnKeyType="done"
                        value={watch("accountName")}
                        onChangeText={(text) => setValue("accountName", text)}
                        onReset={() => setValue("accountName", "")}
                    />
                </Wrapper>
                <Button
                    onPress={handleSubmit(onNext)}
                    type="accent"
                    text={
                        route?.params?.type === "modify"
                            ? "수정하기"
                            : "등록하기"
                    }
                />
            </Container>
        </Layout>
    );
}

RegistPointAccount.propTypes = {};
export default RegistPointAccount;
