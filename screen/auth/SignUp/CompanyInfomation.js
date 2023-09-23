import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { SIGNUP_NAV } from "../../../constant";
import AuthLayout from "../../../component/layout/AuthLayout";
import SelectBox from "../../../component/selectBox/SelectBox";
import TextInput from "../../../component/input/TextInput";
import { useWindowDimensions } from "react-native";
import { useForm } from "react-hook-form";
import { CheckValidation } from "../../../utils";

const Container = styled.View`
    margin-top: 30px;
    margin-bottom: 10px;
    height: ${(props) => (props.height ? props.height + "px" : "")};
`;

const ItemWrapper = styled.View`
    margin-bottom: 30px;
`;

const workCategoryArr = [
    "건설 계열",
    "가구 계열",
    "가전 계열",
    "청소 / 인력 계열",
    "이사 계열",
    "기타",
];

function CompanyInfomation() {
    const navigation = useNavigation();
    const { height: windowHeight } = useWindowDimensions();
    const { info, setInfo } = useContext(UserContext);
    const { register, setValue, watch, getValues, handleSubmit } = useForm();

    const [validation, setValidation] = useState(false);

    const companyPersonNameRef = useRef();

    useEffect(() => {
        console.log("info : ", info);
        register("workCategory");
        register("companyName");
        register("companyPersonName");
    }, []);

    useEffect(() => {
        if (CheckValidation(getValues("workCategory", "companyName"))) {
            setValidation(true);
        } else {
            setValidation(false);
        }
    }, [getValues()]);

    const onNext = (data) => {
        console.log(data);

        const { workCategory, companyName, companyPersonName } = data;

        const infoData = {
            workCategory,
            companyName,
            companyPersonName: companyPersonName || null,
        };

        setInfo({ ...info, ...infoData });

        const curNavIndex =
            SIGNUP_NAV[info.userType].indexOf("CompanyInfomation");
        navigation.navigate(SIGNUP_NAV[info.userType][curNavIndex + 1]);
    };

    return (
        <AuthLayout
            bottomButtonProps={{
                title: "다음으로",
                onPress: handleSubmit(onNext),
                disabled: !validation,
            }}
        >
            <Container height={windowHeight}>
                <ItemWrapper>
                    <SelectBox
                        title="사업 종류 선택"
                        data={workCategoryArr}
                        onSelect={(index) =>
                            setValue("workCategory", index + 1)
                        }
                    />
                </ItemWrapper>
                <ItemWrapper>
                    <TextInput
                        title="상호명"
                        placeholder="상호명을 입력해주세요."
                        returnKeyType="next"
                        value={watch("companyName")}
                        onChangeText={(text) => setValue("companyName", text)}
                        onReset={() => setValue("companyName", "")}
                        onSubmitEditing={() =>
                            companyPersonNameRef.current.setFocus()
                        }
                    />
                </ItemWrapper>
                <ItemWrapper>
                    <TextInput
                        ref={companyPersonNameRef}
                        title="담당자명 (선택)"
                        placeholder="담당자명을 입력해주세요"
                        returnKeyType="done"
                        value={watch("companyPersonName")}
                        onChangeText={(text) =>
                            setValue("companyPersonName", text)
                        }
                        onReset={() => setValue("companyPersonName", "")}
                    />
                </ItemWrapper>
            </Container>
        </AuthLayout>
    );
}

export default CompanyInfomation;
