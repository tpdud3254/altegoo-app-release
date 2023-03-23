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
import { RegistProvider } from "./context/RegistContext";

SplashScreen.preventAutoHideAsync();

import { speech, SERVER, PAYMENT_SERVER } from "./utils";

// export const SERVER = "https://cab2-211-59-182-118.jp.ngrok.io";

// export const PAYMENT_SERVER = "https://c031-211-59-182-118.jp.ngrok.io/payment";

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
        function createSocket() {
            const ws = new WebSocket(`wss://altegoo.shop`);
            // const ws = new WebSocket(`wss://cab2-211-59-182-118.jp.ngrok.io`);

            ws.onopen = (e) => {
                // connection opened
                console.log("connected");

                // send a message
                // ws.send("hello");
            };

            ws.onmessage = (e) => {
                // a message was received
                console.log("message : ", e.data);
                const parsed = JSON.parse(e.data);

                if (parsed.type === "REGIST") {
                    speech(parsed.tts_msg, parsed.exceptionUserId);
                }
            };

            ws.onerror = (e) => {
                // an error occurred
                console.log("ws.onerror:", e.message);
            };

            ws.onclose = (e) => {
                // connection closed
                console.log("ws.onclose:", e);
                // setTimeout(() => createSocket(), 1000);
            };

            // ws.close();
        }

        // export const ws = new WebSocket(`wss://altegoo.shop`);

        createSocket();
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
                    <RegistProvider>
                        <RootNavigator />
                    </RegistProvider>
                </UserProvider>
            </LoginProvider>
            <StatusBar style="dark" />
            <Toast position="bottom" bottomOffset="100" config={toastConfig} />
        </View>
    );
}
