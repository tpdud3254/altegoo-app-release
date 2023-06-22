import React, { useEffect } from "react";
import styled from "styled-components/native";
import { color } from "../../../styles";
import AuthLayout from "../../../component/layout/AuthLayout";
import RegularText from "../../../component/text/RegularText";
import { terms } from "./terms";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Container = styled.View`
    padding: 10px 15px;
`;
function AgreementDetail({ route, navigation }) {
    useEffect(() => {
        navigation.setOptions({
            title: route?.params?.title,
            headerRight: () => (
                <TouchableOpacity onPress={goBack}>
                    <Image
                        style={{ width: 25, marginRight: 12 }}
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
                <RegularText
                    style={{ lineHeight: 28, color: color["page-black-text"] }}
                >
                    {terms[route?.params?.index]}
                </RegularText>
            </Container>
        </AuthLayout>
    );
}

export default AgreementDetail;
