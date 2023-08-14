import styled from "styled-components/native";
import Layout from "../../../component/layout/Layout";
import RegularText from "../../../component/text/RegularText";
import { color } from "../../../styles";
import MediumText from "../../../component/text/MediumText";
import { Image, TextInput, View } from "react-native";
import BoldText from "../../../component/text/BoldText";
import { REGIST_NAV } from "../../../constant";

const Item = styled.View`
    background-color: white;
    border: 1px solid
        ${(props) =>
            props.accent
                ? color["page-black-text"]
                : props.emergency
                ? "#EB1D36"
                : color["box-border"]};
    border-radius: 10px;
    padding: 22px 23px;
    align-items: flex-end;
    margin-bottom: 18px;
`;

const Row = styled.View`
    flex-direction: row;
    align-items: center;
`;

const PointButton = styled.TouchableOpacity`
    border: 1px solid ${color.main};
    padding: 10px;
    border-radius: 10px;
`;
const CheckOrderPrice = ({ navigation }) => {
    const onNextStep = () => {
        //TODO: 결제
        navigation.navigate(REGIST_NAV[6]);
    };
    const EnterPoint = () => {
        return (
            <View style={{ width: "55%", marginRight: 20 }}>
                <Row>
                    <TextInput
                        style={{
                            width: "90%",
                            fontSize: 18,
                            fontFamily: "SpoqaHanSansNeo-Regular",
                            color: color["page-black-text"],
                        }}
                        placeholder="사용할 포인트 입력"
                        cursorColor={color["page-lightgrey-text"]}
                    />
                    <BoldText style={{ color: color["page-color-text"] }}>
                        AP
                    </BoldText>
                </Row>
                <View
                    style={{
                        height: 2,
                        backgroundColor: color["input-border"],
                        marginTop: 10,
                    }}
                ></View>
            </View>
        );
    };
    // const gopay = () => {
    //     let curPoint = 0;
    //     const data = {
    //         application_id: PAYMENT_APP_ID,
    //         price: price - curPoint,
    //         order_name: VEHICLE[vehicleType - 1] + " 이용비 결제",
    //         order_id: info.userId + "_" + Date.now(),
    //         user: {
    //             username: info.userName,
    //             phone: info.phone,
    //         },
    //         curPoint,
    //         pointId: 126,
    //     };
    //     navigation.navigate("Payment", { data });
    // };
    return (
        <Layout
            bottomButtonProps={{
                onPress: onNextStep,
                title: "결제 진행",
            }}
        >
            <Item>
                <RegularText style={{ marginBottom: 13 }}>
                    알테구 이용비 결제
                </RegularText>
                <RegularText
                    style={{
                        color: color["page-bluegrey-text"],
                        fontSize: 15,
                        marginBottom: 5,
                    }}
                >
                    결제금액
                </RegularText>
                <MediumText>
                    150,000<MediumText style={{ fontSize: 14 }}> AP</MediumText>
                </MediumText>
            </Item>
            <Item emergency>
                <Row>
                    <Image
                        source={require("../../../assets/images/icons/icon_emerg.png")}
                        style={{ width: 25, height: 25 }}
                    />
                    <RegularText
                        style={{
                            fontSize: 19,
                            color: "#EB1D36",
                            marginTop: 5,
                            marginLeft: 8,
                        }}
                    >
                        긴급오더
                    </RegularText>
                </Row>
                <RegularText
                    style={{
                        color: color.main,
                        fontSize: 15,
                        marginBottom: 5,
                        marginTop: 13,
                    }}
                >
                    25% 추가운임
                </RegularText>
                <BoldText style={{ fontSize: 22 }}>
                    36,000
                    <BoldText style={{ fontSize: 16 }}> AP</BoldText>
                </BoldText>
            </Item>
            <Item>
                <RegularText style={{ marginBottom: 13 }}>포인트</RegularText>
                <RegularText
                    style={{
                        color: color["page-bluegrey-text"],
                        fontSize: 15,
                        marginBottom: 5,
                    }}
                >
                    보유한 포인트
                </RegularText>
                <MediumText style={{ marginBottom: 18 }}>
                    36,000<MediumText style={{ fontSize: 14 }}> AP</MediumText>
                </MediumText>

                <Row>
                    <EnterPoint />
                    <PointButton>
                        <MediumText
                            style={{
                                fontSize: 15,
                                color: color["page-color-text"],
                            }}
                        >
                            전액사용
                        </MediumText>
                    </PointButton>
                </Row>
            </Item>
            <Item accent>
                <MediumText style={{ marginBottom: 25 }}>
                    최종 결제 금액
                </MediumText>
                <Row>
                    <RegularText
                        style={{
                            fontSize: 15,
                            marginBottom: 8,
                            width: "25%",
                            textAlign: "right",
                        }}
                    >
                        알테구 이용비
                    </RegularText>
                    <RegularText
                        style={{
                            fontSize: 16,
                            marginBottom: 8,
                            width: "25%",
                            textAlign: "right",
                        }}
                    >
                        150,000
                        <RegularText
                            style={{
                                fontSize: 14,
                            }}
                        >
                            {" "}
                            AP
                        </RegularText>
                    </RegularText>
                </Row>
                <Row>
                    <RegularText
                        style={{
                            fontSize: 15,
                            width: "25%",
                            textAlign: "right",
                        }}
                    >
                        포인트 사용
                    </RegularText>
                    <RegularText
                        style={{
                            fontSize: 16,

                            width: "25%",
                            textAlign: "right",
                        }}
                    >
                        - 0
                        <RegularText
                            style={{
                                fontSize: 14,
                            }}
                        >
                            {" "}
                            AP
                        </RegularText>
                    </RegularText>
                </Row>
                <View
                    style={{
                        height: 1.5,
                        backgroundColor: color["image-area-background"],
                        width: "60%",
                        marginTop: 13,
                        marginBottom: 13,
                    }}
                ></View>
                <Row>
                    <RegularText
                        style={{
                            fontSize: 15,
                            marginRight: 20,
                        }}
                    >
                        총 결제 금액
                    </RegularText>
                    <BoldText style={{ fontSize: 22, color: color.main }}>
                        36,000
                        <BoldText style={{ fontSize: 16, color: color.main }}>
                            {" "}
                            AP
                        </BoldText>
                    </BoldText>
                </Row>
            </Item>
            <Item accent>
                <MediumText style={{ color: color.blue, marginBottom: 20 }}>
                    적립 예정 포인트
                </MediumText>
                <BoldText style={{ fontSize: 22, color: color.blue }}>
                    36,000
                    <BoldText style={{ fontSize: 16, color: color.blue }}>
                        {" "}
                        AP
                    </BoldText>
                </BoldText>
            </Item>
        </Layout>
    );
};

export default CheckOrderPrice;
