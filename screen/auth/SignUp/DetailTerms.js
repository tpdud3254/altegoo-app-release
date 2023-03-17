import React, { useEffect } from "react";
import { ScrollView, Text } from "react-native";
import DefaultLayout from "../../../component/layout/DefaultLayout";
import { terms } from "./terms";

function DetailTerms({ route, navigation }) {
    useEffect(() => {
        navigation.setOptions({ title: route?.params?.title });
    }, []);

    return (
        <DefaultLayout>
            <ScrollView>
                <Text>{terms[route?.params?.index]}</Text>
            </ScrollView>
        </DefaultLayout>
    );
}

export default DetailTerms;
