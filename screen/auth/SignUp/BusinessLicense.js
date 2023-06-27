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
import { Image, useWindowDimensions } from "react-native";

const Container = styled.View`
    justify-content: space-between;
    height: ${(props) => props.height - 200}px;
`;

const Wrapper = styled.View`
    align-items: center;
    margin-top: 70px;
`;
const CameraButton = styled.TouchableOpacity`
    width: 250px;
    height: 380px;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    background-color: ${color["image-area-background"]};
`;

const SkipButton = styled.TouchableOpacity`
    align-items: center;
`;
function BusinessLicense() {
    const navigation = useNavigation();
    const { info, setInfo } = useContext(UserContext);
    const { height: windowHeight } = useWindowDimensions();

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
            SIGNUP_NAV[info.userType].indexOf("BusinessLicense");
        navigation.navigate(SIGNUP_NAV[info.userType][curNavIndex + 1]);
    };

    return (
        <AuthLayout
            bottomButtonProps={{
                title: "다음으로",
                onPress: onNext,
                disabled: true,
            }}
        >
            <Container height={windowHeight}>
                <Wrapper>
                    <CameraButton>
                        <Image
                            style={{ width: 60, height: 60 }}
                            source={require("../../../assets/images/icons/btn_camera.png")}
                        />
                    </CameraButton>
                    <MediumText
                        style={{
                            color: color["page-grey-text"],
                            fontSize: 16,
                            textAlign: "center",
                            marginTop: 20,
                            lineHeight: 24,
                        }}
                    >
                        위 카메라 아이콘을 터치하여{"\n"}사업자 등록증을
                        촬영하거나 사진첩에서{"\n"}불러와주세요.
                    </MediumText>
                </Wrapper>
                <SkipButton>
                    <RegularText
                        style={{
                            fontSize: 16,
                            color: color["page-color-text"],
                            textDecorationLine: "underline",
                        }}
                    >
                        다음에 할게요
                    </RegularText>
                </SkipButton>
            </Container>
        </AuthLayout>
    );
}

export default BusinessLicense;
