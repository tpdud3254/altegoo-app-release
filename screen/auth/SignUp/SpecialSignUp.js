import React, { useContext } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import DefaultLayout from "../../../component/layout/DefaultLayout";
import { Text } from "react-native";

function SpecialSignUp() {
  const { setInfo } = useContext(UserContext);
  const navigation = useNavigation();

  const onPress = (data) => {
    // setInfo({ userType: data });
    // navigation.navigate("SpecialSignUp");
  };

  return (
    <DefaultLayout>
      <Text>SPECIAL</Text>
    </DefaultLayout>
  );
}

export default SpecialSignUp;
