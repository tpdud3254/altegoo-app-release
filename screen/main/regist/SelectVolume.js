import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import KakaoButton, {
    ButtonContainer,
} from "../../../component/button/KakaoButton";
import PlainButton from "../../../component/button/PlainButton";
import MainLayout from "../../../component/layout/MainLayout";
import PlainText from "../../../component/text/PlainText";
import RegistContext from "../../../context/RegistContext";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { theme } from "../../../styles";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { REGIST_NAV } from "../../../constant";
import VerticalDivider from "../../../component/divider/VerticalDivider";
import { RadioButton } from "react-native-paper";
import { Modal, Portal, Provider } from "react-native-paper";
import SubTitleText from "../../../component/text/SubTitleText";
import { TouchableOpacity, View } from "react-native";

const Container = styled.View`
    flex: 1;
`;

const Price = styled.View`
    align-items: flex-end;
    margin-bottom: 10px;
`;
const PriceButton = styled.TouchableOpacity``;

const TypeContainer = styled.View`
    background-color: white;
    border-radius: 10px;
    padding: 10px;
`;

const HelpWrapper = styled.View`
    flex-direction: row;
`;

const Types = styled.View`
    margin-top: 10px;
`;
const Type = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`;
const TypeButton = styled.TouchableOpacity`
    padding: 10px 65px;
    background-color: ${(props) => (props.selected ? "aliceblue" : "white")};
`;

const RadioContainer = styled.View`
    padding: 10px 0px;
    margin-top: 10px;
    border: 1px solid ${theme.boxColor};
`;
const RadioWrapper = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
`;
const SRadio = styled.View`
    flex-direction: row;
    align-items: center;
`;

const modalStyle = {
    backgroundColor: "white",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    alignItems: "center",
};

const ModalTop = styled.View`
    width: 100%;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 20px;
    justify-content: space-between;
`;
const ModalTitle = styled.View`
    flex-direction: row;
    align-items: center;
`;
const modalTitleStyle = { marginLeft: 5, marginRight: 5 };

const quantityArr = [
    "1톤 이하 (단품)",
    "1톤 ~ 5톤",
    "5톤",
    "6톤",
    "7.5톤",
    "10톤",
];
const timeArr = ["1시간", "추가 1시간 당", "반나절", "하루"];

function SelectVolume({ navigation }) {
    const { registInfo, setRegistInfo } = useContext(RegistContext);
    const [type, setType] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [time, setTime] = useState(null);
    const [priceVisible, setPriceVisible] = useState(false);

    console.log("registInfo : ", registInfo);

    useEffect(() => {
        if (registInfo.volumeType) {
            setType(registInfo.volumeType);
            if (registInfo.volumeType === "quantity") {
                setQuantity(registInfo.quantity);
            } else {
                setTime(registInfo.time);
            }
        }
    }, []);
    const showModal = () => setPriceVisible(true);
    const hideModal = () => setPriceVisible(false);

    const onNextStep = () => {
        if (registInfo.upDown !== "양사") {
            if (!type) {
                Toast.show({
                    type: "errorToast",
                    props: "물량 또는 시간을 선택해주세요.",
                });
                return;
            }

            if (type === "quantity") {
                if (!quantity && quantity !== 0) {
                    Toast.show({
                        type: "errorToast",
                        props: "물량을 선택해주세요.",
                    });
                    return;
                }

                setRegistInfo({
                    volumeType: type,
                    quantity: quantityArr[quantity],
                    ...registInfo,
                });
            } else {
                if (!time && time !== 0) {
                    Toast.show({
                        type: "errorToast",
                        props: "시간을 선택해주세요.",
                    });
                    return;
                }

                setRegistInfo({
                    volumeType: type,
                    time: timeArr[time],
                    ...registInfo,
                });
            }
        } else {
            if (!quantity && quantity !== 0) {
                Toast.show({
                    type: "errorToast",
                    props: "물량을 선택해주세요.",
                });
                return;
            }

            setRegistInfo({
                volumeType: "quantity",
                quantity: quantityArr[quantity],
                ...registInfo,
            });
        }
        navigation.navigate(REGIST_NAV[5]);
    };

    const Help = ({ number, text }) => (
        <HelpWrapper>
            <MaterialCommunityIcons
                name={`numeric-${number}-circle-outline`}
                size={30}
                color="#777777"
            />
            <PlainText style={{ marginLeft: 5, color: "#777777" }}>
                {text}
            </PlainText>
        </HelpWrapper>
    );

    const Radio = ({ index }) => (
        <SRadio>
            <RadioButton value={index} color={theme.sub.blue} />
            <PlainText>
                {type === "time" ? timeArr[index] : quantityArr[index]}
            </PlainText>
        </SRadio>
    );

    const PriceModal = () => (
        <Portal>
            <Modal
                visible={priceVisible}
                onDismiss={hideModal}
                contentContainerStyle={modalStyle}
            >
                <ModalTop>
                    <Ionicons name="close" size={30} color="white" />
                    <ModalTitle>
                        <Ionicons
                            name="alert-circle-outline"
                            size={30}
                            color={theme.sub.yellow}
                        />
                        <SubTitleText style={modalTitleStyle}>
                            가격 안내
                        </SubTitleText>
                        <Ionicons
                            name="alert-circle-outline"
                            size={30}
                            color={theme.sub.yellow}
                        />
                    </ModalTitle>
                    <TouchableOpacity
                        style={{ marginTop: -10, marginRight: -10 }}
                        onPress={hideModal}
                    >
                        <Ionicons name="close" size={30} color="black" />
                    </TouchableOpacity>
                </ModalTop>
                <PlainText>가격안내</PlainText>
            </Modal>
        </Portal>
    );

    return (
        <MainLayout>
            <Provider>
                <PriceModal />
                <Container>
                    <Price>
                        <PriceButton onPress={showModal}>
                            <PlainText
                                style={{
                                    fontSize: 18,
                                    textDecorationLine: "underline",
                                    color: "#777",
                                }}
                            >
                                가격보기
                            </PlainText>
                        </PriceButton>
                    </Price>
                    <TypeContainer>
                        <Help
                            number="1"
                            text={
                                registInfo.upDown !== "양사"
                                    ? "물량 또는 시간을 선택해주세요."
                                    : "물량을 선택해주세요."
                            }
                        />
                        {registInfo.upDown !== "양사" ? (
                            <Types>
                                <Type>
                                    <TypeButton
                                        onPress={() => setType("quantity")}
                                        selected={type === "quantity"}
                                    >
                                        <PlainText>물량</PlainText>
                                    </TypeButton>
                                    <VerticalDivider color="#777777" />
                                    <TypeButton
                                        onPress={() => setType("time")}
                                        selected={type === "time"}
                                    >
                                        <PlainText>시간</PlainText>
                                    </TypeButton>
                                </Type>
                                {type ? (
                                    type === "quantity" ? (
                                        <RadioButton.Group
                                            onValueChange={(newValue) =>
                                                setQuantity(newValue)
                                            }
                                            value={quantity}
                                        >
                                            <RadioContainer>
                                                <RadioWrapper>
                                                    <Radio index={0} />
                                                    <Radio index={1} />
                                                </RadioWrapper>
                                                <RadioWrapper>
                                                    <Radio index={2} />
                                                    <Radio index={3} />
                                                </RadioWrapper>
                                                <RadioWrapper>
                                                    <Radio index={4} />
                                                    <Radio index={5} />
                                                </RadioWrapper>
                                            </RadioContainer>
                                        </RadioButton.Group>
                                    ) : (
                                        <RadioButton.Group
                                            onValueChange={(newValue) =>
                                                setTime(newValue)
                                            }
                                            value={time}
                                        >
                                            <RadioContainer>
                                                <RadioWrapper>
                                                    <Radio index={0} />
                                                    <Radio index={1} />
                                                </RadioWrapper>
                                                <RadioWrapper>
                                                    <Radio index={2} />
                                                    <Radio index={3} />
                                                </RadioWrapper>
                                            </RadioContainer>
                                        </RadioButton.Group>
                                    )
                                ) : null}
                            </Types>
                        ) : (
                            <View>
                                <RadioButton.Group
                                    onValueChange={(newValue) =>
                                        setQuantity(newValue)
                                    }
                                    value={quantity}
                                >
                                    <RadioContainer>
                                        <RadioWrapper>
                                            <Radio index={0} />
                                            <Radio index={1} />
                                        </RadioWrapper>
                                        <RadioWrapper>
                                            <Radio index={2} />
                                            <Radio index={3} />
                                        </RadioWrapper>
                                        <RadioWrapper>
                                            <Radio index={4} />
                                            <Radio index={5} />
                                        </RadioWrapper>
                                    </RadioContainer>
                                </RadioButton.Group>
                            </View>
                        )}
                    </TypeContainer>
                </Container>
                <ButtonContainer>
                    <PlainButton
                        text="다음단계"
                        style={{ width: "80%" }}
                        onPress={onNextStep}
                    />
                    <KakaoButton />
                </ButtonContainer>
            </Provider>
        </MainLayout>
    );
}

export default SelectVolume;
