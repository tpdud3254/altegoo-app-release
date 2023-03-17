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
import { TouchableOpacity } from "react-native";

const Container = styled.View`
    flex: 1;
`;

const Price = styled.View`
    align-items: flex-end;
    margin-bottom: 10px;
`;
const PriceButton = styled.TouchableOpacity``;

const FloorContainer = styled.View`
    background-color: white;
    border-radius: 10px;
    padding: 10px;
`;

const OtherFloorContainer = styled(FloorContainer)`
    margin-top: 15px;
`;
const HelpWrapper = styled.View`
    flex-direction: row;
`;

const FloorClass = styled.View`
    margin-top: 10px;
`;
const Class = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`;
const ClassButton = styled.TouchableOpacity`
    padding: 10px 35px;
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

function SelectFloor({ navigation }) {
    const { registInfo, setRegistInfo } = useContext(RegistContext);
    const [floorClass, setFloorClass] = useState(null);
    const [floorOtherClass, setFloorOtherClass] = useState(null);
    const [selectedFloor, setSelectedFloor] = useState(null);
    const [selectedOtherFloor, setSelectedOtherFloor] = useState(null);
    const [floorArr, setFloorArr] = useState([]);
    const [otherFloorArr, setOtherFloorArr] = useState([]);
    const [priceVisible, setPriceVisible] = useState(false);

    console.log("registInfo : ", registInfo);

    // useEffect(() => {
    //     if (registInfo.floor) {
    //         if (registInfo.floor < 7) {
    //             setFloorClass("row");
    //             setSelectedFloor(registInfo.floor - 1);
    //         } else if (registInfo.floor < 13) {
    //             setFloorClass("middle");
    //             setSelectedFloor(registInfo.floor - 7);
    //         } else {
    //             setFloorClass("high");
    //             setSelectedFloor(registInfo.floor - 13);
    //         }
    //     }

    //     if (registInfo.otherFloor) {
    //         if (registInfo.otherFloor < 7) {
    //             setFloorOtherClass("row");
    //             setSelectedOtherFloor(registInfo.otherFloor - 1);
    //         } else if (registInfo.otherFloor < 13) {
    //             setFloorOtherClass("middle");
    //             setSelectedOtherFloor(registInfo.otherFloor - 7);
    //         } else {
    //             setFloorOtherClass("high");
    //             setSelectedOtherFloor(registInfo.otherFloor - 13);
    //         }
    //     }
    // }, []);
    useEffect(() => {
        if (floorClass === "row") setFloorArr([1, 2, 3, 4, 5, 6]);
        else if (floorClass === "middle") {
            setFloorArr([7, 8, 9, 10, 11, 12]);
        } else {
            setFloorArr([13, 14, 15, 16, 17, 18]);
        }
    }, [floorClass]);

    useEffect(() => {
        if (floorOtherClass === "row") setOtherFloorArr([1, 2, 3, 4, 5, 6]);
        else if (floorOtherClass === "middle") {
            setOtherFloorArr([7, 8, 9, 10, 11, 12]);
        } else {
            setOtherFloorArr([13, 14, 15, 16, 17, 18]);
        }
    }, [floorOtherClass]);

    const getHelpText = (upDown) => {
        if (upDown === "양사") {
            if (registInfo.bothType === 1) return "내림";
            else return "올림";
        } else {
            return upDown;
        }
    };

    const showModal = () => setPriceVisible(true);
    const hideModal = () => setPriceVisible(false);

    const onNextStep = () => {
        console.log(selectedFloor);
        console.log(selectedOtherFloor);
        if (registInfo.upDown === "양사") {
            if (
                (!selectedFloor ||
                    floorArr.length < 1 ||
                    !floorArr[selectedFloor] ||
                    !selectedOtherFloor ||
                    otherFloorArr.length < 1 ||
                    !otherFloorArr[selectedOtherFloor]) &&
                selectedFloor !== 0 &&
                selectedOtherFloor !== 0
            ) {
                Toast.show({
                    type: "errorToast",
                    props: "층수를 선택해주세요.",
                });
                return;
            }

            setRegistInfo({
                floor: floorArr[selectedFloor],
                otherFloor: otherFloorArr[selectedOtherFloor],
                ...registInfo,
            });
        } else {
            if (
                (!selectedFloor ||
                    floorArr.length < 1 ||
                    !floorArr[selectedFloor]) &&
                selectedFloor !== 0
            ) {
                Toast.show({
                    type: "errorToast",
                    props: "층수를 선택해주세요.",
                });
                return;
            }

            setRegistInfo({
                floor: floorArr[selectedFloor],
                otherFloor: null,
                ...registInfo,
            });
        }

        navigation.navigate(REGIST_NAV[4]);
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

    const Radio = ({ index, other }) => (
        <SRadio>
            <RadioButton value={index} color={theme.sub.blue} />
            <PlainText>
                {other ? otherFloorArr[index] : floorArr[index]}층
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
                    <FloorContainer>
                        <Help
                            number="1"
                            text={`'${getHelpText(
                                registInfo.upDown
                            )}' 층수 선택하기`}
                        />
                        <FloorClass>
                            <Class>
                                <ClassButton
                                    onPress={() => setFloorClass("row")}
                                    selected={floorClass === "row"}
                                >
                                    <PlainText>저층</PlainText>
                                </ClassButton>
                                <VerticalDivider color="#777777" />
                                <ClassButton
                                    onPress={() => setFloorClass("middle")}
                                    selected={floorClass === "middle"}
                                >
                                    <PlainText>중층</PlainText>
                                </ClassButton>
                                <VerticalDivider color="#777777" />
                                <ClassButton
                                    onPress={() => setFloorClass("high")}
                                    selected={floorClass === "high"}
                                >
                                    <PlainText>고층</PlainText>
                                </ClassButton>
                            </Class>
                            {floorClass ? (
                                <RadioButton.Group
                                    onValueChange={(newValue) =>
                                        setSelectedFloor(newValue)
                                    }
                                    value={selectedFloor}
                                >
                                    <RadioContainer>
                                        <RadioWrapper>
                                            <Radio index={0} />
                                            <Radio index={1} />
                                            <Radio index={2} />
                                        </RadioWrapper>
                                        <RadioWrapper>
                                            <Radio index={3} />
                                            <Radio index={4} />
                                            <Radio index={5} />
                                        </RadioWrapper>
                                    </RadioContainer>
                                </RadioButton.Group>
                            ) : null}
                        </FloorClass>
                    </FloorContainer>

                    {registInfo.upDown === "양사" ? (
                        <OtherFloorContainer>
                            <Help
                                number="2"
                                text={`'${
                                    getHelpText(registInfo.upDown) === "내림"
                                        ? "올림"
                                        : "내림"
                                }' 층수 선택하기`}
                            />
                            <FloorClass>
                                <Class>
                                    <ClassButton
                                        onPress={() =>
                                            setFloorOtherClass("row")
                                        }
                                        selected={floorOtherClass === "row"}
                                    >
                                        <PlainText>저층</PlainText>
                                    </ClassButton>
                                    <VerticalDivider color="#777777" />
                                    <ClassButton
                                        onPress={() =>
                                            setFloorOtherClass("middle")
                                        }
                                        selected={floorOtherClass === "middle"}
                                    >
                                        <PlainText>중층</PlainText>
                                    </ClassButton>
                                    <VerticalDivider color="#777777" />
                                    <ClassButton
                                        onPress={() =>
                                            setFloorOtherClass("high")
                                        }
                                        selected={floorOtherClass === "high"}
                                    >
                                        <PlainText>고층</PlainText>
                                    </ClassButton>
                                </Class>
                                {floorOtherClass ? (
                                    <RadioButton.Group
                                        onValueChange={(newValue) =>
                                            setSelectedOtherFloor(newValue)
                                        }
                                        value={selectedOtherFloor}
                                    >
                                        <RadioContainer>
                                            <RadioWrapper>
                                                <Radio index={0} other />
                                                <Radio index={1} other />
                                                <Radio index={2} other />
                                            </RadioWrapper>
                                            <RadioWrapper>
                                                <Radio index={3} other />
                                                <Radio index={4} other />
                                                <Radio index={5} other />
                                            </RadioWrapper>
                                        </RadioContainer>
                                    </RadioButton.Group>
                                ) : null}
                            </FloorClass>
                        </OtherFloorContainer>
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
            </Provider>
        </MainLayout>
    );
}

export default SelectFloor;
