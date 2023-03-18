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
import { TextInput } from "react-native-paper";
import axios from "axios";
import { SERVER } from "../../../../server";
import { getAsyncStorageToken } from "../../../../utils";
import { VALID } from "../../../../constant";

const bank = [
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
        <FormLayout>
            <View>
                <Picker //TODO: Picker style
                    selectedValue={bank[selectedBank]}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedBank(itemIndex)
                    }
                    style={{
                        width: "100%",
                        backgroundColor: "#ffffffcc",
                        margin: 10,
                    }}
                >
                    {bank.map((value, index) => (
                        <Picker.Item
                            key={index}
                            label={value}
                            value={value}
                            style={{
                                fontSize: 18,
                            }}
                        />
                    ))}
                </Picker>
                <TitleInputItem title="계좌번호">
                    <TextInput
                        placeholder="숫자만 적어주세요"
                        keyboardType="number-pad"
                        returnKeyType="next"
                        onSubmitEditing={() => onNext(nameRef)}
                        onChangeText={(text) => setValue("number", text)}
                        style={{ backgroundColor: "white" }}
                    />
                </TitleInputItem>
                <TitleInputItem title="예금주">
                    <TextInput
                        placeholder="예금주"
                        returnKeyType="done"
                        onChangeText={(text) => setValue("name", text)}
                        style={{ backgroundColor: "white" }}
                    />
                </TitleInputItem>
            </View>
            <SubmitButton text="등록" onPress={handleSubmit(onValid)} />
        </FormLayout>
    );
}

RegistPointAccount.propTypes = {};
export default RegistPointAccount;
