import React, { useCallback, useEffect, useState } from "react";
import { AppState, Image, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import { LoginProvider } from "./context/LoginContext";
import RootNavigator from "./navigator/RootNavigator";
import { toastConfig } from "./component/Toast";
import { UserProvider } from "./context/UserContext";
import { StatusBar } from "expo-status-bar";
import { RegistProvider } from "./context/RegistContext";
import { checkPosition, speech } from "./utils";
import { Asset } from "expo-asset";
import * as Device from "expo-device";
import * as Location from "expo-location";
import { AndroidNotificationPriority } from "expo-notifications";
import * as Notifications from "expo-notifications";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { WSS_SERVER } from "./constant";

SplashScreen.preventAutoHideAsync();

//TODO: 백그라운드에서 실행되어야할 것들 셋팅
// location(테스트)

let ws = null;

function createSocket() {
    ws = new WebSocket(WSS_SERVER);

    ws.onopen = (e) => {
        console.log("webSocket connected");
    };

    ws.onmessage = (e) => {
        console.log("message : ", e.data);
        const parsed = JSON.parse(e.data);

        if (parsed.type === "REGIST") {
            speech(parsed.tts_msg, parsed.exceptionUserId);
        }
    };

    ws.onerror = (e) => {
        console.log("ws.onerror:", e.message);
    };

    ws.onclose = (e) => {
        console.log("ws.onclose:", e);
        if (e.reason !== "background" && e.reason !== "terminated") {
            setTimeout(() => createSocket(), 1000);
        }
    };

    //BUG: 서버 쪽 연결 끊기고 다시 연결 되었을 때 여러개 연결되는거 fix (tts메세지에 인덱스를 붙여서 해당 인덱스가 이미 실행되었으면 실행안하게?)
}

const WEB_SOCKET_TASK = "WEB_SOCKET_TASK";
const LOCATION_TASK = "LOCATION_TASK";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        priority: AndroidNotificationPriority.MAX,
    }),
});

const createSocketOnBackground = () => {
    try {
        console.log("ws.readyState on background : ", ws.readyState);
        if (ws.readyState === 2 || ws.readyState === 3) {
            createSocket();
        }
        return backendData
            ? BackgroundFetch.BackgroundFetchResult.NewData
            : BackgroundFetch.BackgroundFetchResult.NoData;
    } catch (err) {
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
};

const initBackgroundFetch = async (taskName, taskFn, interval = 60 * 15) => {
    try {
        if (!TaskManager.isTaskDefined(taskName)) {
            TaskManager.defineTask(taskName, taskFn);
        }
        const options = {
            minimumInterval: interval,
        };
        await BackgroundFetch.registerTaskAsync(taskName, options);
        console.log(taskName, "is registred.");
    } catch (err) {
        console.log("registerTaskAsync() failed:", err);
    }
};

const getCurrentLocation = async () => {
    const location = await Location.getCurrentPositionAsync();
    console.log("get location on background : ", location);
    const {
        coords: { latitude, longitude },
    } = location;

    checkPosition({ latitude, longitude });
};

initBackgroundFetch(WEB_SOCKET_TASK, createSocketOnBackground, 5);
initBackgroundFetch(LOCATION_TASK, getCurrentLocation, 5);

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [locationGranted, setLocationGranted] = useState(true);
    const [pushGranted, setPushGranted] = useState(true);
    const [fontsLoaded] = useFonts({
        "SpoqaHanSansNeo-Bold": require("./assets/fonts/SpoqaHanSansNeo-Bold.otf"),
        "SpoqaHanSansNeo-Light": require("./assets/fonts/SpoqaHanSansNeo-Light.otf"),
        "SpoqaHanSansNeo-Medium": require("./assets/fonts/SpoqaHanSansNeo-Medium.otf"),
        "SpoqaHanSansNeo-Regular": require("./assets/fonts/SpoqaHanSansNeo-Regular.otf"),
        "SpoqaHanSansNeo-Thin": require("./assets/fonts/SpoqaHanSansNeo-Thin.otf"),
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

        AppState.addEventListener("change", (state) => {
            console.log("state : ", state);
            console.log("addEventlistner");
            if (state === "background") {
                if (ws) {
                    ws.close(1000, "background");
                }
                createSocket();
            } else if (state === "active") {
                if (ws) {
                    ws.close();
                }
            }
        });

        createSocket();
        prepare();

        return () => {
            ws.close(1000, "terminated");
        };
    }, []);

    const askLocationPermission = async () => {
        //TODO: 권한 관련 로직 수정 (권한없으면 진행안되고 앱 종료,,,)
        const { granted: foregroundGranted } =
            await Location.requestForegroundPermissionsAsync();
        const { granted: backgroundGranted } =
            await Location.requestBackgroundPermissionsAsync();

        if (!foregroundGranted || !backgroundGranted) {
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
