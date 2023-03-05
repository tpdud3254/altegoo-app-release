import React, { useContext } from "react";
import { Text, View } from "react-native";
import RegistContext from "../../../context/RegistContext";

function SearchAddress() {
    const { registInfo, setRegistInfo } = useContext(RegistContext);
    console.log("registInfo : ", registInfo);
    return (
        <View>
            <Text>SearchAddress</Text>
        </View>
    );
}

export default SearchAddress;
