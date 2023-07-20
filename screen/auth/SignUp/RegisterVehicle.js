import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { color } from "../../../styles";
import { SIGNUP_NAV } from "../../../constant";
import AuthLayout from "../../../component/layout/AuthLayout";
import RegularText from "../../../component/text/RegularText";
import { useWindowDimensions } from "react-native";
import { Radio } from "../../../component/radio/Radio";
import { RadioContainer } from "../../../component/radio/RadioContainer";
import TextInput from "../../../component/input/TextInput";
import { useForm } from "react-hook-form";
import { CheckValidation } from "../../../utils";

const Container = styled.View`
    justify-content: space-between;
    height: ${(props) => props.height - 200}px;
    max-width: 400px;
`;

const Wrapper = styled.View`
    margin-top: 40px;
`;

const Item = styled.View`
    margin-bottom: 25px;
`;

const SkipButton = styled.TouchableOpacity`
    align-items: center;
`;

const vehicleType = ["사다리차", "스카이차"];
const floor = ["1층", "10층", "50층", "100층"]; //TODO: 정책 정하기

function RegisterVehicle() {
    const navigation = useNavigation();
    const { height: windowHeight } = useWindowDimensions();
    const { info, setInfo } = useContext(UserContext);
    const { register, setValue, watch, getValues, handleSubmit } = useForm();

    const [validation, setValidation] = useState(false);

    useEffect(() => {
        console.log(info);
        register("vehicleType");
        register("vehicleNumber");
        register("floor");
    }, []);

    useEffect(() => {
        if (CheckValidation(getValues())) {
            setValidation(true);
        } else {
            setValidation(false);
        }
    }, [getValues()]);

    const onNext = (data) => {
        const { vehicleType, vehicleNumber, floor } = data;

        const vehicle = {};

        if (data.skip) {
            vehicle.type = "";
            vehicle.number = "";
            vehicle.floor = "";
        } else {
            vehicle.type = vehicleType;
            vehicle.number = vehicleNumber;
            vehicle.floor = floor;
        }

        setInfo({ ...info, vehicle });

        const curNavIndex =
            SIGNUP_NAV[info.userType].indexOf("RegisterVehicle");
        navigation.navigate(SIGNUP_NAV[info.userType][curNavIndex + 1]);
    };

    const Title = ({ children }) => (
        <RegularText
            style={{
                fontSize: 17,
                marginBottom: 5,
            }}
        >
            {children}
        </RegularText>
    );
    return (
        <AuthLayout
            bottomButtonProps={{
                title: "다음으로",
                onPress: handleSubmit(onNext),
                disabled: !validation,
            }}
        >
            <Container height={windowHeight}>
                <Wrapper>
                    <Item>
                        <Title>차량 종류를 선택하세요.</Title>
                        <RadioContainer>
                            {vehicleType.map((value, index) => (
                                <Radio
                                    value={value}
                                    selected={
                                        watch("vehicleType") === index + 1
                                    }
                                    onSelect={() =>
                                        setValue("vehicleType", index + 1)
                                    }
                                />
                            ))}
                        </RadioContainer>
                    </Item>
                    <Item>
                        <Title>최대 작업 층수</Title>
                        <RadioContainer>
                            {floor.map((value, index) => (
                                <Radio
                                    value={value}
                                    selected={watch("floor") === index + 1}
                                    onSelect={() =>
                                        setValue("floor", index + 1)
                                    }
                                />
                            ))}
                        </RadioContainer>
                    </Item>
                    <Item>
                        <Title>차량번호</Title>
                        <TextInput
                            placeholder="12가1234"
                            returnKeyType="done"
                            value={watch("vehicleNumber")}
                            onChangeText={(text) =>
                                setValue("vehicleNumber", text)
                            }
                            onReset={() => setValue("vehicleNumber", "")}
                        />
                    </Item>
                </Wrapper>
                <SkipButton onPress={() => onNext({ skip: true })}>
                    <RegularText
                        style={{
                            fontSize: 16,
                            color: color["page-color-text"],
                            textDecorationLine: "underline",
                        }}
                    >
                        다음에 할게요
                    </RegularText>
                </SkipButton>
            </Container>
        </AuthLayout>
    );
}

export default RegisterVehicle;
