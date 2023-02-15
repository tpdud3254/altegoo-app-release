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

export default function RootNavigator() {
    const [check, setCheck] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    const { setInfo } = useContext(UserContext);

    useEffect(() => {
        async function getStorage() {
            const token = await AsyncStorage.getItem("token");

            if (token) {
                axios({
                    url: SERVER + `/users/user?token=${token}`,
                    method: "GET",
                    header: {
                        Accept: "application/json",
                        "Content-Type": "application/json;charset=UTP-8",
                    },
                    withCredentials: true,
                    validateStatus: false,
                })
                    .then(async ({ data }) => {
                        const { result, data: user, msg } = data;
                        if (result === VALID) {
                            setInfo(user.user);
                            if (token) {
                                setIsLoggedIn(true);
                                setInterval(() => {}, 1000);
                                setCheck(true);
                            }
                        } else {
                            Toast.show({
                                type: "errorToast",
                                props: msg,
                            });
                        }
                    })
                    .catch((error) => {
                        console.log("error : ", error.response.data);
                        Toast.show({
                            type: "errorToast",
                            props: error.response.data.msg,
                        });
                    });
            } else {
                setIsLoggedIn(false);
            }
        }

        getStorage();
    }, []);

    return (
        <>
            {check ? (
                <NavigationContainer>
                    {isLoggedIn ? <MainNavigator /> : <IntroNavigator />}
                </NavigationContainer>
            ) : (
                <LoadingLayout />
            )}
        </>
    );
}
