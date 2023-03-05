import React, { useContext } from "react";
import { Text, View } from "react-native";
import RegistContext from "../../../context/RegistContext";

function SelectFloor() {
    const { registInfo, setRegistInfo } = useContext(RegistContext);
    console.log("registInfo : ", registInfo);
    return (
        <View>
            <Text>SelectFloor</Text>
        </View>
    );
}

export default SelectFloor;
