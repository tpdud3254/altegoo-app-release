import React from "react";
import { Image, View } from "react-native";
import styled from "styled-components/native";
import { color } from "../../styles";
import { shadowProps } from "../Shadow";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { useNavigation } from "@react-navigation/native";

export const ButtonContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: 100;
`;

const Container = styled.TouchableOpacity`
    position: absolute;
    bottom: 0px;
    right: 0px;
`;

function RegistButton() {
    const { height } = useWindowDimensions();
    const navigation = useNavigation();
    const goToRegist = () => {
        navigation.navigate("RegistNavigator");
    };

    return (
        <View style={{ height: height, position: "absolute", width: "100%" }}>
            <Container onPress={goToRegist} windowHeight={height}>
                <Image
                    style={{
                        resizeMode: "contain",
                        width: 170,
                    }}
                    source={require(`../../assets/images/icons/btn_upload_work.png`)}
                />
            </Container>
        </View>
    );
}

export default RegistButton;
