import React, { useContext } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import DefaultLayout from "../../../component/layout/DefaultLayout";

function SignUpStep2() {
  const { info, setInfo } = useContext(UserContext);
  const navigation = useNavigation();

  console.log(info);
  const onPress = (data) => {
    setInfo({ userType: data });
    navigation.navigate("SignUpStep3");
  };

  return <DefaultLayout></DefaultLayout>;
}

export default SignUpStep2;
