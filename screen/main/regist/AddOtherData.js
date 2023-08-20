import React, { useContext, useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    TextInput as RNTextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import styled from "styled-components/native";
import MainLayout from "../../../component/layout/MainLayout";
import MediumText from "../../../component/text/MediumText";
import RegistContext from "../../../context/RegistContext";
import UserContext from "../../../context/UserContext";
import { color } from "../../../styles";
import {
    GetDate,
    GetDayOfWeek,
    GetTime,
    numberWithComma,
} from "../../../utils";
import Checkbox from "expo-checkbox";
import { useForm } from "react-hook-form";
import { REGIST_NAV } from "../../../constant";
import Layout from "../../../component/layout/Layout";
import BoldText from "../../../component/text/BoldText";
import RegularText from "../../../component/text/RegularText";
import TextInput, * as Input from "../../../component/input/TextInput";

const Container = styled.View``;
const SRow = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`;
const STitle = styled.View`
    width: 25%;
    align-items: center;
`;

const SContent = styled.View`
    width: 75%;
    border: ${(props) =>
            props.borderLine || props.inputBorderLine ? "0px" : "1px"}
        solid ${color.border};
    padding: 5px;
    background-color: ${(props) => (props.background ? "white" : "")};
`;

const Row = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Item = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: ${(props) => (props.uninterval ? 8 : 15)}px;
`;

const TitleWrapper = styled.View`
    width: 25%;
`;
const Wrapper = styled.View`
    width: 75%;
`;

const Content = styled.View`
    background-color: ${color.btnDefault};
    border: 1px solid ${color["box-border"]};
    padding-top: ${(props) => (props.unpadded ? 6 : 10)}px;
    padding-bottom: ${(props) => (props.unpadded ? 6 : 10)}px;
    padding-left: 17px;
    padding-right: 5px;
    border-radius: 15px;
    justify-content: center;
`;
const Emergency = styled.View`
    align-items: center;
    margin-top: -5px;
`;

const ButtonContainer = styled.View`
    align-items: center;
`;
const Button = styled.TouchableOpacity`
    background-color: ${color.sub.blue};
    width: 100px;
    align-items: center;
    border-radius: 5px;
    margin-top: 15px;
    margin-bottom: 10px;
    padding: 10px;
`;

const BottomButtonContainer = styled.View`
    flex-direction: row;
`;

const EmergencyButton = styled.TouchableOpacity`
    flex-direction: row;
    background-color: ${color["box-color-background"]};
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 60px;
`;
const NormalButton = styled.TouchableOpacity`
    background-color: ${color["button-accent-background"]};
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 60px;
`;
function AddOtherData({ navigation }) {
    const { registInfo, setRegistInfo } = useContext(RegistContext);
    const { info } = useContext(UserContext);
    const [price, setPrice] = useState(0);
    const [emergencyOrder, setEmergencyOrder] = useState(false);
    const [isDirectPhone, setIsDirectPhone] = useState(false);
    const { setValue, register, handleSubmit } = useForm();
    console.log("registInfo : ", registInfo);

    useEffect(() => {
        register("directPhone");
        register("memo");
    }, []);

    useEffect(() => {
        if (isDirectPhone) {
            setValue("directPhone", info.phone);
        } else {
            setValue("directPhone", null);
        }
    }, [isDirectPhone]);

    useEffect(() => {
        setPrice(60000);
        if (emergencyOrder) {
            setPrice((prev) => prev + prev * 0.2);
        }
    }, [emergencyOrder]);

    const getWorkType = () => {
        const info = registInfo;

        let text = "";
        if (info.upDown !== "양사") {
            text = `${info.vehicleType} / ${info.upDown}`;
        } else {
            text = `${info.vehicleType} / ${info.upDown} (${
                info.bothType === 1 ? "내림 > 올림" : "올림 > 내림"
            })`;
        }

        return text;
    };

    const getWorkTime = () => {
        const getDay = (index) => {
            switch (index) {
                case 0:
                    return "일";
                case 1:
                    return "월";
                case 2:
                    return "화";
                case 3:
                    return "수";
                case 4:
                    return "목";
                case 5:
                    return "금";
                case 6:
                    return "토";

                default:
                    break;
            }
        };
        const info = registInfo;
        const workTime = new Date(info.dateTime);
        let text = `${workTime.getFullYear()}년 ${
            workTime.getMonth() + 1 < 10
                ? "0" + (workTime.getMonth() + 1)
                : workTime.getMonth() + 1
        }월 ${
            workTime.getDate() < 10
                ? "0" + workTime.getDate()
                : workTime.getDate()
        }일 (${getDay(workTime.getDay())}) ${
            workTime.getHours() < 10
                ? "0" + workTime.getHours()
                : workTime.getHours()
        }:${
            workTime.getMinutes() < 10
                ? "0" + workTime.getMinutes()
                : workTime.getMinutes()
        }`;

        return text;
    };

    const getWorkFloor = () => {
        const info = registInfo;

        let text = "";

        if (info.upDown === "양사") {
            text = `${info.floor}층(${
                info.bothType === 1 ? "내림" : "올림"
            }) > ${info.otherFloor}층(${
                info.bothType === 1 ? "올림" : "내림"
            })`;
        } else {
            text = `${info.floor}층`;
        }

        return text;
    };

    const getPrice = () => {
        //TODO: 작업비용
        return `${numberWithComma(price)} AP`;
    };

    const getPoint = () => {
        return `${numberWithComma(price * 0.15)} AP`;
    };

    const onNextStep = ({ directPhone, memo }) => {
        // const point = price * 0.15;

        // setRegistInfo({
        //     price,
        //     point,
        //     memo: memo || null,
        //     directPhone: directPhone || info.phone,
        //     emergency: emergencyOrder,
        //     ...registInfo,
        // });

        navigation.navigate(REGIST_NAV[4]);
    };

    // const Row = ({ title, content, view }) => (
    //     <SRow>
    //         <STitle>
    //             <RegularText>{title}</RegularText>
    //         </STitle>
    //         {view ? (
    //             view
    //         ) : (
    //             <SContent>
    //                 <MediumText style={{ fontSize: 18 }}>{content}</MediumText>
    //             </SContent>
    //         )}
    //     </SRow>
    // );

    const SetPriceView = (
        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
                style={{
                    backgroundColor: "white",
                    borderRadius: 3,
                    padding: 3,
                    marginRight: 10,
                }}
                onPress={() =>
                    setPrice(price - 10000 <= 0 ? price : price - 10000)
                }
            >
                <MediumText>-10,000</MediumText>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: "white",
                    borderRadius: 3,
                    padding: 3,
                    marginRight: 10,
                }}
                onPress={() => setPrice(price + 10000)}
            >
                <MediumText>+10,000</MediumText>
            </TouchableOpacity>
        </View>
    );

    const ItemTitle = ({ title }) => {
        return (
            <TitleWrapper>
                <RegularText>{title}</RegularText>
            </TitleWrapper>
        );
    };

    const Checkbox = ({ checked }) => {
        return (
            <Image
                source={
                    checked
                        ? require("../../../assets/images/icons/Check_ON.png")
                        : require("../../../assets/images/icons/Check_OFF.png")
                }
                resizeMode="contain"
                style={{ width: 23, height: 23, marginRight: 6 }}
            />
        );
    };

    const Line = () => {
        return (
            <View
                style={{
                    height: 2,
                    backgroundColor: color["input-border"],
                    marginTop: 10,
                }}
            ></View>
        );
    };
    const BottomButton = () => {
        return (
            <BottomButtonContainer>
                <EmergencyButton>
                    <Image
                        source={require("../../../assets/images/icons/icon_emerg.png")}
                        style={{ width: 24, height: 24 }}
                    />
                    <BoldText style={{ color: "#EB1D36" }}>긴급오더</BoldText>
                </EmergencyButton>
                <NormalButton onPress={onNextStep}>
                    <BoldText style={{ color: "white" }}>일반오더</BoldText>
                </NormalButton>
            </BottomButtonContainer>
        );
    };
    return (
        <Layout
            bottomButtonProps={{
                customButton: <BottomButton />,
            }}
        >
            <Item>
                <ItemTitle title="작업 종류" />
                <Wrapper>
                    <Content>
                        <RegularText>
                            {registInfo.vehicleType} / {registInfo.direction}
                        </RegularText>
                    </Content>
                </Wrapper>
            </Item>
            <Item>
                <ItemTitle title="작업 일시" />
                <Wrapper>
                    <Content>
                        <RegularText>
                            {`${GetDate(
                                registInfo.dateTime,
                                "long"
                            )} (${GetDayOfWeek(registInfo.dateTime)}) ${GetTime(
                                registInfo.dateTime
                            )}`}
                        </RegularText>
                    </Content>
                </Wrapper>
            </Item>
            <Item uninterval>
                <ItemTitle title="작업 주소" />
                <Wrapper>
                    <Content>
                        <RegularText>경기도 고양시 고양이로 12-34</RegularText>
                    </Content>
                </Wrapper>
            </Item>
            <Item>
                <ItemTitle />
                <Wrapper>
                    <Content>
                        <RegularText>102호</RegularText>
                    </Content>
                </Wrapper>
            </Item>
            <Item>
                <ItemTitle title="작업 높이" />
                <Wrapper>
                    <Content>
                        <RegularText>11층</RegularText>
                    </Content>
                </Wrapper>
            </Item>
            <Item>
                <ItemTitle title="연락처" />
                <Wrapper>
                    <Content>
                        <RegularText>010-1323-1212</RegularText>
                    </Content>
                </Wrapper>
            </Item>
            <Item uninterval>
                <ItemTitle title="현장 연락처" />
                <Wrapper>
                    <Content unpadded>
                        <RNTextInput
                            style={{
                                fontSize: 18,
                                fontFamily: "SpoqaHanSansNeo-Regular",
                                color: color["page-black-text"],
                            }}
                            placeholder="현장 연락처를 입력해주세요 (선택)"
                            cursorColor={color["page-lightgrey-text"]}
                        />
                    </Content>
                </Wrapper>
            </Item>
            <Item>
                <ItemTitle />
                <Wrapper>
                    <TouchableOpacity style={{ marginBottom: 10 }}>
                        <Row>
                            <Checkbox checked={false} />
                            <RegularText style={{ fontSize: 16 }}>
                                핸드폰 번호 동일
                            </RegularText>
                        </Row>
                    </TouchableOpacity>
                </Wrapper>
            </Item>
            <Item uninterval>
                <ItemTitle title="작업 비용" />
                <Wrapper>
                    <BoldText>
                        150,000<BoldText style={{ fontSize: 14 }}> AP</BoldText>
                    </BoldText>
                </Wrapper>
            </Item>
            <Item>
                <ItemTitle />
                <Wrapper>
                    <Line />
                    <RegularText style={{ fontSize: 14, marginTop: 7 }}>
                        비용 세부 조정
                    </RegularText>
                    <View style={{ marginTop: 7, marginBottom: 10 }}>
                        <Row>
                            <TouchableOpacity>
                                <Image
                                    source={require("../../../assets/images/icons/icon_plus.png")}
                                    style={{ width: 24, height: 24 }}
                                />
                            </TouchableOpacity>
                            <MediumText
                                style={{
                                    fontSize: 16,
                                    color: color["page-color-text"],
                                    marginLeft: 10,
                                    marginRight: 10,
                                }}
                            >
                                10,000{" "}
                                <MediumText
                                    style={{
                                        fontSize: 12,
                                        color: color["page-color-text"],
                                    }}
                                >
                                    AP
                                </MediumText>
                            </MediumText>
                            <TouchableOpacity>
                                <Image
                                    source={require("../../../assets/images/icons/icon_minus.png")}
                                    style={{ width: 24, height: 24 }}
                                />
                            </TouchableOpacity>
                        </Row>
                    </View>
                </Wrapper>
            </Item>
            <Item uninterval>
                <ItemTitle title="특이사항" />
                <Wrapper>
                    <RNTextInput
                        style={{
                            fontSize: 18,
                            fontFamily: "SpoqaHanSansNeo-Regular",
                            color: color["page-black-text"],
                        }}
                        placeholder="특이사항을 입력해주세요."
                        cursorColor={color["page-lightgrey-text"]}
                    />
                </Wrapper>
            </Item>
            <Item>
                <ItemTitle />
                <Wrapper>
                    <View style={{ marginTop: -10 }}>
                        <Line />
                    </View>
                </Wrapper>
            </Item>
            {/* <View>
                <Container>
                    <Row title="작업 종류" content={getWorkType()} />
                    <Row title="작업 일시" content={getWorkTime()} />
                    {registInfo.upDown === "양사" ? (
                        <>
                            <Row
                                title={
                                    (registInfo.bothType === 1
                                        ? "내림"
                                        : "올림") + " 주소"
                                }
                                content={registInfo.address}
                            />
                            <Row
                                title={
                                    (registInfo.bothType === 1
                                        ? "올림"
                                        : "내림") + " 주소"
                                }
                                content={registInfo.otherAddress}
                            />
                        </>
                    ) : (
                        <Row title="작업 주소" content={registInfo.address} />
                    )}
                    <Row title="작업 높이" content={getWorkFloor()} />

                    {registInfo.volumeType === "quantity" ? (
                        <Row title="작업 물량" content={registInfo.quantity} />
                    ) : (
                        <Row title="작업 시간" content={registInfo.time} />
                    )}

                    <Row title="휴대 전화" content={info.phone} />
                    <InputRow
                        title="현장 연락처"
                        placeholder="현장에서 연락 가능한 번호 입력"
                        defaultValue={isDirectPhone ? info.phone : null}
                        type="directPhone"
                    />
                    <InputRow title="" checkBox />

                    <Row title="작업 비용" content={getPrice()} />
                    <Row title="" view={SetPriceView} />
                    <Row title="적립 포인트" content={getPoint()} />
                    <SRow>
                        <STitle>
                            <MediumText style={{ fontSize: 18 }}>
                                긴급 오더
                            </MediumText>
                        </STitle>
                        <Checkbox
                            style={{ width: 28, height: 28 }}
                            value={emergencyOrder}
                            onValueChange={setEmergencyOrder}
                            color={color.btnAccent}
                        />
                    </SRow>
                    {emergencyOrder ? (
                        <Emergency>
                            <MediumText
                                style={{
                                    fontSize: 18,
                                    color: color.main,
                                    marginBottom: 5,
                                }}
                            >
                                긴급 오더 선택 시 작업 비용이 20% 증가하며
                                {"\n"}
                                모든 기사님에게 알림이 전송됩니다.
                            </MediumText>
                        </Emergency>
                    ) : null}
                    <InputRow
                        title="특이 사항"
                        placeholder="특이사항을 입력해주세요."
                        type="memo"
                    />
                </Container>
                <ButtonContainer>
                    <Button onPress={handleSubmit(onNextStep)}>
                        <MediumText>확인</MediumText>
                    </Button>
                </ButtonContainer>
            </View> */}
        </Layout>
    );
}

export default AddOtherData;
