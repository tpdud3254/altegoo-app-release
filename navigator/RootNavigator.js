import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginContext from "../context/LoginContext";
import IntroNavigator from "./Auth/IntroNavigator";
import MainNavigator from "./Main/MainNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axios from "axios";
import { SERVER } from "../utils";
import UserContext from "../context/UserContext";
import LoadingLayout from "../component/layout/LoadingLayout";
import { VALID } from "../constant";
import { getAsyncStorageToken, showError } from "../utils";

export default function RootNavigator() {
    const [loading, setLoading] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    const { setInfo } = useContext(UserContext);

    useEffect(() => {
        async function getStorage() {
            const token = await getAsyncStorageToken();
            console.log("token : ", token);
            if (token) {
                axios
                    .post(SERVER + "/users/user", {
                        token,
                    })
                    .then(({ data }) => {
                        const { result, data: user, msg } = data;
                        if (result === VALID) {
                            setInfo(user.user);
                            setLoading(true);
                            setIsLoggedIn(true);
                        }
                    })
                    .catch((error) => {
                        showError(error);
                        setLoading(true);
                        setIsLoggedIn(false);
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
