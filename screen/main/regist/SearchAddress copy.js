import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import Postcode from "@actbase/react-daum-postcode";
import Toast from "react-native-toast-message";

function SearchAddress({ navigation, route }) {
  const onSelected = (data) => {
    let addressArr = [...route?.params?.addressArr] || ["", ""];

    if (route?.params?.data === 0) {
      addressArr[0] = data.address;
    } else {
      addressArr[1] = data.address; //TODO: 지역구분
    }
    navigation.navigate("RegistWork", { addressArr: [...addressArr] }); //TODO:각 상세주소로 포커스 이동하게 하기
    Toast.show({
      type: "errorToast", //TODO: normal toast로 변경
      props: "상세 주소를 입력해주세요.",
    });
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

SearchAddress.propTypes = {};
export default SearchAddress;
