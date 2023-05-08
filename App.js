import React, { useCallback, useEffect, useState } from "react";
import { Image, View } from "react-native";
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
import { speech } from "./utils";
import { Asset } from "expo-asset";
import * as Device from "expo-device";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { WSS_SERVER } from "./constant";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [locationGranted, setLocationGranted] = useState(true);
    const [pushGranted, setPushGranted] = useState(true);
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
                const imageAssets = cacheImages([
                    require(`./assets/images/intro/img_01.png`),
                    require(`./assets/images/intro/img_02.png`),
                    require(`./assets/images/intro/img_03.png`),
                ]);

                await Promise.all([...imageAssets]);

                askLocationPermission();
                askPushPermission();
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        function createSocket() {
            const ws = new WebSocket(WSS_SERVER);
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

    const askLocationPermission = async () => {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
            setLocationGranted(false);
        }
    };

    const askPushPermission = async () => {
        if (Device.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();

            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } =
                    await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                alert("Failed to get push token for push notification!");
                setPushGranted(false);
                return;
            }
        }
    };

    function cacheImages(images) {
        return images.map((image) => {
            if (typeof image === "string") {
                return Image.prefetch(image);
            } else {
                return Asset.fromModule(image).downloadAsync();
            }
        });
    }

    const onLayoutRootView = useCallback(async () => {
        if (!locationGranted || !pushGranted) {
            //TODO:앱종료 추가
            return null;
        }
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
