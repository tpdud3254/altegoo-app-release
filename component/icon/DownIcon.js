import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function DownIcon({ size }) {
    return (
        <MaterialCommunityIcons
            name="arrow-expand-down"
            size={size ? size : 24}
            color="#777777"
            style={{ marginRight: 5 }}
        />
    );
}

export default DownIcon;
