import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Linking,
    Platform,
    ActivityIndicator,
    Alert,
    View,
} from "react-native";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import UserContext from "../../../context/UserContext";
import { PAYMENT_APP_ID } from "@env";

function BlockUser({ navigation, route }) {
    const webViewRef = useRef();
    const [progress, setProgress] = useState(0.0);

    const { info } = useContext(UserContext);
    const application_id = PAYMENT_APP_ID;

    // route?.params?.data
    const sendMessage = (data) => {
        webViewRef.current.postMessage(data);
    };

    const errorHandler = ({ nativeEvent }) =>
        console.warn("WebView error: ", nativeEvent);

    const receiveMessage = (event) => {
        console.log("받음");
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
                    // navigation.navigate("ReservationConfirm", {
                    //     data: { price, checkIn, checkOut, service, petId },
                    // });
                    break;
            }
        } catch (e) {}
    };

    useEffect(() => {
        if (progress === 1) {
            // sendMessage(
            //     JSON.stringify({
            //         title,
            //         price,
            //         email: user.email,
            //         phone: user.phone,
            //         name: user.name,
            //     })
            // );
        }
    }, [progress]);

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <View style={{ height: 700 }}>
                <WebView
                    ref={webViewRef}
                    containerStyle={{ width: 400, height: 700 }}
                    source={{
                        // uri: "https://master.d1p7wg3e032x9j.amplifyapp.com/payment",
                        uri: "https://07ec-211-59-182-118.jp.ngrok.io/payment",
                    }}
                    javaScriptEnabled={true}
                    onLoad={sendMessage}
                    onError={errorHandler}
                    onMessage={receiveMessage}
                    onLoadProgress={(event) => {
                        setProgress(event.nativeEvent.progress);
                    }}
                />
            </View>
        </View>
    );
}

BlockUser.propTypes = {};
export default BlockUser;
