import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import SetPassword from "../../screen/auth/SetPassword";
import SignIn from "../../screen/auth/SignIn";
import { FONTS } from "../../constant";
import { Image } from "react-native";
import { color } from "../../styles";

const Stack = createStackNavigator();

export default function SignInNavigator() {
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
                name="SignIn"
                component={SignIn}
                options={{
                    title: "로그인",
                }}
            />
            <Stack.Screen
                name="SetPassword"
                component={SetPassword}
                options={{
                    title: "비밀번호 찾기",
                }}
            />
        </Stack.Navigator>
    );
}
