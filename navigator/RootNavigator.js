import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginContext from "../context/LoginContext";
import IntroNavigator from "./IntroNavigator";
import MainNavigator from "./MainNavigator ";

export default function RootNavigator() {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

    useEffect(() => {
        setIsLoggedIn(true);
    }, []);

    console.log("isLoggedIn : ", isLoggedIn);
    return (
        <NavigationContainer>
            {isLoggedIn ? <MainNavigator /> : <IntroNavigator />}
        </NavigationContainer>
    );
}
