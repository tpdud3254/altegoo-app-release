import React, { useEffect } from "react";
import { Text } from "react-native";
import DefaultLayout from "../../../component/layout/DefaultLayout";

function DetailTerms({ route, navigation }) {
    useEffect(() => {
        navigation.setOptions({ title: route?.params?.title });
    }, []);

    return (
        <DefaultLayout>
            <Text>상세약관 {route?.params?.index}</Text>
        </DefaultLayout>
    );
}

export default DetailTerms;
