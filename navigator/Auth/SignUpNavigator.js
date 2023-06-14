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
                    ></Image>
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
            <Stack.Screen
                name="TakePhoto"
                component={TakePhoto}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
