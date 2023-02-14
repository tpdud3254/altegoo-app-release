import React, { useContext } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import DefaultLayout from "../../../component/layout/DefaultLayout";

function SignUpStep5() {
  const { setInfo } = useContext(UserContext);
  const navigation = useNavigation();

  const onPress = (data) => {
    // setInfo({ userType: data });
    // navigation.navigate("SignUpStep5");
  };

  return <DefaultLayout></DefaultLayout>;
}

export default SignUpStep5;
