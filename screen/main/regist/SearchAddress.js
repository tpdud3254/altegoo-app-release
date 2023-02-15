import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import Postcode from "@actbase/react-daum-postcode";

function SearchAddress({ navigation, route }) {
    const onSelected = (data) => {
        let addressArr = [...route?.params?.addressArr] || ["", ""];

        if (route?.params?.data === 0) {
            addressArr[0] = data.address;
        } else {
            addressArr[1] = data.address;
        }
        navigation.navigate("RegistWork", { addressArr: [...addressArr] });
    };
    const YourView = () => (
        <Postcode
            style={{ width: "100%", height: "100%", paddingTop: 50 }}
            jsOptions={{ animation: true }}
            onSelected={(data) => onSelected(data)}
            onError={(error) => console.error(error)}
        />
    );

    return (
        <View>
            <YourView />
        </View>
    );
}

SearchAddress.propTypes = {};
export default SearchAddress;
