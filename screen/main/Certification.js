import React, { useEffect, useRef, useState } from "react";
import { View, SafeAreaView, useWindowDimensions } from "react-native";
import { WebView } from "react-native-webview";
import { LAYOUT_PADDING_X } from "../../component/layout/Layout";
import { CommonActions } from "@react-navigation/native";

function Certification({ navigation }) {
    const webViewRef = useRef();
    const { width } = useWindowDimensions();
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
            console.log("parsed : ", parsed);
            switch (parsed.result) {
                case "cancel":
                    navigation.goBack();
                    break;
                case "ok":
                    console.log(parsed.data);
                    goToPage(parsed.data);

                    break;
                default:
                    navigation.goBack();
                    break;
            }
        } catch (e) {
            console.log(e);
            navigation.goBack();
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

    const goToPage = (data) => {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: "SignIn" },
                    {
                        name: "SetPassword",
                        params: { cerfifyData: data },
                    },
                ],
            })
        );
    };
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",

                marginLeft: -LAYOUT_PADDING_X,
                marginRight: -LAYOUT_PADDING_X,
            }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View
                    style={{
                        height: 700,
                        flex: 1,
                    }}
                >
                    <WebView
                        ref={webViewRef}
                        style={{ width: width, height: 700, flex: 1 }}
                        source={{
                            uri: "https://master.d1p7wg3e032x9j.amplifyapp.com/certification",
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
