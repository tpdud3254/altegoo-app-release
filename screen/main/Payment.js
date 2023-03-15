import React from "react";
import { Text, View } from "react-native";
import LoadingLayout from "../../component/layout/LoadingLayout";

function Payment({ navigation, route }) {
    console.log(route.params);
    function callback(response) {
        navigation.replace(route.params.callBackPage, response);
    }

    return <View></View>;
}

export default Payment;
