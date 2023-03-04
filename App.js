import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
    useFonts,
    IBMPlexSansKR_100Thin,
    IBMPlexSansKR_200ExtraLight,
    IBMPlexSansKR_300Light,
    IBMPlexSansKR_400Regular,
    IBMPlexSansKR_500Medium,
    IBMPlexSansKR_600SemiBold,
    IBMPlexSansKR_700Bold,
} from "@expo-google-fonts/ibm-plex-sans-kr";
import {
    NanumGothic_400Regular,
    NanumGothic_700Bold,
    NanumGothic_800ExtraBold,
} from "@expo-google-fonts/nanum-gothic";
import Toast from "react-native-toast-message";
import { LoginProvider } from "./context/LoginContext";
import RootNavigator from "./navigator/RootNavigator";
import { toastConfig } from "./component/Toast";
import { UserProvider } from "./context/UserContext";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [fontsLoaded] = useFonts({
        IBMPlexSansKR_100Thin,
        IBMPlexSansKR_200ExtraLight,
        IBMPlexSansKR_300Light,
        IBMPlexSansKR_400Regular,
        IBMPlexSansKR_500Medium,
        IBMPlexSansKR_600SemiBold,
        IBMPlexSansKR_700Bold,
        NanumGothic_400Regular,
        NanumGothic_700Bold,
        NanumGothic_800ExtraBold,
    });

    useEffect(() => {
        async function prepare() {
            try {
                //TODO: token preload
                //TODO: image preload
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady && fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady, fontsLoaded]);

    if (!appIsReady || !fontsLoaded) {
        return null;
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <LoginProvider>
                <UserProvider>
                    <RootNavigator />
                </UserProvider>
            </LoginProvider>
            <StatusBar style="dark" />
            <Toast position="bottom" bottomOffset="100" config={toastConfig} />
        </View>
    );
}
