import React from "react";
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";

export default function DismissKeyboard({ children }) {
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
    return (
        <TouchableWithoutFeedback
            onPress={dismissKeyboard}
            style={{ flex: 1 }}
            disabled={Platform.OS === "web"}
        >
            {children}
        </TouchableWithoutFeedback>
    );
}
