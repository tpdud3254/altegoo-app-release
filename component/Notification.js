import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import styled from "styled-components/native";

const Badge = styled.View`
    position: absolute;
    right: -10px;
    top: -8px;
`;
export const Notification = () => {
    return (
        <View>
            <TouchableOpacity>
                <Image
                    source={require("../assets/images/icons/btn_notifcation.png")}
                    style={{ width: 30, height: 30 }}
                />
                <Badge>
                    <Image
                        source={require("../assets/images/icons/badge.png")}
                        style={{ width: 23, height: 23 }}
                    />
                </Badge>
            </TouchableOpacity>
        </View>
    );
};
