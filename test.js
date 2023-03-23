// 복붙해서 필요없는거 지워서 쓰기
//이대로 쓰고 웹뷰에서 html 열면됨
/*
import React, { useEffect } from "react";
import {
    Linking,
    Platform,
    ActivityIndicator,
    Alert,
    View,
} from "react-native";
import { WebView } from "react-native-webview";
import { getUser } from "context/AuthContext";
import { resize } from "utils/constants";

const Payment = ({ navigation }) => {
    const { type, title, price, checkIn, checkOut, service, petId } =
        navigation.getParam("params");
    const [webViewRef, setWebViewRef] = React.useState(null);

    const [progress, setProgress] = React.useState(0.0);
    const [uri, setUri] = React.useState(null);
    const user = getUser();
    const [appSchemeState, setAppSchemeState] = React.useState({
        ios: null,
        android: null,
    });

    const HandleCard = () => {};
    const HandleKakaoPay = () => {
        Linking.openURL(
            Platform.OS === "ios" ? appSchemeState.ios : appSchemeState.android
        );
    };

    const GetKakaoPay = () => {
        const headers = {
            headers: {
                "content-type": "application/x-www-form-urlencoded;",
                Authorization: `KakaoAK..`,
            },
        };
    };

    const injectedJavascript = `(function() {
window.postMessage = function(data) {
window.ReactNativeWebView.postMessage(data);
};
})();`;

    const webViewOnMessage = (event) => {
        try {
            const {
                nativeEvent: { data },
            } = event;
            const parsed = JSON.parse(data);
            switch (parsed.handle) {
                case "error":
                    Alert.alert("결제 오류입니다. 다시 시도해주세요.");
                    navigation.goBack();
                    break;
                case "cancle":
                    Alert.alert("결제를 취소하였습니다.");
                    navigation.goBack();
                    break;
                case "confirm":
                    navigation.navigate("ReservationConfirm", {
                        params: { price, checkIn, checkOut, service, petId },
                    });
                    break;
            }
        } catch (e) {}
    };
    useEffect(() => {
        if (progress === 1) {
            webViewRef.postMessage(
                JSON.stringify({
                    title,
                    price,
                    email: user.email,
                    phone: user.phone,
                    name: user.name,
                })
            );
        }
    }, [progress]);
    useEffect(() => {
        if (type === "card") {
            setUri(
                `https://웹서버url/api/dev/payment_${Platform.OS}?title=${title}&price=${price}&email=${user.email}&phone=${user.phone}`
            );
        }
    }, []);
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
            }}
        >
            <WebView
                ref={(webView) => {
                    setWebViewRef(webView);
                }}
                style={
                    progress < 0.99
                        ? { width: 0, height: 0 }
                        : { width: resize.width, height: resize.height }
                }
                source={{ uri }}
                injectedJavaScript={injectedJavascript}
                onMessage={webViewOnMessage}
                onLoadProgress={(event) => {
                    setProgress(event.nativeEvent.progress);
                }}
            />
            {progress < 0.99 && (
                <ActivityIndicator style={{ position: "absolute" }} />
            )}
        </View>
    );
};

export default Payment;



 try {
            const response = await axios.get(SERVER + "/users/special/count", {
                headers: {
                    auth: await getAsyncStorageToken(),
                },
            });

            console.log(response.data);

            const {
                data: { result },
            } = response;

            if (result === VALID) {
                const {
                    data: {
                        data: { count },
                    },
                } = response;

                setUserCount(count);
            } else {
                const {
                    data: { msg },
                } = response;

                console.log(msg);
            }
        } catch (error) {
            console.log(error);
        }
        
*/
