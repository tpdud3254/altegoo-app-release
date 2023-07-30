import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import MediumText from "../../../component/text/MediumText";
import { color } from "../../../styles";
import { COMPANY, DRIVER, NORMAL, SIGNUP_NAV } from "../../../constant";
import AuthLayout from "../../../component/layout/AuthLayout";
import RegularText from "../../../component/text/RegularText";
import BoldText from "../../../component/text/BoldText";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const explainText = {
    NORMAL: "일반회원은 작업 등록만 가능하며\n등록된 작업을 예약할 수 없습니다.\n일반회원 가입 후 언제든지 기사 및\n기업회원 전환이 가능합니다.",
    DRIVER: "기사회원은 등록된 작업을 예약, 진행하고\n작업포인트 적립이 가능합니다.\n일반회원과 마찬가지로\n작업 등록 또한가능합니다.",
    COMPANY:
        "기업회원의 경우 작업 등록 뿐만 아니라\n차량 번호 입력시 등록된 작업의\n진행 또한 가능합니다.\n제휴 기업의 경우 별도의 작업등록 시스템이 제공됩니다.",
};

const Options = styled.View`
    height: 350px;
    align-items: center;
    justify-content: space-between;
    padding: 45px 0px;
`;

const OptionContainer = styled.TouchableOpacity`
    width: 100%;
    height: 75px;
    padding: 0px 15px;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    border-radius: 12px;
    background-color: ${(props) =>
        props.selected
            ? color["option-selected-background"]
            : color["option-unselected-background"]};
    border: 1px
        ${(props) =>
            props.selected
                ? color["option-selected-border"]
                : color["option-unselected-border"]};
`;
const OptionIcon = styled.Image`
    width: ${(props) => (props.type === DRIVER ? "30px" : "25px")};
`;
const OptionTitle = styled.View`
    width: 80%;
    padding: 0px 20px;
`;
const OptionRadio = styled.Image`
    width: 25px;
`;

const Explain = styled.View``;

const Necessity = styled.View`
    width: 100%;
    padding: 25px 0px;
    margin-top: 30px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    background-color: ${color["box-color-background"]};
`;

const NecessityWrapper = styled.View`
    padding-top: 13px;
`;

function SignUp() {
    const navigation = useNavigation();
    const { setInfo } = useContext(UserContext);
    const [type, setType] = useState("");

    const onNext = () => {
        if (type === "") {
            Toast.show({
                type: "errorToast",
                props: "회원 유형을 선택해 주세요.",
            });
            return;
        }
        const data = {
            // userType: type,
            userType: NORMAL, //TODO: testcode
        };

        setInfo(data);
        navigation.navigate(SIGNUP_NAV[type][0]);
    };

    const Option = ({ type, selected }) => {
        let icon = "";

        if (selected) {
            if (type === NORMAL) {
                icon = require(`../../../assets/images/icons/icon_member_ON.png`);
            } else if (type === DRIVER) {
                icon = require(`../../../assets/images/icons/icon_driver_ON.png`);
            } else if (type === COMPANY) {
                icon = require(`../../../assets/images/icons/icon_company_ON.png`);
            }
        } else {
            if (type === NORMAL) {
                icon = require(`../../../assets/images/icons/icon_member_OFF.png`);
            } else if (type === DRIVER) {
                icon = require(`../../../assets/images/icons/icon_driver_OFF.png`);
            } else if (type === COMPANY) {
                icon = require(`../../../assets/images/icons/icon_company_OFF.png`);
            }
        }

        const title =
            type === NORMAL
                ? "일반 회원"
                : type === DRIVER
                ? "기사 회원"
                : "기업 회원";

        let radio = require(`../../../assets/images/icons/Radio_ON.png`);

        if (!selected)
            radio = require(`../../../assets/images/icons/Radio_OFF.png`);

        return (
            <OptionContainer selected={selected} onPress={() => setType(type)}>
                <OptionIcon source={icon} resizeMode="contain" type={type} />
                <OptionTitle>
                    <MediumText
                        style={{
                            color: selected
                                ? color["option-selected-text"]
                                : color["option-unselected-text"],
                        }}
                    >
                        {title}
                    </MediumText>
                </OptionTitle>
                <OptionRadio source={radio} resizeMode="contain" />
            </OptionContainer>
        );
    };

    return (
        <AuthLayout
            bottomButtonProps={{
                title: "다음으로",
                onPress: onNext,
            }}
        >
            <Options>
                <>
                    <Option type={NORMAL} selected={type === NORMAL} />
                    <Option type={DRIVER} selected={type === DRIVER} />
                    <Option type={COMPANY} selected={type === COMPANY} />
                </>
            </Options>
            <Explain>
                <RegularText
                    style={{
                        color: color["page-dark-text"],
                        lineHeight: 30,
                        textAlign: "center",
                        fontSize: 19,
                    }}
                >
                    {explainText[type]}
                </RegularText>
                {type === "" || type === NORMAL ? null : (
                    <Necessity>
                        <BoldText
                            style={{
                                fontSize: 16,
                                color: color["page-color-text"],
                            }}
                        >
                            필요 준비물
                        </BoldText>
                        <NecessityWrapper>
                            <RegularText
                                style={{
                                    color: color["page-dark-text"],
                                    lineHeight: 30,
                                    textAlign: "center",
                                    fontSize: 20,
                                }}
                            >
                                {type === DRIVER
                                    ? "사업자 등록증\n화물운송허가증"
                                    : "사업자 등록증"}
                            </RegularText>
                        </NecessityWrapper>
                    </Necessity>
                )}
            </Explain>
        </AuthLayout>
    );
}

export default SignUp;
