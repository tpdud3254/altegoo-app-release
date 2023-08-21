import styled from "styled-components/native";
import Layout from "../../../component/layout/Layout";
import RegularText from "../../../component/text/RegularText";
import { color } from "../../../styles";
import MediumText from "../../../component/text/MediumText";
import { Image, TextInput, View } from "react-native";
import BoldText from "../../../component/text/BoldText";
import { REGIST_NAV, SERVER } from "../../../constant";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/UserContext";
import RegistContext from "../../../context/RegistContext";
import {
    GetEmergencyPrice,
    getAsyncStorageToken,
    numberWithComma,
    showError,
    showErrorMessage,
} from "../../../utils";
import axios from "axios";
import { useForm } from "react-hook-form";

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
    const { info } = useContext(UserContext);
    const { registInfo, setRegistInfo } = useContext(RegistContext);

    const { setValue, register, handleSubmit, watch, getValues } = useForm();

    const [pointData, setPointData] = useState(null);

    useEffect(() => {
        console.log("registInfo : ", registInfo);

        getPoint();

        register("usePoint");
        register("emergencyPrice");

        if (registInfo.emergency)
            setValue(
                "emergencyPrice",
                GetEmergencyPrice(registInfo.price).toString()
            );
        else setValue("emergencyPrice", "0");
    }, []);

    useEffect(() => {
        if (!pointData) null;
        const usePoint = watch("usePoint");

        if (usePoint && usePoint > 0) {
            if (usePoint > pointData.curPoint)
                setValue("usePoint", pointData.curPoint.toString());
        }
    }, [watch("usePoint")]);
    const getPoint = async () => {
        axios
            .get(SERVER + "/users/point", {
                headers: {
                    auth: await getAsyncStorageToken(),
                },
            })
            .then(({ data }) => {
                const {
                    result,
                    data: { point },
                } = data;
                console.log("result: ", result);
                console.log("point: ", point);

                // setPointData(point);
                setPointData({ curPoint: 10000 }); //TODO: testcode
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {});
    };

    const onNextStep = () => {
        //TODO: 결제
        navigation.navigate(REGIST_NAV[6]);
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

    //TODO: 쿠폰사용 포함
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
                    {registInfo.price}
                    <MediumText style={{ fontSize: 14 }}> AP</MediumText>
                </MediumText>
            </Item>
            {registInfo.emergency ? (
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
                        {watch("emergencyPrice")}
                        <BoldText style={{ fontSize: 16 }}> AP</BoldText>
                    </BoldText>
                </Item>
            ) : null}

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
                    {pointData?.curPoint ? pointData.curPoint : 0}
                    <MediumText style={{ fontSize: 14 }}> AP</MediumText>
                </MediumText>
                <Row>
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
                                returnKeyType="done"
                                keyboardType="number-pad"
                                value={watch("usePoint")}
                                onChangeText={(text) =>
                                    setValue("usePoint", text)
                                }
                            />
                            <BoldText
                                style={{ color: color["page-color-text"] }}
                            >
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
                    <PointButton
                        onPress={() =>
                            setValue("usePoint", pointData.curPoint.toString())
                        }
                    >
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
                        {registInfo.price + Number(watch("emergencyPrice"))}
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
                        - {watch("usePoint")}
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
                        {registInfo.price +
                            Number(watch("emergencyPrice")) -
                            Number(watch("usePoint"))}
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
                    {(registInfo.price +
                        Number(watch("emergencyPrice")) -
                        Number(watch("usePoint"))) *
                        0.2}
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
