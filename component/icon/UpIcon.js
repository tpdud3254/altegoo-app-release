import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function UpIcon({ size }) {
    return (
        <MaterialCommunityIcons
            name="arrow-expand-up"
            size={size ? size : 24}
            color="#777777"
            style={{ marginRight: 5 }}
        />
    );
}

export default UpIcon;
