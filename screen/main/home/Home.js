import React, { useContext } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, View } from "react-native";
import LoginContext from "../../../context/LoginContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";

function Home() {
  const { setIsLoggedIn } = useContext(LoginContext);
  const { setInfo } = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        onPress={async () => {
          setIsLoggedIn(false);
          setInfo({});
          await AsyncStorage.removeItem("token");
        }}
      >
        <Text>로그아웃</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("DrawerNavigator");
        }}
      >
        <Text>햄버거 메뉴</Text>
      </TouchableOpacity>
    </View>
  );
}

Home.propTypes = {};
export default Home;
