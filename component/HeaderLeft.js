import React from "react";
import { TouchableOpacity, View } from "react-native";
import { color } from "../styles";
import { numberWithComma } from "../utils";
import PlainText from "./text/PlainText";
import PropType from "prop-types";

function HeaderLeft({ onPress, name, point }) {
    return (
        <TouchableOpacity onPress={onPress} style={{ marginLeft: 10 }}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ alignItems: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                        <PlainText
                            style={{
                                fontWeight: "500",
                            }}
                        >
                            {name}
                        </PlainText>
                        <PlainText style={{ color: "#777" }}>님</PlainText>
                    </View>
                    <PlainText
                        style={{
                            color: color.main,
                            marginTop: -5,
                            fontWeight: "500",
                        }}
                    >
                        {numberWithComma(point)}AP
                    </PlainText>
                </View>
            </View>
        </TouchableOpacity>
    );
}

HeaderLeft.propTypes = {
    onPress: PropType.func,
    name: PropType.string,
    point: PropType.number,
};

export default HeaderLeft;
