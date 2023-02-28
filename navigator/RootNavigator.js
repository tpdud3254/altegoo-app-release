import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginContext from "../context/LoginContext";
import IntroNavigator from "./IntroNavigator";
import MainNavigator from "./MainNavigator ";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axios from "axios";
import { SERVER } from "../server";
import UserContext from "../context/UserContext";
import LoadingLayout from "../component/layout/LoadingLayout";
import { VALID } from "../constant";
import { getAsyncStorageToken } from "../utils";

export default function RootNavigator() {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { setInfo } = useContext(UserContext);

  useEffect(() => {
    async function getStorage() {
      const token = await getAsyncStorageToken();
      console.log(token);
      if (token) {
        axios
          .post(SERVER + "/users/user", {
            token,
          })
          .then(({ data }) => {
            const { result, data: user, msg } = data;
            if (result === VALID) {
              setInfo(user.user);
              setIsLoggedIn(true);
              setLoading(true);
            } else {
              //TODO:에러처리
            }
          })
          .catch((error) => {
            console.log("error: ", error); //TODO:에러처리
          })
          .finally(() => {});
      } else {
        setLoading(true);
        setIsLoggedIn(false);
      }
    }

    getStorage();
  }, []);

  return (
    <>
      {loading ? (
        <NavigationContainer>
          {isLoggedIn ? <MainNavigator /> : <IntroNavigator />}
        </NavigationContainer>
      ) : (
        <LoadingLayout />
      )}
    </>
  );
}
