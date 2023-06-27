import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { color } from "../../../styles";
import { COMPANY, DRIVER, NORMAL, SIGNUP_NAV } from "../../../constant";
import AuthLayout from "../../../component/layout/AuthLayout";
import RegularText from "../../../component/text/RegularText";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import MediumText from "../../../component/text/MediumText";
import { View, useWindowDimensions } from "react-native";
import { Radio } from "../../../component/radio/Radio";
import { RadioContainer } from "../../../component/radio/RadioContainer";
import TextInput from "../../../component/input/TextInput";

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
const floor = ["1층", "10층", "50층", "100층"];
function RegisterVehicle() {
    const navigation = useNavigation();
    const { info, setInfo } = useContext(UserContext);
    const { height: windowHeight } = useWindowDimensions();
    const [selectedVehicleType, setSelectedVehicleType] = useState(0);
    const [selectedFloor, setSelectedFloor] = useState(0);

    const onNext = () => {
        // if (type === "") {
        //     Toast.show({
        //         type: "errorToast",
        //         props: "회원 유형을 선택해 주세요.",
        //     });
        //     return;
        // }
        // const data = {
        //     userType: type,
        // };
        // setInfo(data);
        // navigation.navigate("SignUpStep1");
        const curNavIndex =
            SIGNUP_NAV[info.userType].indexOf("RegisterVehicle");
        navigation.navigate(SIGNUP_NAV[info.userType][curNavIndex + 1]);
    };

    const Title = ({ children }) => (
        <RegularText
            style={{
                fontSize: 17,
                color: color["page-black-text"],
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
                onPress: onNext,
                disabled: true,
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
                                    selected={selectedVehicleType === index}
                                    onSelect={() =>
                                        setSelectedVehicleType(index)
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
                                    selected={selectedFloor === index}
                                    onSelect={() => setSelectedFloor(index)}
                                />
                            ))}
                        </RadioContainer>
                    </Item>
                    <Item>
                        <Title>차량번호</Title>
                        <TextInput placeholder="12가1234" />
                    </Item>
                </Wrapper>
                <SkipButton>
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
