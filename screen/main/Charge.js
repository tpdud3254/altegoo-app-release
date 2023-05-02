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
import { PAYMENT_SERVER, REGIST_NAV, SERVER, VALID } from "../../constant";
import axios from "axios";

import { getAsyncStorageToken, showError } from "../../utils";
import RegistContext from "../../context/RegistContext";

function Charge({ navigation, route }) {
  const webViewRef = useRef();
  const [progress, setProgress] = useState(0.0);

  const { registInfo } = useContext(RegistContext);
  const { info } = useContext(UserContext);

  console.log(route?.params?.data);
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
          await setPoint(parsed);
          break;
        case "done":
          await setPoint(parsed);
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
  const setPoint = async (parsed) => {
    try {
      const response = await axios.patch(SERVER + "/admin/points", {
        pointId: route?.params?.data?.pointId,
        points: route?.params?.data?.curPoint + route?.params?.data?.price,
      });

      const {
        data: {
          data: { points },
          result,
        },
      } = response;

      console.log(points);

      if (result === VALID) {
        navigation.navigate("TabsNavigator", {
          screen: "SettingNavigator",
          params: {
            screen: "PointNavigator",
            params: {
              screen: "PointMain",
            },
          },
        });
      } else console.log(msg);
    } catch (error) {
      console.log(error);
    }
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <SafeAreaView>
        <View style={{ height: 700 }}>
          <WebView
            ref={webViewRef}
            containerStyle={{ width: 400, height: 700 }}
            source={{
              // uri: "https://master.d1p7wg3e032x9j.amplifyapp.com/payment",
              uri: PAYMENT_SERVER,
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

Charge.propTypes = {};
export default Charge;
