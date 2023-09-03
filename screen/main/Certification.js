import React, { useEffect, useRef, useState } from "react";
import { View, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import { PAYMENT_SERVER } from "../../constant";

function Certification({ navigation, route }) {
    const webViewRef = useRef();
    const [progress, setProgress] = useState(0.0);

    const sendMessage = (data) => {
        webViewRef.current.postMessage(data);
    };

    const errorHandler = ({ nativeEvent }) =>
        console.log("WebView error: ", nativeEvent);

    const receiveMessage = async (event) => {
        console.log("받음");
        try {
            const {
                nativeEvent: { data },
            } = event;
            const parsed = JSON.parse(data);
            console.log(parsed);
            // switch (parsed.handle) {
            //     case "error":
            //         Alert.alert("결제 오류입니다. 다시 시도해주세요.");
            //         //TODO: 안됨
            //         navigation.navigate(REGIST_NAV[4]);
            //         // navigation.goBack();
            //         break;
            //     case "cancle":
            //         Alert.alert("결제를 취소하였습니다.");
            //         navigation.navigate(REGIST_NAV[4]);
            //         // navigation.goBack();
            //         break;
            //     case "issued":
            //         await registWork(parsed);
            //         break;
            //     case "done":
            //         await registWork(parsed);
            //         break;
            //     case "confirm":
            //         // navigation.navigate("ReservationConfirm", {
            //         //     data: { price, checkIn, checkOut, service, petId },
            //         // });
            //         break;
            // }
        } catch (e) {
            console.log("e!!");
        }
    };

    useEffect(() => {
        if (progress === 1) {
            sendMessage(
                JSON.stringify({
                    // ...route?.params?.data,
                    test: true,
                })
            );
        }
        console.log("progress : ", progress);
    }, [progress]);

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                // backgroundColor: "black",
            }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View
                    style={{
                        width: 400,
                        height: 700,
                        flex: 1,
                        // backgroundColor: "black",
                    }}
                >
                    <WebView
                        ref={webViewRef}
                        style={{ width: 400, height: 700, flex: 1 }}
                        containerStyle={{ width: 400, height: 700, flex: 1 }}
                        source={{
                            uri: "https://master.d1p7wg3e032x9j.amplifyapp.com/certification",
                            // uri: PAYMENT_SERVER,
                            // uri: "https://www.naver.com/",
                        }}
                        javaScriptEnabled={true}
                        onError={errorHandler}
                        onMessage={receiveMessage}
                        onLoadProgress={(event) => {
                            setProgress(event.nativeEvent.progress);
                        }}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}

Certification.propTypes = {};
export default Certification;
