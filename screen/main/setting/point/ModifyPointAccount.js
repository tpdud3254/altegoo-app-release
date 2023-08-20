import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import FormLayout from "../../../../component/layout/FormLayout";
import { useForm } from "react-hook-form";
import SubTitleText from "../../../../component/text/SubTitleText";
import { Picker } from "@react-native-picker/picker";
import TitleInputItem from "../../../../component/item/TitleInputItem";
import SubmitButton from "../../../../component/button/SubmitButton";

import axios from "axios";
import { SERVER } from "../../../../constant";
import { getAsyncStorageToken } from "../../../../utils";
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
    "KEB하나은행",
    "SC제일은행",
    "국민은행",
    "신한은행",
    "외환은행",
    "우리은행",
    "한국시티은행",
    "경남은행",
    "광주은행",
    "대구은행",
    "부산은행",
    "전북은행",
    "제주은행",
    "기업은행",
    "농협",
    "수협",
    "한국산업은행",
    "한국수출입은행",
];

function RegistPointAccount({ route, navigation }) {
    const [selectedBank, setSelectedBank] = useState(0);
    const { register, handleSubmit, setValue, watch } = useForm();

    console.log(route?.params);
    const nameRef = useRef();
    useEffect(() => {
        register("number");
        register("name");
    }, []);

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };

    const onValid = async ({ name, number }) => {
        if (selectedBank === 0 || name === "" || number === "") {
            return;
        }
        try {
            const response = await axios.post(
                SERVER + "/points/account/create",
                {
                    bank: bank[selectedBank],
                    accountName: name,
                    accountNumber: number,
                    pointId: route?.params?.account.id || null,
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
                        // onSelect={(index) =>
                        //     setValue("workCategory", index + 1)
                        // }
                    />
                </Wrapper>
                <Wrapper>
                    <TextInput
                        title="계좌 번호"
                        placeholder="- 빼고 숫자만 적어주세요."
                        returnKeyType="next"
                        keyboardType="number-pad"
                        // value={watch("companyName")}
                        // onChangeText={(text) => setValue("companyName", text)}
                        // onReset={() => setValue("companyName", "")}
                        // onSubmitEditing={() =>
                        //     companyPersonNameRef.current.setFocus()
                        // }
                    />
                </Wrapper>
                <Wrapper>
                    <TextInput
                        // ref={companyPersonNameRef}
                        title="예금주"
                        placeholder="예금주 이름을 적어주세요."
                        returnKeyType="done"
                        // value={watch("companyPersonName")}
                        // onChangeText={(text) =>
                        //     setValue("companyPersonName", text)
                        // }
                        // onReset={() => setValue("companyPersonName", "")}
                    />
                </Wrapper>
                <Button
                    // onPress={() => goToPage("RegistPointAccount")}
                    type="accent"
                    text="수정하기"
                />
            </Container>
        </Layout>
    );
}

RegistPointAccount.propTypes = {};
export default RegistPointAccount;
