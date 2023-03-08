import React from "react";
import styled from "styled-components/native";
import { Text, View } from "react-native";
import Postcode from "@actbase/react-daum-postcode";
import Toast from "react-native-toast-message";
import { REGIST_NAV } from "../constant";

function Address({ navigation, route }) {
  const onSelected = (data) => {
    let addressArr = [...route?.params?.addressArr] || ["", ""];

    if (route?.params?.data === 0) {
      addressArr[0] = data.address;
    } else {
      addressArr[1] = data.address;
    }
    navigation.navigate(REGIST_NAV[2], { addressArr: [...addressArr] }); //TODO:각 상세주소로 포커스 이동하게 하기
    // Toast.show({
    //   type: "errorToast", //TODO: normal toast로 변경
    //   props: "상세 주소를 입력해주세요.",
    // });
  };
  const YourView = () => (
    <Postcode
      style={{ width: "100%", height: "100%", paddingTop: 50 }}
      jsOptions={{ animation: true }}
      onSelected={(data) => onSelected(data)}
    />
  );

  return (
    <View>
      <YourView />
    </View>
  );
}

export default Address;
