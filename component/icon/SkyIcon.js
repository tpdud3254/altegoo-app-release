import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function SkyIcon({ size }) {
    return (
        <MaterialCommunityIcons
            name="tow-truck"
            size={size ? size : 30}
            color="#777777"
        />
    );
}

export default SkyIcon;
