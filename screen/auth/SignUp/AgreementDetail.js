import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { color } from "../../../styles";
import { COMPANY, DRIVER, NORMAL } from "../../../constant";
import AuthLayout from "../../../component/layout/AuthLayout";
import RegularText from "../../../component/text/RegularText";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import MediumText from "../../../component/text/MediumText";
import { terms } from "./terms";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Container = styled.View`
    padding: 10px 15px;
`;
function AgreementDetail({ route, navigation }) {
    const { setInfo } = useContext(UserContext);

    useEffect(() => {
        navigation.setOptions({
            title: route?.params?.title,
            headerRight: () => (
                <TouchableOpacity onPress={goBack}>
                    <Image
                        style={{ width: 25, marginRight: 8 }}
                        resizeMode="contain"
                        source={require(`../../../assets/images/icons/BTN_Close.png`)}
                    />
                </TouchableOpacity>
            ),
        });
    }, []);

    const goBack = () => {
        navigation.goBack();
    };
    return (
        <AuthLayout>
            <Container>
                <RegularText style={{ lineHeight: 28 }}>
                    {terms[route?.params?.index]}
                </RegularText>
            </Container>
        </AuthLayout>
    );
}

export default AgreementDetail;
