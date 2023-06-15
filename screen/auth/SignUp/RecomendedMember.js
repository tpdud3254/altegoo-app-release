import React, { useContext } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { color } from "../../../styles";
import { COMPANY, DRIVER, NORMAL, SIGNUP_NAV } from "../../../constant";
import AuthLayout from "../../../component/layout/AuthLayout";
import RegularText from "../../../component/text/RegularText";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import MediumText from "../../../component/text/MediumText";

function RecomendedMember() {
    const navigation = useNavigation();
    const { info, setInfo } = useContext(UserContext);

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
            SIGNUP_NAV[info.userType].indexOf("RecomendedMember");
        navigation.navigate(SIGNUP_NAV[info.userType][curNavIndex + 1]);
    };

    return (
        <AuthLayout
            bottomButtonProps={{
                title: "다음으로",
                onPress: onNext,
            }}
        >
            <MediumText>RecomendedMember</MediumText>
        </AuthLayout>
    );
}

export default RecomendedMember;
