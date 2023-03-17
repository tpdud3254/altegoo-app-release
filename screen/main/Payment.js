import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Linking,
    Platform,
    ActivityIndicator,
    Alert,
    View,
    SafeAreaView,
} from "react-native";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
// import WebView from "react-native-webview-bootpay";
import UserContext from "../../context/UserContext";
import { PAYMENT_APP_ID } from "@env";
import { REGIST_NAV, VALID } from "../../constant";
import axios from "axios";
import { SERVER } from "../../server";
import { getAsyncStorageToken, showError } from "../../utils";
import RegistContext from "../../context/RegistContext";

function Payment({ navigation, route }) {
    const webViewRef = useRef();
    const [progress, setProgress] = useState(0.0);

    const { registInfo } = useContext(RegistContext);
    const { info } = useContext(UserContext);

    console.log(route?.params?.data);
    const sendMessage = (data) => {
        webViewRef.current.postMessage(data);
    };

    const errorHandler = ({ nativeEvent }) =>
        console.warn("WebView error: ", nativeEvent);

    const receiveMessage = async (event) => {
        console.log("받음");
        try {
            const {
                nativeEvent: { data },
            } = event;
            const parsed = JSON.parse(data);
            console.log(parsed);
            switch (parsed.handle) {
                case "error":
                    Alert.alert("결제 오류입니다. 다시 시도해주세요.");
                    navigation.goBack();
                    break;
                case "cancle":
                    Alert.alert("결제를 취소하였습니다.");
                    navigation.goBack();
                    break;
                case "issued":
                    await registWork(parsed);
                    break;
                case "done":
                    await registWork(parsed);
                    break;
                case "confirm":
                    // navigation.navigate("ReservationConfirm", {
                    //     data: { price, checkIn, checkOut, service, petId },
                    // });
                    break;
            }
        } catch (e) {
            console.log("e!!");
        }
    };
    //TODO: eject후 ,,
    const registWork = async (parsed) => {
        const sendingData = {
            workDateTime: registInfo.dateTime,
            type: registInfo.upDown,
            bothType: registInfo.bothType || null,
            address1: registInfo.address1,
            simpleAddress1: registInfo.simpleAddress1,
            address2: registInfo.address2,
            simpleAddress2: registInfo.simpleAddress2,
            regionId: registInfo.region,
            floor: registInfo.floor,
            otherFloor: registInfo.otherFloor || null,
            phone: info.phone,
            directPhone: registInfo.directPhone,
            price: registInfo.price,
            point: registInfo.point,
            volumeType: registInfo.volumeType,
            quantity: registInfo.quantity || null,
            time: registInfo.time || null,
            vehicleType: registInfo.vehicleType,
            emergency: registInfo.emergency,
            memo: registInfo.memo || null,
        };

        console.log(sendingData);

        axios
            .post(
                SERVER + "/works/upload",
                {
                    ...sendingData,
                },
                {
                    headers: {
                        auth: await getAsyncStorageToken(),
                    },
                }
            )
            .then(({ data }) => {
                const { result } = data;
                console.log("result : ", result);
                if (result === VALID) {
                    navigation.navigate("TabRegistWork", {
                        screen: REGIST_NAV[8],
                        params: { paymentData: parsed },
                    });
                } else {
                    console.log(data.msg);
                }
            })
            .catch((error) => {
                console.log(error);
                // showError(error);
            })
            .finally(() => {});
    };
    useEffect(() => {
        if (progress === 1) {
            sendMessage(
                JSON.stringify({
                    ...route?.params?.data,
                })
            );
        }
    }, [progress]);

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <SafeAreaView>
                <View style={{ height: 700 }}>
                    <WebView
                        ref={webViewRef}
                        containerStyle={{ width: 400, height: 700 }}
                        source={{
                            uri: "https://master.d1p7wg3e032x9j.amplifyapp.com/payment",
                            // uri: "https://07ec-211-59-182-118.jp.ngrok.io/payment",
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

Payment.propTypes = {};
export default Payment;
