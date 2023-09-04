import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { FONTS, ORDINARY, PERSON } from "../../constant";
import UserContext from "../../context/UserContext";
import DetailTerms from "../../screen/auth/SignUp/DetailTerms";
import SignUp from "../../screen/auth/SignUp/SignUp";
import SignUpStep1 from "../../screen/auth/SignUp/SignUpStep1";
import SignUpStep2 from "../../screen/auth/SignUp/SignUpStep2";
import SignUpStep3 from "../../screen/auth/SignUp/SignUpStep3";
import TakePhoto from "../../screen/TakePhoto";
import { color } from "../../styles";
import { Image } from "react-native";
import Agreements from "../../screen/auth/SignUp/Agreements";
import AgreementDetail from "../../screen/auth/SignUp/AgreementDetail";
import Identification from "../../screen/auth/SignUp/Identification";
import CompanyInfomation from "../../screen/auth/SignUp/CompanyInfomation";
import EnterPassword from "../../screen/auth/SignUp/EnterPassword";
import BusinessLicense from "../../screen/auth/SignUp/BusinessLicense";
import RegisterVehicle from "../../screen/auth/SignUp/RegisterVehicle";
import VehicleLicense from "../../screen/auth/SignUp/VehicleLicense";
import WorkingArea from "../../screen/auth/SignUp/WorkingArea";
import RecommendedMember from "../../screen/auth/SignUp/RecommendedMember";
import SignUpComplete from "../../screen/auth/SignUp/SignUpComplete";

const Stack = createStackNavigator();

export default function SignUpNavigator() {
    const { info } = useContext(UserContext);
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                presentation: "transparentModal",
                headerTintColor: color["header-title-text"],
                headerTitleStyle: {
                    fontFamily: FONTS.medium,
                },
                headerStyle: {
                    backgroundColor: color["page-background"],
                },
                headerBackImage: () => (
                    <Image
                        source={require(`../../assets/images/icons/btn_prev.png`)}
                        style={{
                            resizeMode: "contain",
                            width: 25,
                            marginLeft: 5,
                        }}
                    />
                ),
            }}
        >
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    title: "회원가입",
                }}
            />
            <Stack.Screen
                name="Agreements"
                component={Agreements}
                options={{
                    title: "약관 동의",
                }}
            />
            <Stack.Screen
                name="AgreementDetail"
                component={AgreementDetail}
                options={{ headerLeft: null }}
            />
            <Stack.Screen
                name="Identification"
                component={Identification}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="CompanyInfomation"
                component={CompanyInfomation}
                options={{
                    title: "기업 정보 입력",
                }}
            />
            <Stack.Screen
                name="EnterPassword"
                component={EnterPassword}
                options={{
                    title: "비밀번호 입력",
                }}
            />
            <Stack.Screen
                name="BusinessLicense"
                component={BusinessLicense}
                options={{
                    title: "사업자 등록증 첨부",
                }}
            />
            <Stack.Screen
                name="RegisterVehicle"
                component={RegisterVehicle}
                options={{
                    title: "내 차 등록",
                }}
            />
            <Stack.Screen
                name="VehicleLicense"
                component={VehicleLicense}
                options={{
                    title: "화물자동차 운송사업 허가증 첨부",
                }}
            />
            <Stack.Screen
                name="WorkingArea"
                component={WorkingArea}
                options={{
                    title: "작업 지역 선택",
                }}
            />
            <Stack.Screen
                name="RecommendedMember"
                component={RecommendedMember}
                options={{
                    title: "추천 회원 입력",
                }}
            />
            <Stack.Screen
                name="SignUpComplete"
                component={SignUpComplete}
                options={{ headerShown: false }}
            />
            {/* TODO: 나중에 안쓰는거,, 다정리하고 코드 정리하고,, 서버 제대로 배워서 다시 해보고,, 디자인 시안이랑 비교해서 누락된 사항들 정리해서 2차개발로빼기 */}
            <Stack.Screen
                name="TakePhoto"
                component={TakePhoto}
                options={{ headerShown: false }}
            />
            {/*
            <Stack.Screen
                name="SignUpStep1"
                component={SignUpStep1}
                options={{
                    title:
                        info.userType === ORDINARY
                            ? "일반회원가입"
                            : info.userDetailType === PERSON
                            ? "기사회원가입"
                            : "기업회원가입",
                }}
            />
             <Stack.Screen
                name="SignUpStep2"
                component={SignUpStep2}
                options={{ title: "작업지역 선택" }}
            />
            <Stack.Screen
                name="SignUpStep3"
                component={SignUpStep3}
                options={{ title: "약관동의" }}
            />

            <Stack.Screen name="DetailTerms" component={DetailTerms} />
             */}
        </Stack.Navigator>
    );
}
