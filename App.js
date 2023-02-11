import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
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
import { useCallback, useEffect, useState } from "react";
import TitleText from "./component/text/TitleText";
import SubTitleText from "./component/text/SubTitleText";
import PlainText from "./component/text/PlainText";

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
            <TitleText>제목: 로그인 회원가입</TitleText>
            <SubTitleText>부제목: 아이디 비밀번호</SubTitleText>
            <PlainText>텍스트 원본</PlainText>
            <StatusBar style="auto" />
        </View>
    );
}
