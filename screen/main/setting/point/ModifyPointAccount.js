import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, TextInput, View } from "react-native";
import FormLayout from "../../../../component/layout/FormLayout";
import { useForm } from "react-hook-form";
import SubTitleText from "../../../../component/text/SubTitleText";
import { Picker } from "@react-native-picker/picker";
import TitleInputItem from "../../../../component/item/TitleInputItem";
import SubmitButton from "../../../../component/button/SubmitButton";

const bank = ["은행 선택", "우리은행", "국민은행", "기업은행"];

function ModifyPointAccount() {
    const [selectedBank, setSelectedBank] = useState(0);
    const { register, handleSubmit, setValue, watch } = useForm();

    const nameRef = useRef();
    useEffect(() => {
        register("number");
        register("name");
    }, []);

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };

    const onValid = (data) => {
        console.log(data);
    };

    const onClose = () => {};
    return (
        <FormLayout>
            <Picker //TODO: Picker style
                selectedValue={bank[selectedBank]}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedBank(itemIndex, index)
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
                />
            </TitleInputItem>
            <TitleInputItem title="예금주">
                <TextInput
                    placeholder="예금주"
                    returnKeyType="done"
                    onChangeText={(text) => setValue("name", text)}
                />
            </TitleInputItem>
            <SubmitButton text="등록" onPress={handleSubmit(onValid)} />
            <SubmitButton text="취소" onPress={onClose} />
        </FormLayout>
    );
}

ModifyPointAccount.propTypes = {};
export default ModifyPointAccount;
