import React, { useContext, useEffect, useState } from "react";
import { RadioButton } from "react-native-paper";
import styled from "styled-components/native";
import MainLayout from "../../../component/layout/MainLayout";
import PlainText from "../../../component/text/PlainText";
import { theme } from "../../../styles";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import VerticalDivider from "../../../component/divider/VerticalDivider";
import HorizontalDivider from "../../../component/divider/HorizontalDivider";
import PlainButton from "../../../component/button/PlainButton";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import RegistContext from "../../../context/RegistContext";
import KakaoButton, {
    ButtonContainer,
} from "../../../component/button/KakaoButton";
import { REGIST_NAV } from "../../../constant";
import UpIcon from "../../../component/icon/UpIcon";
import DownIcon from "../../../component/icon/DownIcon";

const Container = styled.View`
    flex: 1;
`;
const VehicleContainer = styled.View`
    background-color: white;
    border-radius: 10px;
    padding: 10px;
`;
const VehicleWrapper = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: space-evenly;
`;
const Radio = styled.TouchableOpacity`
    background-color: white;
    flex-direction: row;
    align-items: center;
`;

const TypeContainer = styled(VehicleContainer)`
    margin-top: 15px;
`;
const TypeWrapper = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
`;
const STypeButton = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: ${(props) => (props.selected ? "aliceblue" : "white")};
    padding: 5px 20px;
`;
const Icon = styled.View``;

const BothContainer = styled(TypeContainer)``;
const BothWrapper = styled.TouchableOpacity`
    padding: 10px;
    background-color: ${(props) => (props.selected ? "aliceblue" : "white")};
    margin: 5px 0px;
`;
const Both = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const HelpContainer = styled.View`
    flex-direction: row;
    margin-bottom: 10px;
    align-items: center;
`;

function SelectWorkType({ navigation }) {
    const { registInfo, setRegistInfo } = useContext(RegistContext);
    const [vehicleType, setVehicleType] = useState(null);
    const [upDown, setUpDown] = useState(null);
    const [both, setBoth] = useState(null);
    const [cur, setCur] = useState(-1);

    console.log(registInfo);
    useEffect(() => {
        if (registInfo.vehicleType) {
            setVehicleType(registInfo.vehicleType === 1 ? "사다리" : "스카이");
        }

        if (registInfo.upDown) {
            setUpDown(
                registInfo.upDown === "up"
                    ? "올림"
                    : registInfo.upDown === "down"
                    ? "내림"
                    : "양사"
            );
        }

        if (registInfo.bothType) {
            setBoth(both);
        }
    }, []);

    useEffect(() => {
        if (!vehicleType) {
            setCur(1);
        } else if (!upDown) {
            setCur(2);
        } else {
            if (upDown === "both" && !both) {
                setCur(3);
            } else {
                setCur(0);
            }
        }
    }, [vehicleType, upDown, both]);

    const onNextStep = () => {
        if (cur !== 0) {
            Toast.show({
                type: "errorToast",
                props: "모든 작업 유형 선택을 완료해주세요.",
            });
            return;
        }

        setRegistInfo({
            vehicleType: vehicleType === 1 ? "사다리" : "스카이",
            upDown:
                upDown === "up" ? "올림" : upDown === "down" ? "내림" : "양사",
            bothType: both,
            ...registInfo,
        });

        navigation.navigate(REGIST_NAV[1]);
    };

    const Help = ({ number, cur, text }) => (
        <HelpContainer>
            <MaterialCommunityIcons
                name={`numeric-${number}-circle-outline`}
                size={30}
                color={cur ? theme.sub.blue : "#777777"}
            />
            <PlainText
                style={{ marginLeft: 5, color: cur ? "black" : "#777777" }}
            >
                {text}
            </PlainText>
        </HelpContainer>
    );

    const TypeButton = ({ type, selected, onPress }) => (
        <STypeButton onPress={onPress} selected={selected}>
            {type === "both" ? (
                <Icon>
                    <UpIcon />
                    <DownIcon />
                </Icon>
            ) : (
                <Icon>{type === "up" ? <UpIcon /> : <DownIcon />}</Icon>
            )}

            <PlainText>
                {type === "up" ? "올림" : type === "down" ? "내림" : "양사"}
            </PlainText>
        </STypeButton>
    );

    return (
        <MainLayout>
            <Container>
                <VehicleContainer>
                    <Help
                        number="1"
                        cur={cur === 1}
                        text="'사다리', '스카이' 중 선택해주세요."
                    />
                    <RadioButton.Group
                        onValueChange={(newValue) => setVehicleType(newValue)}
                        value={vehicleType}
                    >
                        <VehicleWrapper>
                            <Radio>
                                <RadioButton value={1} color={theme.sub.blue} />
                                <PlainText>사다리</PlainText>
                            </Radio>
                            <Radio>
                                <RadioButton value={2} color={theme.sub.blue} />
                                <PlainText>스카이</PlainText>
                            </Radio>
                        </VehicleWrapper>
                    </RadioButton.Group>
                </VehicleContainer>
                <TypeContainer>
                    <Help
                        number="2"
                        cur={cur === 2}
                        text="작업 유형을 선택해주세요."
                    />
                    <TypeWrapper>
                        <TypeButton
                            type="down"
                            selected={upDown === "down"}
                            onPress={() => setUpDown("down")}
                        />
                        <VerticalDivider color="#dddddd" />
                        <TypeButton
                            type="up"
                            selected={upDown === "up"}
                            onPress={() => setUpDown("up")}
                        />
                        <VerticalDivider color="#dddddd" />
                        <TypeButton
                            type="both"
                            selected={upDown === "both"}
                            onPress={() => setUpDown("both")}
                        />
                    </TypeWrapper>
                </TypeContainer>
                {upDown === "both" ? (
                    <BothContainer>
                        <Help
                            number="3"
                            cur={cur === 3}
                            text="작업 순서를 선택해주세요."
                        />
                        <BothWrapper
                            onPress={() => setBoth(1)}
                            selected={both === 1}
                        >
                            <Both>
                                <DownIcon />
                                <PlainText>내림</PlainText>
                                <Feather
                                    name="chevrons-right"
                                    size={24}
                                    color="black"
                                    style={{ marginLeft: 10, marginRight: 10 }}
                                />
                                <UpIcon />
                                <PlainText>올림</PlainText>
                            </Both>
                        </BothWrapper>
                        <HorizontalDivider color="#dddddd" />
                        <BothWrapper
                            onPress={() => setBoth(2)}
                            selected={both === 2}
                        >
                            <Both>
                                <UpIcon />
                                <PlainText>올림</PlainText>
                                <Feather
                                    name="chevrons-right"
                                    size={24}
                                    color="black"
                                    style={{ marginLeft: 10, marginRight: 10 }}
                                />

                                <DownIcon />
                                <PlainText>내림</PlainText>
                            </Both>
                        </BothWrapper>
                    </BothContainer>
                ) : null}
            </Container>
            <ButtonContainer>
                <PlainButton
                    text="다음단계"
                    style={{ width: "80%" }}
                    onPress={onNextStep}
                />
                <KakaoButton />
            </ButtonContainer>
        </MainLayout>
    );
}

export default SelectWorkType;
