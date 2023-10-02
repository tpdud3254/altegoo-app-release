import React, { useContext, useState } from "react";
import { Image, View } from "react-native";
import styled from "styled-components/native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../../context/UserContext";
import { COMPANY } from "../../constant";
import { PopupWithButtons } from "../PopupWithButtons";
import RegularText from "../text/RegularText";

const Container = styled.TouchableOpacity`
    position: absolute;
    bottom: 0px;
    right: 0px;
`;

function RegistButton() {
    const navigation = useNavigation();
    const { height } = useWindowDimensions();
    const { info } = useContext(UserContext);
    const [isPopupShown, setIsPopupShown] = useState(false);

    const showPopup = () => {
        setIsPopupShown(true);
    };

    const hidePopup = () => {
        setIsPopupShown(false);
    };

    const goToRegist = () => {
        if (info.userType === COMPANY && !info.license) {
            showPopup();

            return;
        }
        navigation.navigate("RegistNavigator");
    };

    const goToRegistLicense = () => {
        hidePopup();
        navigation.navigate("SettingNavigator", {
            screen: "MemberInformation",
        });
    };

    return (
        <View style={{ height: height, position: "absolute", width: "100%" }}>
            <Container
                onPress={goToRegist}
                style={{
                    width: 170,
                    height: 80,
                    bottom: 70,
                }}
            >
                <Image
                    style={{
                        resizeMode: "contain",
                        width: 170,
                        height: 80,
                    }}
                    source={require(`../../assets/images/icons/btn_upload_work.png`)}
                />
            </Container>
            <PopupWithButtons
                visible={isPopupShown}
                onTouchOutside={hidePopup}
                onClick={goToRegistLicense}
                negativeButtonLabel="취소"
            >
                <RegularText
                    style={{
                        fontSize: 22,
                        textAlign: "center",
                        lineHeight: 33,
                        paddingTop: 15,
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 15,
                    }}
                >
                    등록된 사업자 등록증이 없습니다.{"\n"}
                    사업자 등록증을 등록하시겠습니까?
                </RegularText>
            </PopupWithButtons>
        </View>
    );
}

export default RegistButton;
