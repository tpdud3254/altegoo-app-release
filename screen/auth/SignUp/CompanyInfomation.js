import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { color } from "../../../styles";
import { COMPANY, DRIVER, NORMAL, SIGNUP_NAV } from "../../../constant";
import AuthLayout from "../../../component/layout/AuthLayout";
import RegularText from "../../../component/text/RegularText";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import MediumText from "../../../component/text/MediumText";
import SelectBox from "../../../component/selectBox/SelectBox";
import TextInput from "../../../component/input/TextInput";
import { useWindowDimensions } from "react-native";

const Container = styled.View`
    margin-top: 30px;
    margin-bottom: 10px;
    height: ${(props) => (props.height ? props.height + "px" : "")};
`;

const ItemWrapper = styled.View`
    margin-bottom: 30px;
`;
function CompanyInfomation() {
    const navigation = useNavigation();
    const { info, setInfo } = useContext(UserContext);
    const { height: windowHeight } = useWindowDimensions();
    const [selected, setSelected] = useState("");
    const [test, setTest] = useState("");

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
            SIGNUP_NAV[info.userType].indexOf("CompanyInfomation");
        navigation.navigate(SIGNUP_NAV[info.userType][curNavIndex + 1]);
    };

    const reset = () => {
        setTest("");
    };

    console.log("selected : ", selected);
    return (
        <AuthLayout
            bottomButtonProps={{
                title: "다음으로",
                onPress: onNext,
                disabled: true,
            }}
        >
            <Container height={windowHeight}>
                <ItemWrapper>
                    <SelectBox
                        title="사업 종류 선택"
                        data={[
                            "옵션1",
                            "옵션2",
                            "옵션3",
                            "옵션4",
                            "옵션5",
                            "옵션6",
                        ]}
                        onSelect={(index) => setSelected(index)}
                    />
                </ItemWrapper>
                <ItemWrapper>
                    <TextInput
                        title="상호명"
                        placeholder="상호명을 입력해주세요."
                        returnKeyType="next"
                        // onSubmitEditing={() => onNext(passwordRef)}
                        onChangeText={(text) =>
                            // setValue("phone", text)
                            setTest(text)
                        }
                        onReset={reset}
                        value={test}
                    />
                </ItemWrapper>
                <ItemWrapper>
                    <TextInput
                        title="담당자명 (선택)"
                        placeholder="담당자명을 입력해주세요"
                    />
                </ItemWrapper>
            </Container>
        </AuthLayout>
    );
}

export default CompanyInfomation;
