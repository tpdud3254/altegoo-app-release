import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function LadderIcon({ size }) {
    return (
        <MaterialCommunityIcons
            name="fire-truck"
            size={size ? size : 30}
            color="#777777"
        />
    );
}

export default LadderIcon;
